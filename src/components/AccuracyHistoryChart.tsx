import { ResponsiveLine } from '@nivo/line';
import typingHistory from '@/data/history';
import { TypingData } from '@/types/TypingData';

const history2accuracy = (history: TypingData[]) => {
  return {
    id: 'Accuracy',
    data: history.map((data) => {
      return {
        x: data.date,
        y: data.accuracy,
      };
    }),
  };
};

export default function AccuracyHistoryChart() {
  return (
    <ResponsiveLine
      animate={true}
      curve="monotoneX"
      data={[history2accuracy(typingHistory)]}
      xScale={{
        type: 'time',
        format: '%Y-%m-%dT%H:%M:%S.%L%Z',
        precision: 'minute',
        useUTC: false,
      }}
      xFormat={'time:%Y-%m-%d %H:%M:%S'}
      axisBottom={{
        format: '%m/%d %H:%M',
      }}
      yScale={{ type: 'linear', min: 0, max: 100 }}
      yFormat={(value) => `${value}%`}
      enableArea={true}
      pointSize={10}
      enablePointLabel={false}
      enableGridX={true}
      enableGridY={true}
      useMesh={true}
      isInteractive={true}
      margin={{ top: 10, right: 10, bottom: 50, left: 50 }}
    />
  );
}
