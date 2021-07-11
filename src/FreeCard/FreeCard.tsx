import { useContext } from "react";
import { ReactComponent as FreeCardIcon } from "../assets/svg/free.svg";
import { GameContext, GAME_ACTION } from "../core/context";
import "./FreeCard.css";

export default function FreeCard() {
  const { freeCardsLeft, dispatch } = useContext(GameContext);

  return (
    <button
      onClick={() =>
        dispatch({ type: GAME_ACTION.USE_FREE_CARD, payload: null })
      }
      disabled={freeCardsLeft === 0}
      className="FreeCard mt-4 xl:mt-0 relative xl:fixed flex items-center xl:block left-0 xl:left-6 top-0 xl:top-1/3 w-24 transition duration-200 transform hover:scale-125 active:scale-100"
    >
      <FreeCardIcon className="w-full mr-2 xl:mr-0" />
      <div className="flex flex-col items-center text-tiny xl:text-xs text-dark-blue mt-2 xl:mt-4 leading-none whitespace-nowrap xl:whitespace-normal">
        Free Cards:
        <span className="badge w-5 mt-2">{freeCardsLeft}</span>
      </div>
    </button>
  );
}
