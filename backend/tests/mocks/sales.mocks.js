const dateAndTime = '2024-03-30T22:14:58.000Z';

const allSales = [
  {
    saleId: 1,
    date: dateAndTime,
    productId: 1,
    quantity: 5,
  },
  {
    saleId: 1,
    date: dateAndTime,
    productId: 2,
    quantity: 10,
  },
  {
    saleId: 2,
    date: dateAndTime,
    productId: 3,
    quantity: 15,
  },
];

const saleById = [
  {
    date: dateAndTime,
    productId: 1,
    quantity: 5,
  },
  {
    date: dateAndTime,
    productId: 2,
    quantity: 10,
  },
];

module.exports = {
  allSales,
  saleById,
};