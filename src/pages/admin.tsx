import HistoriesPlatform from '@/components/HistoriesPlatform';
import PlatformsPanel from '@/components/PlatformsPanel';
import typingHistory, { typingThemes } from '@/data/history';
import MainLayout from '@/layouts/MainLayout';
import { Tabs } from 'antd';

export default function Admin() {
  return (
    <MainLayout>
      <Tabs
        defaultActiveKey="histories"
        type="card"
        size="middle"
        centered={true}
        animated={true}
        items={[
          {
            label: 'Histories',
            key: 'histories',
            children: (
              <HistoriesPlatform
                histories={typingHistory.sort((a, b) => {
                  return a.date > b.date ? -1 : 1;
                })}
                platforms={typingThemes}
              />
            ),
          },
          {
            label: 'Platforms',
            key: 'platforms',
            children: <PlatformsPanel themes={typingThemes} />,
          },
        ]}
        style={{
          marginTop: '2rem',
        }}
      />
    </MainLayout>
  );
}
