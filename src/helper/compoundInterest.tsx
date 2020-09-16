import { StockTransaction } from "../data/stockABC";

const compoundInterest = (
  currentPostion: Array<StockTransaction>,
  currentPrice: { date: Date; price: number }
): any => {
  console.log(
    currentPostion.map((pos) => {
      const p = pos.price * pos.qty + pos.brokerage;
      const fv = currentPrice.price * pos.qty;
      const t =
        (currentPrice.date.valueOf() - pos.date.valueOf()) /
        1000 /
        60 /
        60 /
        24 /
        365.25;
      return { interest: Math.log(fv / p) / t, ...pos };
    })
  );
  return null;
};

export default compoundInterest;
