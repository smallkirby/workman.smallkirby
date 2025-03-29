import type { TypingTheme } from '@/types/TypingData';
import PlatformCard from './PlatformCard';

type Props = {
  themes: TypingTheme[] | null;
};

export default function PlatformsPanel({ themes }: Props) {
  return (
    <>
      <div className="mx-2 text-center">
        <h2 className="text-3xl mb-4">Platforms</h2>
        <div className="mb-4">
          <p>List of available typing platforms used to practice workman.</p>
        </div>
      </div>

      {themes === null ? (
        <div></div>
      ) : (
        <div className="flex flex-wrap justify-center">
          {themes.map((elem) => {
            return (
              <div className="mx-4 my-2 md:my-4 w-full md:w-2/5" key={elem.id}>
                <PlatformCard theme={elem} />
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}
