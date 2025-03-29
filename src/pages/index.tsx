import { Button, Space } from 'antd';
import { useRouter } from 'next/router';
import AccuracyHistory from '@/components/AccuracyHistory';
import LayoutDescription from '@/components/LayoutDescription';
import { HistoryContext } from '@/components/providers/HistoryProvider';
import TypingEventListing from '@/components/TypingEventListing';
import WPMHistory from '@/components/WPMHistory';
import MainLayout from '@/layouts/MainLayout';

export default function Home() {
  const router = useRouter();

  return (
    <MainLayout>
      <HistoryContext.Consumer>
        {({ histories }) => (
          <>
            <div
              className="text-center mt-2 mb-8 flex
        flex-col md:flex-row justify-center"
            >
              <span>smallkirby can change its keyboard layout</span>
              <span className="ml-1">cuz they does not work</span>
            </div>
            <div className="mx-auto w-full">
              <Space
                direction="horizontal"
                style={{
                  width: '100%',
                  justifyContent: 'center',
                }}
                className="mb-8"
              >
                <Button onClick={() => router.push('/admin')}>
                  Go to Admin Page
                </Button>
              </Space>
              <Space
                direction="vertical"
                size="large"
                className="mx-auto md:w-4/5 flex"
              >
                <LayoutDescription />
                <WPMHistory histories={histories} />
                <AccuracyHistory histories={histories} />
                <TypingEventListing />
              </Space>
            </div>
          </>
        )}
      </HistoryContext.Consumer>
    </MainLayout>
  );
}
