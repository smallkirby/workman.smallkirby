import { Tabs } from 'antd';
import HistoriesPanel from '@/components/admin/HistoriesPanel';
import PlatformsPanel from '@/components/admin/PlatformsPanel';
import { HistoryContext } from '@/components/providers/HistoryProvider';
import MainLayout from '@/layouts/MainLayout';

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
