import { useRouter } from 'next/router';

export default function Title() {
  const router = useRouter();

  return (
    <button
      className="mx-auto text-center w-full font-cute"
      onClick={() => router.push('/')}
    >
      <h1 className="text-6xl md:text-8xl">
        <div>workman</div>
        <div className="text-3xl">.smallkirby.xyz</div>
      </h1>
    </button>
  );
}
