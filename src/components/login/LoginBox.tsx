import { Button, Card, Image } from 'antd';
import {
  GithubAuthProvider,
  signInWithPopup,
  signInWithRedirect,
} from 'firebase/auth';
import { useCallback, useState } from 'react';
import { isMobile } from 'react-device-detect';
import { getFirebaseAuth } from '@/lib/firebase/auth';

export default function LoginBox() {
  const [isLoading, setLoading] = useState(false);

  const onClickLogin = useCallback(async () => {
    setLoading(true);

    const auth = getFirebaseAuth();
    if (isMobile) {
      // Somehow, login seems to fail on mobile with redirect method.
      await signInWithPopup(auth, new GithubAuthProvider());
    } else {
      await signInWithRedirect(auth, new GithubAuthProvider());
    }
  }, []);

  return (
    <Card
      style={{
        margin: '10',
      }}
      className="mx-4 md:mx-auto md:w-96"
    >
      <div className="my-2">
        <Image
          src="https://github.githubassets.com/images/modules/logos_page/Octocat.png"
          alt="GitHub Logo"
          width={50}
        />
        <div className="mt-2">
          <h1 className="text-lg mb-4">Sign in with GitHub</h1>
          <Button className="w-48" loading={isLoading} onClick={onClickLogin}>
            Login / Signup
          </Button>
        </div>
      </div>
    </Card>
  );
}
