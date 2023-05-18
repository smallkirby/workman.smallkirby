import type { TypingData, TypingTheme } from '@/types/TypingData';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';

type Props = {
  histories: TypingData[] | null;
  platforms: TypingTheme[] | null;
};

export default function HistoriesPanel({ histories, platforms }: Props) {
  const columns: ColumnsType<TypingData> = [
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      render: (date: string) => {
        return <div>{dayjs(date).format('YYYY/MM/DD HH:mm')}</div>;
      },
    },
    {
      title: 'Platform',
      dataIndex: 'themeId',
      key: 'platform',
      render: (platform: string) => {
        const theme = platforms?.find((elem) => elem.id === platform);
        return <div>{theme?.name ?? '(unknown)'}</div>;
      },
    },
    {
      title: 'WPM',
      dataIndex: 'wpm',
      key: 'wpm',
      render: (wpm: number) => {
        return <div>{wpm.toFixed(2)}</div>;
      },
      align: 'right',
    },
    {
      title: 'Accuracy',
      dataIndex: 'accuracy',
      key: 'accuracy',
      render: (accuracy: number) => {
        return <div>{accuracy.toFixed(2)}</div>;
      },
      align: 'right',
    },
  ];

  return (
    <>
      <div className="mx-2 text-center">
        <h2 className="text-3xl mb-4">Histories</h2>
        <div className="mb-4">
          <p>List of histories of typings with workman.</p>
        </div>
      </div>

      <div>
        <Table
          columns={columns}
          dataSource={histories ?? []}
          loading={histories == null}
        />
      </div>
    </>
  );
}
