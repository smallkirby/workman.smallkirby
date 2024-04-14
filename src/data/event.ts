import { TypingEvent } from '@/types/TypingEvent';
import dayjs from 'dayjs';

export const typingEvents: TypingEvent[] = [
  {
    date: dayjs('2024-04-01T00:00:00.000+09:00').toDate(),
    description: 'Start using QWERTY layout during the daytime at work.',
  },
  {
    date: dayjs('2023-10-26T00:00:00.000+09:00').toDate(),
    description: 'Start using Workman layout again.',
  },
  {
    date: dayjs('2023-07-01T00:00:00.000+09:00').toDate(),
    description: 'Stop using Workman layout.',
  },
  {
    date: dayjs('2023-05-14T00:00:00.000+09:00').toDate(),
    description: 'Start using Workman layout.',
  },
];
