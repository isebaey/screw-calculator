<template>
  <div
    class="p-4 max-w-lg mx-auto bg-white dark:bg-gray-900 rounded-lg shadow-lg"
  >
    <h2 class="text-3xl text-center font-bold mb-6">Round {{ roundNumber }}</h2>

    <div
      v-for="(player, index) in players"
      :key="index"
      class="flex items-center justify-between mb-4"
    >
      <span class="font-semibold">{{ player.name }}:</span>
      <input
        v-model.number="player.roundScore"
        type="number"
        class="w-24 p-2 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-200 rounded-lg"
      />
    </div>

    <button
      @click="submitRound"
      class="w-full py-3 bg-blue-600 text-white rounded-lg mb-4"
    >
      Submit Round
    </button>

    <div class="text-center mb-6">
      <h3 class="font-bold text-xl mb-2">Total Scores:</h3>
      <ul>
        <li v-for="player in players" :key="player.name" class="mb-2">
          {{ player.name }}: {{ player.score }}
        </li>
      </ul>
    </div>

    <button
      @click="endGame"
      class="w-full py-3 bg-red-500 text-white rounded-lg"
    >
      End Game
    </button>
  </div>
</template>

<script>
export default {
  props: ["players"],
  data() {
    return {
      roundNumber: 1,
    };
  },
  methods: {
    submitRound() {
      this.players.forEach((player) => {
        player.score += player.roundScore || 0; // Add the score, default to 0 if undefined
        player.roundScore = 0; // Reset for next round
      });
      this.roundNumber++;
    },
    endGame() {
      this.$emit("end-game");
    },
  },
};
</script>

<style scoped>
input {
  transition: all 0.3s ease;
}
input:focus {
  border-color: #3b82f6; /* Focus border color */
}
</style>
