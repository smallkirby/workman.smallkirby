import Title from '@/components/header/Title';
import UserBadge from '@/components/header/UserBadge';

type Props = { children: React.ReactNode };

export default function MainLayout({ children }: Props) {
  return (
    <div className="m-3 mx-auto">
      <header className="text-center mb-4 relative">
        <div className="m-3 md:w-2/3 mx-auto static">
          <Title />
        </div>
        <div className="md:absolute md:top-0 md:right-0 md:m-8 m-1">
          <UserBadge />
        </div>
      </header>
      <div className="md:w-2/3 md:mx-auto mx-2">{children}</div>
    </div>
  );
}
