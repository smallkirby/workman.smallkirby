import HistoriesPlatform from '@/components/HistoriesPlatform';
import PlatformsPanel from '@/components/PlatformsPanel';
import typingHistory from '@/data/history';
import MainLayout from '@/layouts/MainLayout';
import { getPlatforms } from '@/lib/firebase/store';
import { TypingTheme } from '@/types/TypingData';
import { Tabs } from 'antd';
import { useEffect, useState } from 'react';

export default function Admin() {
  const [platforms, setPlatforms] = useState<TypingTheme[]>([]);

  useEffect(() => {
    getPlatforms().then((pfs) => {
      setPlatforms(pfs);
    });
  }, []);

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
                platforms={platforms}
              />
            ),
          },
          {
            label: 'Platforms',
            key: 'platforms',
            children: <PlatformsPanel themes={platforms} />,
          },
        ]}
        style={{
          marginTop: '2rem',
        }}
      />
    </MainLayout>
  );
}
