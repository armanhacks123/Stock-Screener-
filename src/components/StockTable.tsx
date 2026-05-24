"use client";

import { useMemo, useState } from "react";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";

import { useStockStore } from "../store/useStockStore";

interface Stock {
  symbol: string;
  company: string;
  price: number;
  sector: string;
}

interface Props {
  data: Stock[];
}

export default function StockTable({
  data,
}: Props) {
  const [sorting, setSorting] =
    useState<SortingState>([]);

  const livePrices = useStockStore(
    (state) => state.livePrices
  );

  const columns = useMemo<
    ColumnDef<Stock>[]
  >(
    () => [
      {
        accessorKey: "symbol",
        header: "Symbol",
      },

      {
        accessorKey: "company",
        header: "Company",
      },

      {
        id: "price",

        header: "Price",

        accessorFn: (row) =>
          livePrices[row.symbol] ||
          row.price,

        cell: ({ row }) => {
          const symbol =
            row.original.symbol;

          const currentPrice =
            livePrices[symbol] ||
            row.original.price;

          const originalPrice =
            row.original.price;

          const difference =
            currentPrice - originalPrice;

          let color = "black";

          if (difference > 0) {
            color = "green";
          } else if (
            difference < 0
          ) {
            color = "red";
          }

          return (
            <span
              style={{
                color,
                fontWeight: "bold",
                fontSize: "16px",
              }}
            >
              ₹
              {currentPrice.toFixed(2)}
            </span>
          );
        },
      },

      {
        accessorKey: "sector",
        header: "Sector",
      },
    ],
    [livePrices]
  );

  const table = useReactTable({
    data,
    columns,

    state: {
      sorting,
    },

    onSortingChange:
      setSorting,

    getCoreRowModel:
      getCoreRowModel(),

    getSortedRowModel:
      getSortedRowModel(),
  });

  return (
    <div className="overflow-auto border rounded-lg mt-6 h-[600px]">
      <table className="w-full border-collapse">
        <thead className="bg-gray-100 sticky top-0 z-10">
          {table
            .getHeaderGroups()
            .map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(
                  (header) => (
                    <th
                      key={header.id}
                      className="text-left p-3 border-b cursor-pointer bg-white"
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      {flexRender(
                        header.column
                          .columnDef.header,
                        header.getContext()
                      )}

                      {{
                        asc: " 🔼",
                        desc: " 🔽",
                      }[
                        header.column.getIsSorted() as string
                      ] ?? null}
                    </th>
                  )
                )}
              </tr>
            ))}
        </thead>

        <tbody>
          {table
            .getRowModel()
            .rows.map((row) => (
              <tr
                key={row.id}
                className="hover:bg-gray-50"
              >
                {row
                  .getVisibleCells()
                  .map((cell) => (
                    <td
                      key={cell.id}
                      className="p-3 border-b"
                    >
                      {flexRender(
                        cell.column
                          .columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}