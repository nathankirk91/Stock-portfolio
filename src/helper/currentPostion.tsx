import { StockTransaction, TransactionType } from "../data/stockABC";

const currentPostion = (
  stockTransactions: Array<StockTransaction>
): Array<StockTransaction> => {
  stockTransactions.sort((a, b) => a.date.valueOf() - b.date.valueOf());
  const buyTranscations = stockTransactions.filter(
    (trans) => trans.type === TransactionType.Buy
  );
  const sellTransactions = stockTransactions.filter(
    (trans) => trans.type === TransactionType.Sell
  );
  const currentPostions = sellTransactions.reduce((acc, sellTrans) => {
    let remainingFromSale = sellTrans.qty;
    const x = acc.map((buyTrans) => {
      if (remainingFromSale > 0) {
        if (buyTrans.qty >= remainingFromSale) {
          const x = { ...buyTrans, qty: buyTrans.qty - remainingFromSale };
          remainingFromSale = 0;
          return x;
        } else {
          remainingFromSale -= buyTrans.qty;
          return { ...buyTrans, qty: 0 };
        }
      } else {
        return { ...buyTrans };
      }
    });
    return x;
  }, buyTranscations);
  return currentPostions;
};

export default currentPostion;
