"use client";

import { useEffect, useState } from "react";

import StockChart from "../components/StockChart";
import CandleChart from "../components/CandleChart";
import VirtualizedStockTable from "../components/VirtualizedStockTable";

import LoadingSkeleton from "../components/LoadingSkeleton";

import { startStockStream } from "../services/socket";

import { useStockStore } from "../store/useStockStore";

import {
  stocks as initialStocks,
  Stock,
} from "../data/mockStocks";

export default function Home() {
  // ZUSTAND STORE
  const {
    search,
    sector,
    sortAsc,
    setSearch,
    setSector,
    toggleSort,
  } = useStockStore();

  // STOCK STATE
  const [stocks, setStocks] =
    useState<Stock[]>(initialStocks);

  const [mounted, setMounted] =
    useState(false);

  const [darkMode, setDarkMode] =
    useState(false);

  const [loading, setLoading] =
    useState(true);

  // FIX HYDRATION
  useEffect(() => {
    setMounted(true);

    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, []);

  // WEBSOCKET STREAM
  useEffect(() => {
    const stopStream =
      startStockStream(
        stocks,
        setStocks
      );

    return () => stopStream();
  }, []);

  // FILTER + SORT
  const filteredStocks = stocks
    .filter((stock) =>
      stock.symbol
        .toLowerCase()
        .includes(search.toLowerCase())
    )
    .filter((stock) =>
      sector === "All"
        ? true
        : stock.sector === sector
    )
    .sort((a, b) =>
      sortAsc
        ? a.price - b.price
        : b.price - a.price
    );

  if (!mounted) return null;

  return (
    <main
      className={`p-10 min-h-screen transition-all ${
        darkMode
          ? "bg-black text-white"
          : "bg-gray-50 text-black"
      }`}
    >
      {/* TITLE */}
      <h1 className="text-4xl font-bold text-blue-600 mb-6">
        Real-Time Stock Screener
      </h1>

      {/* DARK MODE */}
      <button
        onClick={() =>
          setDarkMode(!darkMode)
        }
        className="mb-6 bg-black text-white px-4 py-2 rounded-lg"
      >
        Toggle Dark Mode
      </button>

      {/* FILTERS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {/* SEARCH */}
        <input
          type="text"
          placeholder="Search stock..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="border p-3 rounded-lg bg-white text-black"
        />

        {/* SECTOR */}
        <select
          value={sector}
          onChange={(e) =>
            setSector(e.target.value)
          }
          className="border p-3 rounded-lg bg-white text-black"
        >
          <option value="All">
            All Sectors
          </option>

          <option value="IT">
            IT
          </option>

          <option value="Banking">
            Banking
          </option>

          <option value="Pharma">
            Pharma
          </option>
        </select>

        {/* SORT */}
        <button
          onClick={() =>
            toggleSort()
          }
          className="bg-blue-600 text-white rounded-lg p-3 font-bold"
        >
          Sort Price:
          {sortAsc
            ? " Low → High"
            : " High → Low"}
        </button>
      </div>

      {/* LOADING */}
      {loading ? (
        <LoadingSkeleton />
      ) : (
        <>
          {/* SUMMARY */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {/* TOTAL */}
            <div className="bg-white p-6 rounded-lg shadow text-black">
              <h2 className="text-gray-500">
                Total Stocks
              </h2>

              <p className="text-3xl font-bold">
                {filteredStocks.length}
              </p>
            </div>

            {/* HIGH */}
            <div className="bg-white p-6 rounded-lg shadow text-black">
              <h2 className="text-gray-500">
                Highest Price
              </h2>

              <p className="text-3xl font-bold text-green-600">
                ₹
                {Math.max(
                  ...filteredStocks.map(
                    (s) => s.price
                  )
                ).toFixed(2)}
              </p>
            </div>

            {/* LOW */}
            <div className="bg-white p-6 rounded-lg shadow text-black">
              <h2 className="text-gray-500">
                Lowest Price
              </h2>

              <p className="text-3xl font-bold text-red-600">
                ₹
                {Math.min(
                  ...filteredStocks.map(
                    (s) => s.price
                  )
                ).toFixed(2)}
              </p>
            </div>
          </div>

          {/* CHARTS */}
          <StockChart />

          <div className="mt-8">
            <CandleChart />
          </div>

          {/* TABLE */}
          <div className="mt-8">
            <VirtualizedStockTable
              stocks={filteredStocks}
            />
          </div>
        </>
      )}
    </main>
  );
}