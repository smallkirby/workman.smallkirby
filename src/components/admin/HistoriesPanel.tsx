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
import HistoryModal from './HistoryModal';
import { useCallback, useContext, useState } from 'react';
import {
  createHistory,
  deleteHistory,
  updateHistory,
} from '@/lib/firebase/store';
import { AlertContext } from '@/components/providers/AlertProvider';
import { HistoryContext } from '@/components/providers/HistoryProvider';

type Props = {
  histories: TypingData[] | null;
  platforms: TypingTheme[] | null;
};

export default function HistoriesPanel({ histories, platforms }: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { setAlert } = useContext(AlertContext);
  const [api, contextHolder] = notification.useNotification();
  const { sync } = useContext(HistoryContext);
  const [editingForm, setEditingForm] = useState<TypingData | null>(null);

  const onCancel = useCallback(() => {
    setEditingForm(null);
    setIsModalOpen(false);
  }, []);

  const onSubmit = useCallback(
    async (type: 'create' | 'edit', values: TypingData): Promise<void> => {
      const result =
        type === 'create'
          ? await createHistory(values)
          : await updateHistory(values);
      if (result) {
        setAlert('Error while editing history', result.message, 'error');
      } else {
        api.success({
          message: type === 'create' ? 'History created.' : 'History updated.',
          duration: 3,
        });

        onCancel();
        sync();
      }
      return Promise.resolve();
    },
    [api, setAlert, sync, onCancel]
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
      title: 'WPM or KPM',
      dataIndex: 'wpm',
      key: 'wpm',
      render: (wpm: number) => {
        return <div>{wpm.toFixed(2)}</div>;
      },
    },
    {
      title: 'Accuracy',
      dataIndex: 'accuracy',
      key: 'accuracy',
      render: (accuracy: number) => {
        return <div>{accuracy.toFixed(2)}</div>;
      },
    },
    {
      title: '',
      key: 'action',
      render: (_, record: TypingData) => {
        return (
          <Space wrap>
            <Tooltip placement="top" title="Edit entry.">
              <Button
                icon={<EditOutlined />}
                onClick={() => {
                  setEditingForm(record);
                  setIsModalOpen(true);
                }}
              />
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
        <HistoryModal
          isOpen={isModalOpen}
          type={editingForm ? 'edit' : 'create'}
          initialValues={editingForm}
          platforms={platforms ?? []}
          onOk={(type, value) => onSubmit(type, value)}
          onCancel={onCancel}
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
          rowKey={(record) => record.id ?? ''}
        />
      </div>
    </>
  );
}
