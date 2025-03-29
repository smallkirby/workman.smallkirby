import { CartesianMarkerProps } from '@nivo/core';
import { ResponsiveLine } from '@nivo/line';
import { Spin } from 'antd';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import typingBaselines from '@/data/baseline';
import { typingEvents } from '@/data/event';
import { TypingData } from '@/types/TypingData';

const baseline = typingBaselines.sort(
  (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
)[0];

type WPMData = {
  id: 'wpm';
  data: {
    x: Date;
    y: number;
  }[];
};

const history2wpm = (history: TypingData[]): WPMData => {
  return {
    id: 'wpm',
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
  const [dataHistories, setDataHistories] = useState<WPMData | null>(null);

  useEffect(() => {
    if (histories !== null) {
      const sortedHistories = histories?.sort((a, b) => {
        return a.date > b.date ? -1 : 1;
      });
      setDataHistories(history2wpm(sortedHistories));
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
            format: '%Y.%m.%dT%H:%M:%S.%L%Z',
            precision: 'minute',
            useUTC: false,
          }}
          xFormat={'time:%Y.%m.%d %H:%M:%S'}
          axisBottom={{
            format: '%Y.%m.%d',
            tickRotation: -45,
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
                  new Date(a.date).getTime() - new Date(b.date).getTime(),
              )[0].wpm,
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
          pointSize={5}
          enablePointLabel={false}
          enableGridX={true}
          enableGridY={true}
          useMesh={true}
          isInteractive={true}
          margin={{ top: 20, right: 10, bottom: 70, left: 50 }}
          tooltip={({ point }) => {
            return (
              <div
                className="rounded-md bg-white p-2
            border-[1px] border-gray-200 shadow-md"
              >
                <div>{point.data.xFormatted}</div>
                <div className="text-center">
                  {/** eslint-disable-next-line max-len **/}
                  <span className="font-bold">{point.data.y.toString()}</span>{' '}
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
