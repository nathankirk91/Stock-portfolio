import { StockTransaction } from "../data/stockABC";

const compoundInterest = (
  currentPostion: Array<StockTransaction>,
  currentPrice: { date: Date; price: number; fx?: number }
): any => {
  const x = currentPostion
    .map((pos) => {
      const capP = pos.price * pos.qty + pos.brokerage;
      const capFv = currentPrice.price * pos.qty;
      const capInter = compoundInterestCalc(
        capP,
        capFv,
        pos.date,
        currentPrice.date
      );
      const currencyP = pos.fx ? 1 / pos.fx : 1;
      const currencyFv = currentPrice.fx ? 1 / currentPrice.fx : 1;
      const currencyInter = compoundInterestCalc(
        currencyP,
        currencyFv,
        pos.date,
        currentPrice.date
      );
      return {
        capInterest: capInter * pos.qty,
        currencyInterest: currencyInter * pos.qty,
        qty: pos.qty
      };
    })
    .reduce(
      (acc, pos) => ({
        capInterest: acc.capInterest + pos.capInterest,
        currencyInterest: acc.currencyInterest + pos.currencyInterest,
        qty: acc.qty + pos.qty
      }),
      { capInterest: 0, currencyInterest: 0, qty: 0 }
    );
  const y = {
    capInterest: x.capInterest / x.qty,
    currencyInterest: x.currencyInterest / x.qty
  };
  console.log(y);
  return null;
};

export default compoundInterest;

const compoundInterestCalc = (
  p: number,
  fv: number,
  date: Date,
  currentDate: Date
): number => {
  const t =
    (currentDate.valueOf() - date.valueOf()) / 1000 / 60 / 60 / 24 / 365.25;
  return Math.log(fv / p) / t;
};
