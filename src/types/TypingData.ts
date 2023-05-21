export type TypingTheme = {
  id: string;
  name: string;
  url: string;
  description: string;
};

export type TypingData = {
  id?: string;
  wpm: number;
  accuracy: number;
  badKeys: string;
  date: Date;
  themeId: string;
};
