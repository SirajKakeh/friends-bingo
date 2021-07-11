import React from "react";
import { Card } from "../api";
import {
  CARD_SERIES_TYPE,
  hasGameBeenWonSuccessReturn,
} from "../business/BingoGame";

export enum GAME_ACTION {
  SET_CARDS = "SET_CARDS",
  SET_SELECTED = "SET_SELECTED",
  WIN_GAME = "WIN_GAME",
  STOP_CELEBRATION = "STOP_CELEBRATION",
  RESET_GAME = "RESET_GAME",
  USE_FREE_CARD = "USE_FREE_CARD",
}

export type Action = {
  type: GAME_ACTION;
  payload: any;
};

export type NumberOfWon = {
  rows: number[];
  columns: number[];
  diagonals: number[];
};

export type GameState = {
  cards: Card[];
  isGameWon: boolean;
  freeCardsLeft: number;
  showCelebration: boolean;
  celebrationTimeout: number;
  numberOfWins: number;
  dispatch: React.Dispatch<Action>;
  numberOfWon: NumberOfWon;

  [key: string]: any;
};

export const defaultState: GameState = {
  cards: [],
  isGameWon: false,
  freeCardsLeft: 1,
  showCelebration: false,
  celebrationTimeout: 2500,
  numberOfWins: 0,
  numberOfWon: {
    rows: [],
    columns: [],
    diagonals: [],
  },
  dispatch: () => {},
};

export const gameReducer = (state: GameState, action: Action) => {
  switch (action.type) {
    case GAME_ACTION.SET_CARDS:
      return {
        ...state,
        cards: action.payload,
      };

    case GAME_ACTION.SET_SELECTED:
      const cards = state.cards.map((card) =>
        card.text === action.payload ? { ...card, isSelected: true } : card
      );
      return {
        ...state,
        cards,
      };

    case GAME_ACTION.WIN_GAME:
      const wonCardsArray: hasGameBeenWonSuccessReturn = action.payload;

      const updatedCards = state.cards.map((card) => {
        if (wonCardsArray[2].find(({ text }) => text === card.text)) {
          return { ...card, isWon: true };
        }
        return card;
      });

      const numberOfWon: NumberOfWon = {
        ...state.numberOfWon,
        ...(wonCardsArray[0] === CARD_SERIES_TYPE.ROW && {
          rows: state.numberOfWon.rows.concat(wonCardsArray[1]),
        }),
        ...(wonCardsArray[0] === CARD_SERIES_TYPE.COLUMN && {
          columns: state.numberOfWon.columns.concat(wonCardsArray[1]),
        }),
        ...(wonCardsArray[0] === CARD_SERIES_TYPE.DIAGONAL && {
          diagonals: state.numberOfWon.diagonals.concat(wonCardsArray[1]),
        }),
      };

      return {
        ...state,
        cards: updatedCards,
        isGameWon: action.payload,
        showCelebration: true,
        numberOfWins: state.numberOfWins + 1,
        numberOfWon: numberOfWon,
      };

    case GAME_ACTION.STOP_CELEBRATION:
      return { ...state, showCelebration: false };

    case GAME_ACTION.RESET_GAME:
      return {
        ...state,
        cards: action.payload,
        isGameWon: false,
        showCelebration: false,
        freeCardsLeft: 1,
        numberOfWins: 0,
        numberOfWon: {
          rows: [],
          columns: [],
          diagonals: [],
        },
      };

    case GAME_ACTION.USE_FREE_CARD:
      if (state.freeCardsLeft > 0) {
        const randomIndex = Math.floor(Math.random() * state.cards.length);
        const cards = state.cards.map((card, index) =>
          index === randomIndex ? { ...card, isFree: true } : card
        );
        return { ...state, cards, freeCardsLeft: state.freeCardsLeft - 1 };
      }
      return state;

    default:
      return state;
  }
};

export const GameContext = React.createContext(defaultState);
