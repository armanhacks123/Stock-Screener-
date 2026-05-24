import { Stock } from "../data/mockStocks";

export function startStockStream(
  stocks: Stock[],
  setStocks: React.Dispatch<
    React.SetStateAction<Stock[]>
  >
) {
  const interval = setInterval(() => {
    setStocks((prev) =>
      prev.map((stock) => {
        const randomChange =
          (Math.random() - 0.5) * 200;

        return {
          ...stock,
          price: Number(
            (
              stock.price +
              randomChange
            ).toFixed(2)
          ),
        };
      })
    );
  }, 1000);

  return () => clearInterval(interval);
}