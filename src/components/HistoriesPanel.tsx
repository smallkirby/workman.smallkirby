import type { TypingData, TypingTheme } from '@/types/TypingData';
import {
  DeleteOutlined,
  EditOutlined,
  PlusCircleOutlined,
} from '@ant-design/icons';
import { Button, Space, Table, Tooltip } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';
import HistoryCreateModal from './HistoryCreateModal';
import { useState } from 'react';

type Props = {
  histories: TypingData[] | null;
  platforms: TypingTheme[] | null;
};

export default function HistoriesPanel({ histories, platforms }: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);

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
    {
      title: '',
      key: 'action',
      render: () => {
        return (
          <Space wrap>
            <Tooltip placement="top" title="Edit entry.">
              <Button icon={<EditOutlined />}></Button>
            </Tooltip>
            <Tooltip placement="top" title="Remove entry.">
              <Button icon={<DeleteOutlined />} danger></Button>
            </Tooltip>
          </Space>
        );
      },
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
        <Space wrap size="large">
          <Button
            icon={<PlusCircleOutlined />}
            className="mb-3"
            onClick={() => setIsModalOpen(true)}
            type="primary"
          >
            Create
          </Button>
        </Space>
        <HistoryCreateModal
          isOpen={isModalOpen}
          onOk={() => setIsModalOpen(false)}
          onCancel={() => setIsModalOpen(false)}
        />
        <Table
          columns={columns}
          dataSource={histories ?? []}
          loading={histories == null}
        />
      </div>
    </>
  );
}
