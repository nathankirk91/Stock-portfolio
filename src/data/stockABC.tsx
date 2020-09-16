export enum TransactionType {
  Buy,
  Sell
}

export interface StockTransaction {
  id: number;
  ticker: string;
  type: TransactionType;
  price: number;
  qty: number;
  date: Date;
  brokerage: number;
  fx?: number;
}

export const currentPrice: { date: Date; price: number; fx: number } = {
  date: new Date(),
  price: 277.96,
  fx: 0.73
};

const stockABC: Array<StockTransaction> = [
  {
    id: 1,
    ticker: "BABA",
    type: TransactionType.Buy,
    price: 178.0,
    qty: 6,
    date: new Date("2017-11-30T00:00:00.000Z"),
    brokerage: 19.95,
    fx: 0.755393474
  },
  {
    id: 2,
    ticker: "BABA",
    type: TransactionType.Buy,
    price: 182.8885,
    qty: 12,
    date: new Date("2018-06-06T00:00:00.000Z"),
    brokerage: 19.95,
    fx: 0.776984047
  },
  {
    id: 3,
    ticker: "BABA",
    type: TransactionType.Buy,
    price: 167.599,
    qty: 7,
    date: new Date("2018-04-04T00:00:00.000Z"),
    brokerage: 19.95,
    fx: 0.774843639
  }
];

export default stockABC;
