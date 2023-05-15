import AccuracyHistory from '@/components/AccuracyHistory';
import LayoutDescription from '@/components/LayoutDescription';
import WPMHistory from '@/components/WPMHistory';
import MainLayout from '@/layouts/MainLayout';
import { Space } from 'antd';

export default function Home() {
  return (
    <MainLayout>
      <div className="text-center mt-2 mb-8">
        smallkirby can change its keyboard layout cuz they does not work
      </div>
      <Space direction="vertical" size="large">
        <LayoutDescription />
        <WPMHistory />
        <AccuracyHistory />
      </Space>
    </MainLayout>
  );
}
