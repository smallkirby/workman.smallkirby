import type { TypingData, TypingTheme } from '@/types/TypingData';
import {
  DeleteOutlined,
  EditOutlined,
  PlusCircleOutlined,
  WarningFilled,
} from '@ant-design/icons';
import { Button, Popconfirm, Space, Table, Tooltip, notification } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';
import HistoryCreateModal from './HistoryCreateModal';
import { useCallback, useContext, useState } from 'react';
import { createHistory, deleteHistory } from '@/lib/firebase/store';
import { AlertContext } from '../providers/AlertProvider';
import { HistoryContext } from '../providers/HistoryProvider';

type Props = {
  histories: TypingData[] | null;
  platforms: TypingTheme[] | null;
};

export default function HistoriesPanel({ histories, platforms }: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { setAlert } = useContext(AlertContext);
  const [api, contextHolder] = notification.useNotification();
  const { sync } = useContext(HistoryContext);

  const onCreateSubmit = useCallback(
    async (values: TypingData): Promise<void> => {
      const result = await createHistory(values);
      if (result) {
        setAlert('Error while creating history', result.message, 'error');
      } else {
        api.success({
          message: 'History created.',
          duration: 3,
        });
        sync();
      }
      return Promise.resolve();
    },
    [api, setAlert, sync]
  );

  const onRemove = useCallback(
    async (history: TypingData): Promise<void> => {
      const result = await deleteHistory(history);
      if (result) {
        setAlert('Error while deleting history', result.message, 'error');
      } else {
        api.success({
          message: 'History deleted.',
          duration: 3,
        });
        sync();
      }
    },
    [api, setAlert, sync]
  );

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
      render: (_, record: TypingData) => {
        return (
          <Space wrap>
            <Tooltip placement="top" title="Edit entry.">
              <Button icon={<EditOutlined />} />
            </Tooltip>
            <Tooltip placement="top" title="Remove entry.">
              <Popconfirm
                title="Are you sure to delete this history?"
                onConfirm={() => onRemove(record)}
                okText="Delete"
                okType="danger"
                cancelText="Cancel"
                placement="bottom"
                icon={<WarningFilled style={{ color: 'red' }} />}
              >
                <Button icon={<DeleteOutlined />} danger />
              </Popconfirm>
            </Tooltip>
          </Space>
        );
      },
    },
  ];

  return (
    <>
      {contextHolder}
      <div className="mx-2 text-center">
        <h2 className="text-3xl mb-4">Histories</h2>
        <div className="mb-4">
          <p>List of histories of typings with workman.</p>
        </div>
      </div>

      <div className="w-full">
        <Space wrap className="w-full flex justify-center md:block">
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
          platforms={platforms ?? []}
          onOk={(value) => onCreateSubmit(value)}
          onCancel={() => setIsModalOpen(false)}
        />
        <Table
          columns={columns}
          dataSource={histories ?? []}
          loading={histories == null}
          size="large"
          className="w-full"
          scroll={{
            x: '100%',
          }}
        />
      </div>
    </>
  );
}
