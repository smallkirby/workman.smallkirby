import { ResponsiveLine } from '@nivo/line';
import typingBaselines from '@/data/baseline';
import typingHistory from '@/data/history';
import { TypingData } from '@/types/TypingData';

const baseline = typingBaselines.sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
)[0];

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
      yScale={{ type: 'linear', min: 0, max: baseline.wpm + 50 }}
      yFormat={(value) => `${value}%`}
      markers={[
        {
          axis: 'y',
          lineStyle: { stroke: '#458558', strokeWidth: 2 },
          legend: 'QWERTY Baseline',
          legendPosition: 'top-left',
          value: typingBaselines.sort(
              (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
          )[0].wpm,
        },
      ]}
      pointSize={10}
      enablePointLabel={false}
      enableGridX={true}
      enableGridY={true}
      useMesh={true}
      isInteractive={true}
      margin={{ top: 20, right: 10, bottom: 50, left: 50 }}
      tooltip={({ point }) => {
        return (
          <div
            className="rounded-md bg-white p-2
            border-[1px] border-gray-200 shadow-md"
          >
            <div>{point.data.xFormatted}</div>
            <div className="text-center">
              <span className="font-bold">{point.data.y.toString()}</span> WPM
            </div>
          </div>
        );
      }}
    />
  );
}
