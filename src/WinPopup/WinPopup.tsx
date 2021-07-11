import "./WinPopup.css";
import celebration1 from "../assets/gif/celebration1.gif";
import celebration2 from "../assets/gif/celebration2.gif";

export default function WinningPopup() {
  return (
    <section className="WinPopup fixed w-screen h-screen top-0 left-0 flex justify-center">
      <img
        src={celebration1}
        alt="celebration"
        className="absolute bottom-12 sm:bottom-12 sm:right-16 w-96 hidden xl:block"
      />
      <img
        src={celebration2}
        alt="celebration"
        className="absolute bottom-12 left-8 sm:bottom-28 w-80 sm:w-96 hidden xl:block"
      />
    </section>
  );
}
