/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect } from "react";
import { getCards } from "../core/api";
import { hasGameBeenWon } from "../core/business/BingoGame";
import { GameContext, GAME_ACTION } from "../core/context";
import FreeCard from "../FreeCard/FreeCard";
import "./Bingo.css";

export default function BingoGame() {
  const { cards, dispatch } = useContext(GameContext);

  useEffect(() => {
    getCards().then((cards) =>
      dispatch({ type: GAME_ACTION.SET_CARDS, payload: cards })
    );
  }, []);

  useEffect(() => {
    if (cards.length) {
      const hasWon = hasGameBeenWon(cards);
      if (hasWon) {
        dispatch({ type: GAME_ACTION.WIN_GAME, payload: hasWon });
      }
    }
  }, [cards]);

  return (
    <>
      <section className="BingoGame grid place-items-center select-none cursor-pointer border-2 border-tile-red shadow-2xl">
        {cards.map(({ text, isSelected, isFree }) => (
          <div
            key={text}
            className={`relative w-full h-full flex flex-col items-center justify-center text-xs sm:text-sm md:text-base lg:text-xl text-center  font-semibold border border-baige p-1 sm:p-8 border-dashed transition-colors duration-200 ${
              isSelected
                ? "bg-green text-baige"
                : "bg-wheat-yellow text-dark-blue"
            }`}
            onClick={() =>
              dispatch({ type: GAME_ACTION.SET_SELECTED, payload: text })
            }
          >
            <span className="font-fantasy">{text}</span>
            {isFree && (
              <span className="badge font-extrabold mt-2">FREE CARD!</span>
            )}
          </div>
        ))}
      </section>
      <FreeCard />
    </>
  );
}
