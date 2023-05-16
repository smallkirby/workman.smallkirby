import { getFirebaseAuth } from '@/lib/firebase/auth';
import { Button, Card, Image } from 'antd';
import { GithubAuthProvider, signInWithRedirect } from 'firebase/auth';
import { useCallback, useState } from 'react';

export default function LoginBox() {
  const [isLoading, setLoading] = useState(false);

  const onClickLogin = useCallback(async () => {
    setLoading(true);

    const auth = getFirebaseAuth();
    await signInWithRedirect(auth, new GithubAuthProvider());
  }, []);

  return (
    <Card
      style={{
        width: '400px',
        margin: 'auto',
      }}
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
