/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import { Card, getCards } from "../core/api";
import { hasGameBeenWon } from "../core/business/BingoGame";
import { ReactComponent as ReplayLogo } from "../assets/svg/redo.svg";
import { GameContext, GAME_ACTION } from "../core/context";
import FreeCard from "../FreeCard/FreeCard";
import "./Bingo.css";

export default function BingoGame() {
  const { cards, numberOfWon, dispatch } = useContext(GameContext);
  const [selectedCardIndex, setSelectedCardIndex] = useState<number>(-1);

  useEffect(() => {
    getCards().then((cards) =>
      dispatch({ type: GAME_ACTION.SET_CARDS, payload: cards })
    );
  }, []);

  useEffect(() => {
    if (cards.length && selectedCardIndex !== -1) {
      const hasWon = hasGameBeenWon(cards, numberOfWon, selectedCardIndex);
      if (hasWon) {
        dispatch({ type: GAME_ACTION.WIN_GAME, payload: hasWon });
      }
    }
  }, [selectedCardIndex]);

  const handleCardClick = (card: Card, index: number) => {
    if (!card.isSelected) {
      setSelectedCardIndex(index);
      dispatch({ type: GAME_ACTION.SET_SELECTED, payload: card.text });
    }
  };

  const handleResetClick = () => {
    getCards().then((cards) => {
      dispatch({ type: GAME_ACTION.RESET_GAME, payload: cards });
    });
  };

  return (
    <>
      <section className="flex xl:flex-col justify-center items-center relative xl:fixed xl:left-0 xl:top-0 pt-8 xl:pt-0 xl:h-screen xl:pl-4 order-last xl:order-none">
        <FreeCard />
        <div
          className="flex xl:flex-col relative w-8 xl:w-16 ml-8 xl:ml-0 mt-4 xl:mt-16 text-center cursor-pointer transition duration-200 transform hover:scale-125 active:scale-100"
          onClick={handleResetClick}
        >
          <ReplayLogo className="w-full min-w-full mr-2 xl:mr-0" />
          <span className="mt-2 text-tiny xl:text-xs text-dark-blue">
            Reset
          </span>
        </div>
      </section>
      <section className="BingoGame grid place-items-center select-none cursor-pointer border-2 border-tile-red shadow-2xl">
        {cards.map((card, index) => (
          <div
            key={card.text}
            className={`card relative w-full h-full flex flex-col items-center justify-center text-xs sm:text-sm md:text-base lg:text-xl text-center font-semibold border border-baige p-1 sm:p-8 border-dashed transition-colors duration-200 ${
              card.isSelected
                ? "bg-green text-baige"
                : "bg-wheat-yellow text-dark-blue"
            } ${card.isWon ? "won" : ""}`}
            onClick={() => handleCardClick(card, index)}
          >
            <span className="">{card.text}</span>
            {card.isFree && (
              <span className="badge font-extrabold mt-2">FREE CARD!</span>
            )}
          </div>
        ))}
      </section>
    </>
  );
}
