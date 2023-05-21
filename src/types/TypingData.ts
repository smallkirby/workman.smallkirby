export type TypingTheme = {
  id: string;
  name: string;
  url: string;
  description: string;
};

export type TypingData = {
  wpm: number;
  accuracy: number;
  badKeys: string;
  date: Date;
  themeId: string;
};
