import { ResponsiveLine } from '@nivo/line';
import { CartesianMarkerProps } from '@nivo/core';
import typingBaselines from '@/data/baseline';
import { TypingData } from '@/types/TypingData';
import { Spin } from 'antd';
import { useEffect, useState } from 'react';
import { typingEvents } from '@/data/event';
import dayjs from 'dayjs';

type AccuracyData = {
  id: 'accuracy';
  data: {
    x: Date;
    y: number;
  }[];
};

const history2accuracy = (history: TypingData[]): AccuracyData => {
  return {
    id: 'accuracy',
    data: history.map((data) => {
      return {
        x: data.date,
        y: data.accuracy,
      };
    }),
  };
};

type Props = {
  histories: TypingData[] | null;
};

export default function AccuracyHistoryChart({ histories }: Props) {
  const [dataHistories, setDataHistories] = useState<AccuracyData | null>(null);

  useEffect(() => {
    if (histories !== null) {
      const sortedHistories = histories?.sort((a, b) => {
        return a.date > b.date ? -1 : 1;
      });
      setDataHistories(history2accuracy(sortedHistories));
    }
  }, [histories]);

  return (
    <>
      {dataHistories === null ? (
        <Spin
          size="large"
          className="text-center mx-auto mt-16 w-full h-full"
        />
      ) : (
        <ResponsiveLine
          animate={true}
          curve="monotoneX"
          data={[dataHistories]}
          xScale={{
            type: 'time',
            format: '%Y-%m-%dT%H:%M:%S.%L%Z',
            precision: 'minute',
            useUTC: false,
          }}
          xFormat={'time:%Y-%m-%d %H:%M:%S'}
          axisBottom={{
            format: '%m/%d %H:%M',
            tickRotation: -45,
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
                (a, b) =>
                  new Date(a.date).getTime() - new Date(b.date).getTime()
              )[0].accuracy,
            },
            ...typingEvents.map((event) => {
              return {
                axis: 'x',
                value: dayjs(event.date).toDate(),
                lineStyle: {
                  stroke: '#D3869B',
                  strokeWidth: 1.5,
                  opacity: 0.5,
                },
              } as CartesianMarkerProps;
            }),
          ]}
          pointSize={10}
          enablePointLabel={false}
          enableGridX={true}
          enableGridY={true}
          useMesh={true}
          isInteractive={true}
          margin={{ top: 20, right: 10, bottom: 70, left: 50 }}
          tooltip={({ point }) => {
            return (
              <div
                className="rounded-md bg-white p-2 border-[1px]
          border-gray-200 shadow-md"
              >
                <div>{point.data.xFormatted}</div>
                <div className="text-center">
                  <span className="font-bold">{point.data.yFormatted}</span>
                </div>
              </div>
            );
          }}
        />
      )}
    </>
  );
}
