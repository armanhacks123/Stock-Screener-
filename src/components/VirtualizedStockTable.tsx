"use client";

interface Stock {
  symbol: string;
  company: string;
  price: number;
  sector: string;
}

interface Props {
  stocks: Stock[];
}

export default function VirtualizedStockTable({
  stocks,
}: Props) {
  return (
    <div className="bg-white rounded-lg shadow border overflow-hidden">
      {/* HEADER */}
      <div className="grid grid-cols-4 bg-gray-100 font-bold p-4 border-b">
        <div>Symbol</div>
        <div>Company</div>
        <div>Price</div>
        <div>Sector</div>
      </div>

      {/* ROWS */}
      <div className="h-[600px] overflow-y-auto">
        {stocks.map((stock) => (
          <div
            key={stock.symbol}
            className="grid grid-cols-4 items-center border-b px-4 h-[60px] hover:bg-gray-50"
          >
            <div className="font-bold">
              {stock.symbol}
            </div>

            <div>{stock.company}</div>

            <div
              className={`font-bold ${
                stock.price >= 1500
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              ₹{stock.price.toFixed(2)}
            </div>

            <div>{stock.sector}</div>
          </div>
        ))}
      </div>
    </div>
  );
}