import { useReducer } from "react";
import {
  GameContext,
  gameReducer,
  defaultState,
} from "./core/context/GameContext";
import Home from "./Home";

function App() {
  const [state, dispatch] = useReducer(gameReducer, defaultState);

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
