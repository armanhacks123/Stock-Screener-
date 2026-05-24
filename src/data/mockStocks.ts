export interface Stock {
  symbol: string;
  company: string;
  price: number;
  sector: string;
}

export const stocks = Array.from(
  { length: 5000 },
  (_, i) => ({
    symbol: `STOCK${i}`,
    company: `Company ${i}`,

    price: 1000 + i,

    sector: [
      "IT",
      "Banking",
      "Pharma",
    ][i % 3],
  })
);