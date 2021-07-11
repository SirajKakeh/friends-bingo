import { Card } from "../api";
import { NumberOfWon } from "../context";

let rowsWon: number[] = [];
let columnsWon: number[] = [];
let diagonalsWon: number[] = [];
let selectedCardIndex: number;

export enum CARD_SERIES_TYPE {
  ROW,
  COLUMN,
  DIAGONAL,
}
export type hasGameBeenWonSuccessReturn = [CARD_SERIES_TYPE, number, Card[]];

export type hasGameBeenWonReturnType = false | hasGameBeenWonSuccessReturn;

export const hasGameBeenWon = (
  cards: Card[],
  numberOfWon: NumberOfWon,
  cardIndex: number
): hasGameBeenWonReturnType => {
  rowsWon = numberOfWon.rows;
  columnsWon = numberOfWon.columns;
  diagonalsWon = numberOfWon.diagonals;
  selectedCardIndex = cardIndex;

  return isAnyRowWon(cards) || isAnyColumnWon(cards) || isDiagonallyWon(cards);
};

const SIZE = 5;

const isAnyRowWon = (cards: Card[]): hasGameBeenWonReturnType => {
  const rows = createRows(cards, SIZE);

  for (let row of rows) {
    if (isWon(row))
      return [CARD_SERIES_TYPE.ROW, getRowNumber(selectedCardIndex), row];
  }
  return false;
};

const isAnyColumnWon = (cards: Card[]): hasGameBeenWonReturnType => {
  const columns = createColumns(cards, SIZE);

  for (let column of columns) {
    if (isWon(column))
      return [CARD_SERIES_TYPE.COLUMN, getColNumber(selectedCardIndex), column];
  }
  return false;
};

const isDiagonallyWon = (cards: Card[]) => {
  return isLeftDiagonalWon(cards) || isRightDiagonalWon(cards);
};

const isLeftDiagonalWon = (cards: Card[]): hasGameBeenWonReturnType => {
  if (diagonalsWon.includes(0)) return false;

  const diagonal = [];

  for (let i = 0; i < SIZE; i++) {
    diagonal.push(cards[i + i * SIZE]);
  }

  return isWon(diagonal) ? [CARD_SERIES_TYPE.DIAGONAL, 0, diagonal] : false;
};

const isRightDiagonalWon = (cards: Card[]): hasGameBeenWonReturnType => {
  if (diagonalsWon.includes(1)) return false;

  const diagonal = [];

  for (let i = SIZE - 1; i >= 0; i--) {
    diagonal.push(cards[SIZE - 1 + i * (SIZE - 1)]);
  }

  return isWon(diagonal) ? [CARD_SERIES_TYPE.DIAGONAL, 1, diagonal] : false;
};

const isWon = (cards: Card[]) =>
  !!cards.length &&
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
  if (rowsWon.includes(startIndex)) return [];

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
  if (columnsWon.includes(startIndex)) return [];

  const column = [];

  for (let i = 0; i < SIZE; i++) {
    column.push(array[startIndex + i * SIZE]);
  }

  return column;
};

const getRowNumber = (cardIndex: number) => Math.floor(cardIndex / SIZE);

const getColNumber = (cardIndex: number) => cardIndex % SIZE;
