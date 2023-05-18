import { AlertContext } from '@/components/AlertProvider';
import HistoriesPanel from '@/components/HistoriesPanel';
import PlatformsPanel from '@/components/PlatformsPanel';
import MainLayout from '@/layouts/MainLayout';
import {
  PrettyFirebaseError,
  getHistories,
  getPlatforms,
} from '@/lib/firebase/store';
import { TypingData, TypingTheme } from '@/types/TypingData';
import { Tabs } from 'antd';
import { useContext, useEffect, useState } from 'react';

export default function Admin() {
  const { setAlert } = useContext(AlertContext);
  const [histories, setHistories] = useState<TypingData[] | null>(null);
  const [platforms, setPlatforms] = useState<TypingTheme[] | null>(null);

  useEffect(() => {
    getPlatforms().then((pfs) => {
      if (pfs instanceof PrettyFirebaseError) {
        setAlert('Error while fetching platforms', pfs.message, 'error');
      } else {
        setPlatforms(pfs);
      }
    });
    getHistories().then((hists) => {
      if (hists instanceof PrettyFirebaseError) {
        setAlert('Error while fetching histories', hists.message, 'error');
      } else {
        setHistories(hists);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
              <HistoriesPanel
                histories={
                  histories?.sort((a, b) => {
                    return a.date > b.date ? -1 : 1;
                  }) ?? null
                }
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
