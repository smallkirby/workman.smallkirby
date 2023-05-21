import HistoriesPanel from '@/components/HistoriesPanel';
import { HistoryContext } from '@/components/HistoryProvider';
import PlatformsPanel from '@/components/PlatformsPanel';
import MainLayout from '@/layouts/MainLayout';
import { Tabs } from 'antd';

export default function Admin() {
  return (
    <MainLayout>
      <HistoryContext.Consumer>
        {({ histories, platforms }) => (
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
        )}
      </HistoryContext.Consumer>
    </MainLayout>
  );
}
