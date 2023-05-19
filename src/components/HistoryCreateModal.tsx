import { Modal } from 'antd';

type Props = {
  isOpen: boolean;
  onOk: () => void;
  onCancel: () => void;
};

export default function HistoryCreateModal({ isOpen, onCancel, onOk }: Props) {
  return (
    <Modal
      open={isOpen}
      onOk={onOk}
      onCancel={onCancel}
      title="Create History"
      okText="Create"
      confirmLoading={false}
      keyboard={true}
      okType="primary"
    >
      <div>hoge</div>
    </Modal>
  );
}
