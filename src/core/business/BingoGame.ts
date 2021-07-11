import { Card } from "../api";

export const hasGameBeenWon = (cards: Card[]) => {
  return isAnyRowWon(cards) || isAnyColumnWon(cards) || isDiagonallyWon(cards);
};

const SIZE = 5;

const isAnyRowWon = (cards: Card[]) => {
  const rows = createRows(cards, SIZE);

  for (let row of rows) {
    if (isWon(row)) return row;
  }
  return false;
};

const isAnyColumnWon = (cards: Card[]) => {
  const columns = createColumns(cards, SIZE);

  for (let column of columns) {
    if (isWon(column)) return column;
  }
  return false;
};

const isDiagonallyWon = (cards: Card[]) => {
  return isLeftDiagonalWon(cards) || isRightDiagonalWon(cards);
};

const isLeftDiagonalWon = (cards: Card[]) => {
  const diagonal = [];

  for (let i = 0; i < SIZE; i++) {
    diagonal.push(cards[i + i * SIZE]);
  }

  return isWon(diagonal) ? diagonal : false;
};

const isRightDiagonalWon = (cards: Card[]) => {
  const diagonal = [];

  for (let i = SIZE - 1; i >= 0; i--) {
    diagonal.push(cards[SIZE - 1 + i * (SIZE - 1)]);
  }

  return isWon(diagonal) ? diagonal : false;
};

const isWon = (cards: Card[]) =>
  cards.every(({ isSelected, isFree }) => isSelected || isFree);

const createRows = (
  cards: Card[],
  numberOfRows: number
): Array<Array<Card>> => {
  if (numberOfRows === 0) {
    return [];
  }
  return createRows(cards, numberOfRows - 1).concat([
    createRow(cards, numberOfRows - 1),
  ]);
};

const createRow = (array: Card[], startIndex: number) => {
  const row = [];

  for (let i = 0; i < SIZE; i++) {
    row.push(array[i + startIndex * SIZE]);
  }

  return row;
};

const createColumns = (
  cards: Card[],
  numberOfColumns: number
): Array<Array<Card>> => {
  if (numberOfColumns === 0) {
    return [];
  }
  return createColumns(cards, numberOfColumns - 1).concat([
    createColumn(cards, numberOfColumns - 1),
  ]);
};

const createColumn = (array: Card[], startIndex: number) => {
  const column = [];

  for (let i = 0; i < SIZE; i++) {
    column.push(array[startIndex + i * SIZE]);
  }

  return column;
};
