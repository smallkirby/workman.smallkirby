import { ResponsiveLine } from '@nivo/line';
import typingBaselines from '@/data/baseline';
import typingHistory from '@/data/history';
import { TypingData } from '@/types/TypingData';

const history2accuracy = (history: TypingData[]) => {
  return {
    id: 'history',
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
      yScale={{ type: 'linear', min: 60, max: 100 }}
      yFormat={(value) => `${value}%`}
      markers={[
        {
          axis: 'y',
          lineStyle: { stroke: '#689D6A', strokeWidth: 2 },
          legend: 'QWERTY Baseline',
          legendPosition: 'top-left',
          value: typingBaselines.sort(
              (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
          )[0].accuracy,
        },
      ]}
      pointSize={10}
      enablePointLabel={false}
      enableGridX={true}
      enableGridY={true}
      useMesh={true}
      isInteractive={true}
      margin={{ top: 20, right: 10, bottom: 30, left: 50 }}
    />
  );
}
