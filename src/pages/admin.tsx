import PlatformsPanel from '@/components/PlatformsPanel';
import { typingThemes } from '@/data/history';
import MainLayout from '@/layouts/MainLayout';
import { Tabs } from 'antd';

export default function Admin() {
  return (
    <MainLayout>
      <Tabs
        defaultActiveKey="1"
        type="card"
        size="middle"
        centered={true}
        animated={true}
        items={[
          {
            label: 'Platforms',
            key: '1',
            children: <PlatformsPanel themes={typingThemes} />,
          },
        ]}
      />
    </MainLayout>
  );
}
