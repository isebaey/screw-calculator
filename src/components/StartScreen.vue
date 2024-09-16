<template>
  <div class="text-center p-4">
    <h2 class="text-2xl font-bold mb-6">Start New Game</h2>

    <label class="block mb-4 text-lg">How many players?</label>
    <select v-model="playerCount" class="w-full p-2 border rounded mb-6">
      <option v-for="n in [4, 5, 6, 7, 8]" :key="n" :value="n">
        {{ n }} Players
      </option>
    </select>

    <div v-for="n in playerCount" :key="n" class="mb-4">
      <label class="block mb-2">Player {{ n }} Name</label>
      <input
        v-model="playerNames[n - 1]"
        type="text"
        placeholder="Enter name"
        class="w-full p-2 border rounded"
      />
    </div>

    <button
      @click="startGame"
      class="w-full mt-6 py-2 bg-indigo-500 text-white rounded shadow-lg"
    >
      Start Game
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      playerCount: 4, // Default to 4 players
      playerNames: Array(8).fill(""), // Array for storing names
    };
  },
  methods: {
    startGame() {
      const players = this.playerNames
        .slice(0, this.playerCount)
        .map((name, index) => ({
          name: name || `Player ${index + 1}`, // Default name if input is empty
          score: 0,
        }));
      this.$emit("start-game", players);
    },
  },
};
</script>

<style scoped>
/* Additional styles to ensure proper form layout */
input {
  transition: border-color 0.3s ease;
}
input:focus {
  border-color: #6366f1; /* Indigo */
}
</style>
