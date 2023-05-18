import { ResponsiveLine } from '@nivo/line';
import typingBaselines from '@/data/baseline';
import { TypingData } from '@/types/TypingData';
import { Spin } from 'antd';

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

type Props = {
  histories: TypingData[] | null;
};

export default function WPMHistoryChart({ histories }: Props) {
  return (
    <>
      {histories === null ? (
        <Spin
          tip="Loading..."
          size="large"
          className="text-center mx-auto mt-16 w-full h-full"
        />
      ) : (
        <ResponsiveLine
          animate={true}
          curve="monotoneX"
          data={[history2wpm(histories)]}
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
                (a, b) =>
                  new Date(a.date).getTime() - new Date(b.date).getTime()
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
                  {/** eslint-disable-next-line max-len **/}
                  <span className="font-bold">
                    {point.data.y.toString()}
                  </span>{' '}
                  WPM
                </div>
              </div>
            );
          }}
        />
      )}
    </>
  );
}
