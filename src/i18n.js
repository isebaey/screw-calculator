// src/i18n.js
import { createI18n } from "vue-i18n";

const messages = {
  en: {
    title: "Screw Game Calculator",
    setupGame: "Set Up Game",
    startNewGame: "Start New Game",
    playerCount: "How many players?",
    player: "Player",
    playerPlaceholder: "Enter player {number} name",
    enterScore: "Enter score",
    submitRound: "Submit Round",
    doubleScores: "Double Scores",
    cancelDouble: "Cancel Double",
    totalScores: "Total Scores",
    endGame: "End Game",
    gameHistory: "Game History",
    noGames: "No games played yet.",
    delete: "Delete",
    clearHistory: "Clear History",
    roundNumber: "Round {round}",
    total: "Total",
    gameNumber: "Game {number}",
    overallScores: "Overall Scores",
  },
  ar: {
    title: "حاسبة لعبة السكرو",
    setupGame: "إعداد اللعبة",
    startNewGame: "ابدأ لعبة جديدة",
    playerCount: "كام لاعب؟",
    player: "اللاعب",
    playerPlaceholder: "اكتب اسم اللاعب {number}",
    enterScore: "اكتب النتيجة",
    submitRound: "انهِ الجولة",
    doubleScores: "ضاعف النقاط",
    cancelDouble: "إلغاء المضاعفة",
    totalScores: "مجموع النقاط",
    endGame: "انهِ اللعبة",
    gameHistory: "سجل الألعاب",
    noGames: "مفيش ألعاب اتلعبت لحد دلوقتي.",
    delete: "امسح",
    clearHistory: "امسح السجل",
    roundNumber: "الجولة {round}",
    total: "الإجمالي",
    gameNumber: "اللعبة {number}",
    overallScores: "النتائج الكلية",
  },
};

const i18n = createI18n({
  legacy: false,
  locale: "en",
  fallbackLocale: "en",
  messages,
});

export default i18n;
