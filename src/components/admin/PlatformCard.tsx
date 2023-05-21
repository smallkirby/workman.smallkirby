import type { TypingTheme } from '@/types/TypingData';
import { Card } from 'antd';

type Props = {
  theme: TypingTheme;
  classes?: string;
};

export default function PlatformCard({ theme, classes }: Props) {
  return (
    <Card
      title={
        <a href={theme.url} target="_blank">
          {theme.name}
        </a>
      }
      className={classes}
    >
      <div>
        {theme.description.split('\n').map((elem, ix) => {
          return (
            <p key={ix} className="mb-2">
              {elem}
            </p>
          );
        })}
      </div>
    </Card>
  );
}
