import Title from '@/components/Title';

type Props = { children: React.ReactNode };

export default function MainLayout({ children }: Props) {
  return (
    <div className="m-3 md:w-2/3 mx-auto">
      <header className="text-center mb-4">
        <Title />
      </header>
      <div>{children}</div>
    </div>
  );
}
