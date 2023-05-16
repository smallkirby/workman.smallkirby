import AccuracyHistory from '@/components/AccuracyHistory';
import LayoutDescription from '@/components/LayoutDescription';
import WPMHistory from '@/components/WPMHistory';
import MainLayout from '@/layouts/MainLayout';
import { Space } from 'antd';

export default function Home() {
  return (
    <MainLayout>
      <div
        className="text-center mt-2 mb-8 flex
        flex-col md:flex-row justify-center"
      >
        <span>smallkirby can change its keyboard layout</span>
        <span className="ml-1">cuz they does not work</span>
      </div>
      <div className="mx-auto w-full">
        <Space
          direction="vertical"
          size="large"
          className="mx-auto md:w-4/5 flex"
        >
          <LayoutDescription />
          <WPMHistory />
          <AccuracyHistory />
        </Space>
      </div>
    </MainLayout>
  );
}
