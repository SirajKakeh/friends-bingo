/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useReducer } from "react";
import {
  GameContext,
  gameReducer,
  defaultState,
  GAME_ACTION,
} from "./core/context/GameContext";
import usePrevious from "./core/hooks/usePrevious";
import Home from "./Home";

function App() {
  const [state, dispatch] = useReducer(gameReducer, defaultState);

  const prevNumberOfWins: number = usePrevious(state.numberOfWins);

  useEffect(() => {
    if (state.numberOfWins > prevNumberOfWins) {
      setTimeout(
        () => dispatch({ type: GAME_ACTION.STOP_CELEBRATION, payload: null }),
        state.celebrationTimeout
      );
    }
  }, [state.numberOfWins]);

  return (
    <GameContext.Provider value={{ ...state, dispatch }}>
      <div>
        <header>
          <h1 className="w-full text-center text-xl sm:text-6xl my-4 sm:my-8 font-friends">
            F.r.i.e.n.d.s. B.i.n.g.o.
          </h1>
        </header>
        <Home />
      </div>
    </GameContext.Provider>
  );
}

export default App;
