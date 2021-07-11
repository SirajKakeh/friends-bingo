export type Card = {
  text: string;
  isFree: boolean;
  isSelected: boolean;
  isWon: boolean;
};

const cards: Card[] = [
  {
    text: "We were on a break!",
    isFree: false,
    isSelected: false,
    isWon: false,
  },
  {
    text: "See? He’s her lobster.",
    isFree: false,
    isSelected: false,
    isWon: false,
  },
  {
    text: "Joey doesn’t share food!",
    isFree: false,
    isSelected: false,
    isWon: false,
  },
  {
    text: "Left Phalange",
    isFree: false,
    isSelected: false,
    isWon: false,
  },
  {
    text: "I wish I could, but I don’t want to.",
    isFree: false,
    isSelected: false,
    isWon: false,
  },
  {
    text: "Seven!",
    isFree: false,
    isSelected: false,
    isWon: false,
  },
  {
    text: "Pivot!",
    isFree: false,
    isSelected: false,
    isWon: false,
  },
  {
    text: "I'll be there for you",
    isFree: false,
    isSelected: false,
    isWon: false,
  },
  {
    text: "Could I be wearing any more clothes?",
    isFree: false,
    isSelected: false,
    isWon: false,
  },
  {
    text: "It tastes like feet!",
    isFree: false,
    isSelected: false,
    isWon: false,
  },
  {
    text: "Custard: good. Jam: good. Meat: good!",
    isFree: false,
    isSelected: false,
    isWon: false,
  },
  {
    text: "This is all a moo point",
    isFree: false,
    isSelected: false,
    isWon: false,
  },
  {
    text: "Smelly cat, smelly cat",
    isFree: false,
    isSelected: false,
    isWon: false,
  },
  {
    text: "And I have to live with a boy!",
    isFree: false,
    isSelected: false,
    isWon: false,
  },
  {
    text: "How you doin'?",
    isFree: false,
    isSelected: false,
    isWon: false,
  },
  {
    text: "Oh. My. God.",
    isFree: false,
    isSelected: false,
    isWon: false,
  },
  {
    text: "I don’t even have a ‘pla.’ ",
    isFree: false,
    isSelected: false,
    isWon: false,
  },
  {
    text: "Ugly naked guy 👀",
    isFree: false,
    isSelected: false,
    isWon: false,
  },
  {
    text: "Will, just take off your shirt and tell us",
    isFree: false,
    isSelected: false,
    isWon: false,
  },
  {
    text: "Nestlé Toulouse",
    isFree: false,
    isSelected: false,
    isWon: false,
  },
  {
    text: "They don’t know that we know they know",
    isFree: false,
    isSelected: false,
    isWon: false,
  },
  {
    text: "Is that what a dinosaur would do?",
    isFree: false,
    isSelected: false,
    isWon: false,
  },
  {
    text: "My name is Claude",
    isFree: false,
    isSelected: false,
    isWon: false,
  },
  {
    text: "I got off the plane",
    isFree: false,
    isSelected: false,
    isWon: false,
  },
  {
    text: "Unagi",
    isFree: false,
    isSelected: false,
    isWon: false,
  },
];

export const getCards = (): Promise<Card[]> => {
  const randomized = cards
    .sort(() => generateNumberBetween(-1, 1))
    .map((card, index) => (index === 12 ? { ...card, isFree: true } : card));
  return Promise.resolve(randomized);
};

const generateNumberBetween = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;
