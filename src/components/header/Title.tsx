import { useRouter } from 'next/router';

export default function Title() {
  const router = useRouter();

  return (
    <button
      type="button"
      className="mx-auto text-center font-cute
      border-none bg-inherit cursor-pointer py-0 text-black"
      onClick={() => router.push('/')}
    >
      <h1 className="m-0 p-4">
        <div className="text-6xl md:text-8xl font-bold">workman</div>
        <div className="text-3xl">.smallkirby.xyz</div>
      </h1>
    </button>
  );
}
