import { Card } from 'antd';
import { FastForwardOutlined } from '@ant-design/icons';
import WPMHistoryChart from './WPMHistoryChart';
import { TypingData } from '@/types/TypingData';

type Props = {
  histories: TypingData[] | null;
};

export default function WPMHistory({ histories }: Props) {
  return (
    <Card
      title={
        <div className="flex items-center">
          <div>
            <FastForwardOutlined
              style={{ fontSize: '150%', marginRight: '8px' }}
            />
          </div>
          <div>WPM History</div>
        </div>
      }
    >
      <div className="w-full h-80">
        <WPMHistoryChart histories={histories} />
      </div>
    </Card>
  );
}
