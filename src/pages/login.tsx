import LoginBox from '@/components/LoginBox';
import MainLayout from '@/layouts/MainLayout';

export default function Login() {
  return (
    <MainLayout>
      <div className="mx-auto w-full text-center pt-8">
        <div className="mb-8">
          You need to login as{' '}
          <a href="https://github.com/smallkirby" target="_blank">
            smallkirby
          </a>{' '}
          to edit entries.
        </div>
        <LoginBox />
      </div>
    </MainLayout>
  );
}
