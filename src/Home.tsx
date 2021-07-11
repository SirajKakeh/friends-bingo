import { useContext } from "react";
import BingoGame from "./Bingo/Bingo";
import { GameContext } from "./core/context";
import WinningPopup from "./WinPopup/WinPopup";

export default function Home() {
  const { isGameWon } = useContext(GameContext);

  return (
    <>
      {isGameWon && <WinningPopup />}
      <main className="container mx-auto pb-4 sm:pb-4 flex flex-col items-center">
        <BingoGame />
      </main>
    </>
  );
}
