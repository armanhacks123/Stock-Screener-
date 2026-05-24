import { create } from "zustand";

interface StockState {
  search: string;
  sector: string;
  sortAsc: boolean;

  livePrices: Record<string, number>;
  previousPrices: Record<string, number>;

  watchlist: string[];

  setSearch: (value: string) => void;
  setSector: (value: string) => void;

  toggleSort: () => void;

  updatePrice: (
    symbol: string,
    newPrice: number
  ) => void;

  addToWatchlist: (
    symbol: string
  ) => void;

  removeFromWatchlist: (
    symbol: string
  ) => void;
}

export const useStockStore =
  create<StockState>((set) => ({
    search: "",
    sector: "All",
    sortAsc: true,

    livePrices: {},
    previousPrices: {},

    watchlist: [],

    setSearch: (value) =>
      set({ search: value }),

    setSector: (value) =>
      set({ sector: value }),

    toggleSort: () =>
      set((state) => ({
        sortAsc: !state.sortAsc,
      })),

    updatePrice: (
      symbol,
      newPrice
    ) =>
      set((state) => ({
        previousPrices: {
          ...state.previousPrices,
          [symbol]:
            state.livePrices[symbol] ||
            newPrice,
        },

        livePrices: {
          ...state.livePrices,
          [symbol]: newPrice,
        },
      })),

    addToWatchlist: (symbol) =>
      set((state) => ({
        watchlist: [
          ...state.watchlist,
          symbol,
        ],
      })),

    removeFromWatchlist: (
      symbol
    ) =>
      set((state) => ({
        watchlist:
          state.watchlist.filter(
            (s) => s !== symbol
          ),
      })),
  }));