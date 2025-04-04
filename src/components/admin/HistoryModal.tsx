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
import { TypingData, TypingTheme } from '@/types/TypingData';

type Props = {
  isOpen: boolean;
  type: 'create' | 'edit';
  initialValues: TypingData | null;
  platforms: TypingTheme[];
  onOk: (type: 'create' | 'edit', values: TypingData) => Promise<void>;
  onCancel: () => void;
};

type TypingDataForm = Omit<TypingData, 'date' | 'badKeys'> & {
  date: dayjs.Dayjs;
  badKeys: string | undefined;
};

export default function HistoryModal({
  isOpen,
  type,
  initialValues,
  platforms,
  onCancel,
  onOk,
}: Props) {
  const onSubmit = (values: TypingDataForm) => {
    const valuesToSubmit = {
      ...values,
      id: type === 'create' ? undefined : initialValues?.id,
    };
    onOk(type, {
      ...valuesToSubmit,
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
    // biome-ignore lint/suspicious/noControlCharactersInRegex: expected
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
      title={type === 'create' ? 'Create History' : 'Edit History'}
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
        onFinish={onSubmit}
      >
        <Form.Item
          name="themeId"
          label="Platform"
          rules={[{ required: true }]}
          initialValue={initialValues?.themeId}
        >
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

        <Form.Item
          name="wpm"
          label="WPM/KPM"
          rules={[{ required: true }]}
          initialValue={initialValues?.wpm}
        >
          <InputNumber type="number" />
        </Form.Item>

        <Form.Item
          name="accuracy"
          label="Accuracy (%)"
          initialValue={initialValues?.accuracy}
          rules={[
            { required: true },
            () => ({
              validator(_, value: number | undefined) {
                if (!value) {
                  return Promise.resolve();
                }
                if (!validateAccuracy(value)) {
                  return Promise.reject(
                    new Error('Accuracy must be between 0 and 100.'),
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
          initialValue={initialValues?.badKeys}
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
          initialValue={initialValues ? dayjs(initialValues.date) : dayjs()}
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
              {type === 'create' ? 'Create' : 'Update'}
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Modal>
  );
}
