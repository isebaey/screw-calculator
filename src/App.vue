<template>
  <div
    :class="{
      'bg-gradient-light': !isDark,
      'bg-gradient-dark': isDark,
      rtl: isRTL,
    }"
    class="min-h-screen transition-colors duration-500 ease-in-out font-cairo"
  >
    <div class="container mx-auto px-4 py-8">
      <header class="mb-8">
        <div class="flex justify-between items-center">
          <h1 class="text-4xl md:text-5xl font-bold text-white">
            {{ $t("title") }}
          </h1>
          <div class="flex items-center space-x-4">
            <button
              @click="toggleLanguage"
              class="text-white hover:text-yellow-300 transition-colors text-lg focus:outline-none focus:ring-2 focus:ring-transparent rounded-md px-3 py-1"
            >
              {{ currentLanguage === "en" ? "عربي" : "English" }}
            </button>

            <button
              @click="toggleDarkMode"
              class="text-white hover:text-yellow-300 transition-colors focus:outline-none focus:ring-2 focus:ring-transparent rounded-md p-1"
            >
              <MoonIcon v-if="isDark" class="h-6 w-6" />
              <SunIcon v-else class="h-6 w-6" />
            </button>
          </div>
        </div>
      </header>

      <main
        class="bg-opacity-10 backdrop-filter backdrop-blur-lg bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-6 md:p-8"
      >
        <transition name="fade" mode="out-in">
          <!-- Setup Game Section -->
          <div v-if="!gameStarted" key="setup" class="space-y-6">
            <h2
              class="text-2xl md:text-3xl font-semibold text-white dark:text-gray-200"
            >
              {{ $t("setupGame") }}
            </h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="md:col-span-2">
                <label
                  for="playerCount"
                  class="block text-sm font-medium text-gray-200 dark:text-gray-300 mb-2"
                >
                  {{ $t("playerCount") }}
                </label>
                <select
                  v-model="numberOfPlayers"
                  id="playerCount"
                  class="w-full px-3 py-2 bg-white bg-opacity-20 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 text-white"
                >
                  <option
                    class="bg-gray-400 text-white"
                    v-for="n in 5"
                    :key="n"
                    :value="n + 3"
                  >
                    {{ n + 3 }}
                  </option>
                </select>
              </div>
              <div
                v-for="(player, index) in players"
                :key="player.id"
                class="space-y-2"
              >
                <label
                  :for="'player' + (index + 1)"
                  class="block text-sm font-medium text-gray-200 dark:text-gray-300"
                >
                  {{ $t("player") }} {{ index + 1 }}
                </label>
                <input
                  v-model="player.name"
                  :id="'player' + (index + 1)"
                  type="text"
                  :placeholder="$t('playerPlaceholder', { number: index + 1 })"
                  class="w-full px-3 py-2 bg-white bg-opacity-20 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 text-white"
                />
              </div>
            </div>
            <button
              @click="startNewGame"
              :disabled="!canStartGame"
              class="w-full py-3 px-6 bg-gradient-to-r from-green-400 to-green-600 text-white hover:bg-green-600 font-semibold rounded-lg shadow-lg hover:shadow-xl transition duration-300 ease-in-out hover:-translate-y-1 focus:outline-none focus:ring-2 disabled:cursor-not-allowed"
            >
              {{ $t("startNewGame") }}
            </button>
          </div>

          <!-- Game Section -->
          <div v-else key="game" class="space-y-6">
            <h2
              class="text-2xl md:text-3xl font-semibold text-white dark:text-gray-200"
            >
              {{ $t("roundNumber", { round }) }}
            </h2>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div
                v-for="(player, index) in players"
                :key="player.id"
                class="space-y-2"
              >
                <label
                  :for="'score' + (index + 1)"
                  class="block text-sm font-medium text-gray-200 dark:text-gray-300"
                >
                  {{ player.name }} ({{ $t("total") }}: {{ player.totalScore }})
                </label>
                <input
                  v-model.number="player.currentScore"
                  :id="'score' + (index + 1)"
                  type="number"
                  :placeholder="$t('enterScore')"
                  class="w-full px-3 py-2 bg-white bg-opacity-20 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 text-white"
                />
              </div>
            </div>
            <div
              class="flex flex-col md:flex-row justify-center gap-y-4 md:gap-x-4"
            >
              <button
                @click="toggleDouble"
                class="py-3 px-6 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded-lg shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              >
                {{ isDoubleRound ? $t("cancelDouble") : $t("doubleScores") }}
              </button>
              <button
                @click="submitRound"
                class="py-3 px-6 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                {{ $t("submitRound") }}
              </button>
              <button
                @click="endGame"
                class="py-3 px-6 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-red-400"
              >
                {{ $t("endGame") }}
              </button>
            </div>

            <!-- Overall Score Section -->
            <div v-if="round > 1" class="mt-8">
              <h3
                class="text-xl font-semibold text-white dark:text-gray-200 mb-4"
              >
                {{ $t("overallScores") }}
              </h3>
              <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                <div
                  v-for="player in players"
                  :key="player.id"
                  class="bg-white bg-opacity-10 dark:bg-gray-700 p-4 rounded-lg shadow-md"
                >
                  <h4 class="font-semibold text-gray-200 dark:text-white">
                    {{ player.name }}
                  </h4>
                  <p class="text-2xl font-bold text-yellow-300">
                    {{ player.totalScore }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </transition>

        <!-- Game History Section -->
        <div class="mt-12">
          <h2
            class="text-2xl md:text-3xl font-semibold text-white dark:text-gray-200 mb-4"
          >
            {{ $t("gameHistory") }}
          </h2>
          <transition-group name="list" tag="ul" class="space-y-4">
            <li
              v-for="(game, index) in games"
              :key="index"
              class="bg-white bg-opacity-10 dark:bg-gray-700 p-4 rounded-lg shadow-md flex justify-between items-center"
            >
              <div class="text-gray-200 dark:text-white">
                <h3 class="font-semibold">
                  {{ $t("gameNumber", { number: index + 1 }) }}
                </h3>
                <ul class="pl-5 mt-2">
                  <li
                    v-for="player in game.players"
                    :key="player.id"
                    class="text-sm"
                  >
                    {{ player.name }}: {{ player.totalScore }}
                  </li>
                </ul>
              </div>
              <button
                @click="deleteGame(index)"
                class="text-red-400 hover:text-red-600 transition-colors focus:outline-none focus:ring-2 focus:ring-red-400 rounded-md p-1"
              >
                <TrashIcon class="h-8 w-8" />
              </button>
            </li>
          </transition-group>
          <button
            v-if="games.length > 0"
            @click="clearHistory"
            class="mt-4 w-full py-3 px-6 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-red-400"
          >
            {{ $t("clearHistory") }}
          </button>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import { ref, computed, watch, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import { MoonIcon, SunIcon, TrashIcon } from "@heroicons/vue/24/outline";

export default {
  components: {
    MoonIcon,
    SunIcon,
    TrashIcon,
  },

  setup() {
    const { locale } = useI18n();

    const isDark = ref(false);
    const isRTL = ref(false);
    const numberOfPlayers = ref(4);
    const players = ref([]);
    const round = ref(1);
    const games = ref(JSON.parse(localStorage.getItem("games")) || []);
    const isDoubleRound = ref(false);
    const gameStarted = ref(false);
    const currentLanguage = ref(locale.value);

    const canStartGame = computed(() => {
      return players.value.every((player) => player.name !== "");
    });

    watch(numberOfPlayers, () => {
      players.value = Array.from({ length: numberOfPlayers.value }, (_, i) => ({
        id: i + 1,
        name: "",
        totalScore: 0,
        currentScore: 0,
      }));
    });

    watch(currentLanguage, (newLang) => {
      locale.value = newLang;
      isRTL.value = newLang === "ar";
      document.documentElement.dir = isRTL.value ? "rtl" : "ltr";
    });

    onMounted(() => {
      players.value = Array.from({ length: numberOfPlayers.value }, (_, i) => ({
        id: i + 1,
        name: "",
        totalScore: 0,
        currentScore: 0,
      }));
      setDarkModeFromLocalStorage();
      setLanguageFromLocalStorage();
    });

    const startNewGame = () => {
      gameStarted.value = true;
    };

    const toggleDouble = () => {
      isDoubleRound.value = !isDoubleRound.value;
    };

    const submitRound = () => {
      players.value.forEach((player) => {
        const score = isDoubleRound.value
          ? player.currentScore * 2
          : player.currentScore;
        player.totalScore += score;
        player.currentScore = 0;
      });

      isDoubleRound.value = false;

      round.value += 1;
      saveGame();
    };

    const endGame = () => {
      games.value.push({
        players: JSON.parse(JSON.stringify(players.value)),
        round: round.value,
      });
      localStorage.setItem("games", JSON.stringify(games.value));
      gameStarted.value = false;
      round.value = 1;
      players.value = players.value.map((player) => ({
        ...player,
        totalScore: 0,
        currentScore: 0,
      }));
    };

    const saveGame = () => {
      localStorage.setItem("games", JSON.stringify(games.value));
    };

    const clearHistory = () => {
      games.value = [];
      localStorage.removeItem("games");
    };

    const deleteGame = (index) => {
      games.value.splice(index, 1);
      saveGame();
    };

    const toggleDarkMode = () => {
      isDark.value = !isDark.value;
      localStorage.setItem("darkMode", isDark.value);
    };

    const toggleLanguage = () => {
      currentLanguage.value = currentLanguage.value === "en" ? "ar" : "en";
      localStorage.setItem("language", currentLanguage.value);
    };

    const setDarkModeFromLocalStorage = () => {
      const darkMode = localStorage.getItem("darkMode");
      if (darkMode !== null) {
        isDark.value = JSON.parse(darkMode);
      }
    };

    const setLanguageFromLocalStorage = () => {
      const language = localStorage.getItem("language");
      if (language) {
        currentLanguage.value = language;
      }
    };

    return {
      isDark,
      isRTL,
      numberOfPlayers,
      players,
      round,
      games,
      isDoubleRound,
      gameStarted,
      currentLanguage,
      canStartGame,
      startNewGame,
      toggleDouble,
      submitRound,
      endGame,
      clearHistory,
      deleteGame,
      toggleDarkMode,
      toggleLanguage,
    };
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Cairo:wght@200;300;400;600;700;900&display=swap");

.font-cairo {
  font-family: "Cairo", sans-serif;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}

.rtl {
  direction: rtl;
}

/* Add smooth transitions for dark mode */
.dark .bg-white {
  @apply bg-gray-800;
}

.dark .text-gray-800 {
  @apply text-gray-200;
}

.dark .border-gray-300 {
  @apply border-gray-600;
}

/* Custom scrollbar for Webkit browsers */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
}

::-webkit-scrollbar-thumb {
  background-color: rgba(255, 255, 255, 0.3);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background-color: rgba(255, 255, 255, 0.5);
}
</style>
