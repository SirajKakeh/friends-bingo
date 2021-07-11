import React from "react";
import { Card } from "../api";

export enum GAME_ACTION {
  SET_CARDS = "SET_CARDS",
  SET_SELECTED = "SET_SELECTED",
  WIN_GAME = "WIN_GAME",
  RESET_GAME = "RESET_GAME",
  USE_FREE_CARD = "USE_FREE_CARD",
}

export type Action = {
  type: GAME_ACTION;
  payload: any;
};

export type GameState = {
  cards: Card[];
  isGameWon: boolean;
  freeCardsLeft: number;
  dispatch: React.Dispatch<Action>;
  [key: string]: any;
};

export const defaultState: GameState = {
  cards: [],
  isGameWon: false,
  freeCardsLeft: 1,
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
      return { ...state, isGameWon: action.payload };

    case GAME_ACTION.RESET_GAME:
      return {
        ...state,
        cards: action.payload,
        isGameWon: false,
        freeCardsLeft: 1,
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
