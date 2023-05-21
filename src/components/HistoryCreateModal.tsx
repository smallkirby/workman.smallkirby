import { TypingData, TypingTheme } from '@/types/TypingData';
import {
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Modal,
  Select,
  Space,
} from 'antd';
import dayjs from 'dayjs';

type Props = {
  isOpen: boolean;
  platforms: TypingTheme[];
  onOk: (values: TypingData) => Promise<void>;
  onCancel: () => void;
};

type TypingDataForm = Omit<TypingData, 'date' | 'badKeys'> & {
  date: dayjs.Dayjs;
  badKeys: string | undefined;
};

export default function HistoryCreateModal({
  isOpen,
  platforms,
  onCancel,
  onOk,
}: Props) {
  const onCreate = (values: TypingDataForm) => {
    onOk({
      ...values,
      date: values.date.toDate(),
      badKeys: values.badKeys ?? '',
    })
      .then(() => {
        onCancel();
      })
      .catch((e) => {
        console.error(e);
      });
  };

  const validateBadKeys = (value: string) => {
    if (!/^[\x00-\x7F]*$/.test(value)) {
      return Promise.reject(new Error('Bad keys must be ASCII.'));
    }
    if (/^[A-Z]*$/.test(value)) {
      return Promise.reject(new Error('Bad keys must be lowercase.'));
    }
    if (new Set(value).size !== value.length) {
      return Promise.reject(new Error('Bad keys must be unique.'));
    }

    return Promise.resolve();
  };

  const validateAccuracy = (value: number) => {
    return value >= 0 && value <= 100;
  };

  return (
    <Modal
      open={isOpen}
      onCancel={onCancel}
      title="Create History"
      okText="Create"
      confirmLoading={false}
      keyboard={true}
      okType="primary"
      destroyOnClose={true}
      footer={null}
    >
      <Form
        labelCol={{ span: 6 }}
        labelAlign="left"
        preserve={false}
        onFinish={onCreate}
      >
        <Form.Item name="themeId" label="Platform" rules={[{ required: true }]}>
          <Select placeholder="Platform" allowClear>
            {platforms.map((platform) => {
              return (
                <Select.Option key={platform.id} value={platform.id}>
                  {platform.name}
                </Select.Option>
              );
            })}
          </Select>
        </Form.Item>

        <Form.Item name="wpm" label="WPM/KPM" rules={[{ required: true }]}>
          <InputNumber />
        </Form.Item>

        <Form.Item
          name="accuracy"
          label="Accuracy (%)"
          rules={[
            { required: true },
            () => ({
              validator(_, value: number | undefined) {
                if (!value) {
                  return Promise.resolve();
                }
                if (!validateAccuracy(value)) {
                  return Promise.reject(
                    new Error('Accuracy must be between 0 and 100.')
                  );
                }
                return Promise.resolve();
              },
            }),
          ]}
        >
          <InputNumber />
        </Form.Item>

        <Form.Item
          name="badKeys"
          label="Bad Keys"
          rules={[
            () => ({
              validator(_, value: string | undefined) {
                if (!value) {
                  return Promise.resolve();
                }
                return validateBadKeys(value);
              },
            }),
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="date"
          label="Date"
          initialValue={dayjs()}
          rules={[{ required: true }]}
        >
          <DatePicker showTime />
        </Form.Item>

        <Form.Item style={{ textAlign: 'right' }}>
          <Space>
            <Button type="default" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="primary" htmlType="submit">
              Create
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Modal>
  );
}
