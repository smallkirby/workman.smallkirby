import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';
import LoginBox from '@/components/login/LoginBox';
import MainLayout from '@/layouts/MainLayout';
import { FirebaseAuthContext } from '@/lib/firebase/auth';

export default function Login() {
  const router = useRouter();
  const authContext = useContext(FirebaseAuthContext);

  useEffect(() => {
    if (authContext.user) {
      router.push('/');
    }
  }, [authContext.user, router]);

  return (
    <MainLayout>
      <div className="mx-auto w-full text-center pt-8">
        <div className="mb-8">
          You need to login as{' '}
          <a
            href="https://github.com/smallkirby"
            target="_blank"
            rel="noreferrer"
          >
            smallkirby
          </a>{' '}
          to edit entries.
        </div>
        <LoginBox />
      </div>
    </MainLayout>
  );
}
