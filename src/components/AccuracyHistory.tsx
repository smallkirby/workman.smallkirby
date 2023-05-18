import { Card } from 'antd';
import { BugOutlined } from '@ant-design/icons';
import AccuracyHistoryChart from './AccuracyHistoryChart';
import { TypingData } from '@/types/TypingData';

type Props = {
  histories: TypingData[] | null;
};

export default function AccuracyHistory({ histories }: Props) {
  return (
    <Card
      title={
        <div className="flex items-center">
          <div>
            <BugOutlined style={{ fontSize: '150%', marginRight: '8px' }} />
          </div>
          <div>Accuracy History</div>
        </div>
      }
    >
      <div className="w-full h-80">
        <AccuracyHistoryChart histories={histories} />
      </div>
    </Card>
  );
}
