import { useContext, useEffect, useState } from "react";
import "./WinPopup.css";
import { ReactComponent as RedoIcon } from "../assets/svg/redo.svg";
import { GameContext, GAME_ACTION } from "../core/context";
import { getCards } from "../core/api";
import celebration1 from "../assets/gif/celebration1.gif";
import celebration2 from "../assets/gif/celebration2.gif";

export default function WinningPopup() {
  const { dispatch } = useContext(GameContext);
  const [active, setActive] = useState(false);

  const handleReplayClick = () => {
    getCards().then((cards) =>
      dispatch({ type: GAME_ACTION.RESET_GAME, payload: cards })
    );
  };

  useEffect(() => {
    setTimeout(() => setActive(true), 10);
  }, []);

  return (
    <section
      className={`WinPopup fixed w-screen h-screen top-0 left-0 flex justify-center transition-all duration-300 z-10 ${
        active ? "active backdrop-filter backdrop-blur-lg" : ""
      }`}
    >
      <div
        className={`popover-inner flex flex-col items-center py-6 sm:py-12 ${
          active ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="popover-text text-shadow-sm w-screen text-center text-7xl font-extrabold text-dark-blue transition-opacity duration-300 mb-6 sm:mb-10 mt-4 sm:mt-24">
          <span>You've Won!</span>
        </div>
        <div
          className="icon-wrapper w-20 cursor-pointer transition-all duration-300"
          onClick={handleReplayClick}
        >
          <RedoIcon className="z-10" />
        </div>
        <img
          src={celebration1}
          alt="celebration"
          className="absolute bottom-12 sm:bottom-12 sm:right-16 w-96 hidden sm:block"
        />
        <img
          src={celebration2}
          alt="celebration"
          className="absolute bottom-12 left-8 sm:bottom-28 w-80 sm:w-96"
        />
        <p className="text-shadow-sm text-xl font-bold text-baige mt-4">
          Replay
        </p>
      </div>
    </section>
  );
}
