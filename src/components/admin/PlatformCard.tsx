import { Card } from 'antd';
import type { TypingTheme } from '@/types/TypingData';

type Props = {
  theme: TypingTheme;
  classes?: string;
};

export default function PlatformCard({ theme, classes }: Props) {
  return (
    <Card
      title={
        <a href={theme.url} target="_blank" rel="noreferrer">
          {theme.name}
        </a>
      }
      className={classes}
    >
      <div>
        {theme.description.split('\n').map((elem) => {
          return (
            <p key={elem} className="mb-2">
              {elem}
            </p>
          );
        })}
      </div>
    </Card>
  );
}
