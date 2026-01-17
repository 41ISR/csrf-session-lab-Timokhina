import { create } from "zustand";

const useAppStore = create((set, get) => ({
    currentBalance: 0,
    setCurrentClicks: (amount) => set((state) =>
        ({ ...state, currentBalance: amount })),
    leaderboard: [],
    setLeaderboard: (board) => set((state) => ({
        ...state,
        leaderboard: board
    }))
}))

export default useAppStore