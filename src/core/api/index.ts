export type Card = {
  text: string;
  isFree: boolean;
  isSelected: boolean;
};

const cards: Card[] = [
  {
    text: "We were on a break!",
    isFree: false,
    isSelected: false,
  },
  {
    text: "See? He’s her lobster.",
    isFree: false,
    isSelected: false,
  },
  {
    text: "Joey doesn’t share food!",
    isFree: false,
    isSelected: false,
  },
  {
    text: "Left Phalange",
    isFree: false,
    isSelected: false,
  },
  {
    text: "I wish I could, but I don’t want to.",
    isFree: false,
    isSelected: false,
  },
  {
    text: "Seven!",
    isFree: false,
    isSelected: false,
  },
  {
    text: "Pivot!",
    isFree: false,
    isSelected: false,
  },
  {
    text: "I'll be there for you",
    isFree: false,
    isSelected: false,
  },
  {
    text: "Could I be wearing any more clothes?",
    isFree: false,
    isSelected: false,
  },
  {
    text: "It tastes like feet!",
    isFree: false,
    isSelected: false,
  },
  {
    text: "Custard: good. Jam: good. Meat: good!",
    isFree: false,
    isSelected: false,
  },
  {
    text: "This is all a moo point",
    isFree: false,
    isSelected: false,
  },
  {
    text: "Smelly cat, smelly cat",
    isFree: false,
    isSelected: false,
  },
  {
    text: "And I have to live with a boy!",
    isFree: false,
    isSelected: false,
  },
  {
    text: "How you doin'?",
    isFree: false,
    isSelected: false,
  },
  {
    text: "Oh. My. God.",
    isFree: false,
    isSelected: false,
  },
  {
    text: "I don’t even have a ‘pla.’ ",
    isFree: false,
    isSelected: false,
  },
  {
    text: "Ugly naked guy 👀",
    isFree: false,
    isSelected: false,
  },
  {
    text: "Will, just take off your shirt and tell us",
    isFree: false,
    isSelected: false,
  },
  {
    text: "Nestlé Toulouse",
    isFree: false,
    isSelected: false,
  },
  {
    text: "They don’t know that we know they know we know",
    isFree: false,
    isSelected: false,
  },
  {
    text: "Is that what a dinosaur would do?",
    isFree: false,
    isSelected: false,
  },
  {
    text: "My name is Claude",
    isFree: false,
    isSelected: false,
  },
  {
    text: "I got off the plane",
    isFree: false,
    isSelected: false,
  },
  {
    text: "Unagi",
    isFree: false,
    isSelected: false,
  },
];

export const getCards = (): Promise<Card[]> => {
  const randomIndex = Math.floor(Math.random() * cards.length);
  const randomized = cards
    .map((card, index) =>
      index === randomIndex ? { ...card, isFree: true } : card
    )
    .sort(() => generateNumberBetween(-1, 1));
  return Promise.resolve(randomized);
};

const generateNumberBetween = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;
