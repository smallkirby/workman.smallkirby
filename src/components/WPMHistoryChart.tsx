import { ResponsiveLine } from '@nivo/line';
import typingHistory from '@/data/history';
import { TypingData } from '@/types/TypingData';

const history2wpm = (history: TypingData[]) => {
  return {
    id: 'Accuracy',
    data: history.map((data) => {
      return {
        x: data.date,
        y: data.wpm,
      };
    }),
  };
};

export default function WPMHistoryChart() {
  return (
    <ResponsiveLine
      animate={true}
      curve="monotoneX"
      data={[history2wpm(typingHistory)]}
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
      yScale={{ type: 'linear', min: 0 }}
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
