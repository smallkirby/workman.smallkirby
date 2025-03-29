import { GithubFilled } from '@ant-design/icons';
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
      className="mx-20 md:mx-auto w-full md:w-96"
      style={{ marginLeft: '30px', marginRight: '30px' }}
    >
      <div className="my-2">
        <GithubFilled style={{ fontSize: '2.0rem' }} />
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
