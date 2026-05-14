export interface WishOption {
  id: string
  text: string
}

export interface WishJarQuestion {
  question: string
  options: { id: string; label: string; text: string }[]
  correctAnswer: string
  hint: string
}

export interface Wish {
  id: string
  emoji: string
  text: string
}

export const wishJarQuestion: WishJarQuestion = {
  question: `Tell me... What is the most amazing thing I like about you?`,
  hint: `Think carefully, my love... ♡`,
  options: [
    { id: 'A', label: 'A', text: `Your Smile` },
    { id: 'B', label: 'B', text: `Your Body` },
    { id: 'C', label: 'C', text: `Your Nature` },
    { id: 'D', label: 'D', text: `All of the Above` },
  ],
  correctAnswer: 'D', // Change this to the correct option ID
}

export const wishes: Wish[] = [
  {
    id: 'wish1',
    emoji: '❤️',
    text: `5 pictures of me as you want to see me, whatever you want, I shall do`,
  },
  {
    id: 'wish2',
    emoji: '🌙',
    text: `1 Video of me as you want to see me for 15 seconds`,
  },
  {
    id: 'wish3',
    emoji: '💌',
    text: `2 Ice Creams whenever you want just text me.`,
  },
  {
    id: 'wish4',
    emoji: '🎵',
    text: `A song of your choice with my voice on guitar sent to you`,
  },
  {
    id: 'wish5',
    emoji: '🌸',
    text: `A material gift of your choice`,
  },
  {
    id: 'wish6',
    emoji: '📚',
    text: `You want me to say something I will say that, 1 statement only`,
  },
]

export const jarFireflies = 12 // number of regular fireflies in the jar
