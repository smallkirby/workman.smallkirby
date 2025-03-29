import { Spin } from 'antd';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import {
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import typingBaselines from '@/data/baseline';
import { TypingData } from '@/types/TypingData';

type AccuracyData = {
  id: 'accuracy';
  data: {
    x: number;
    y: number;
  }[];
};

const history2accuracy = (history: TypingData[]): AccuracyData => {
  return {
    id: 'accuracy',
    data: history
      .map((data) => {
        return {
          x: data.date.getTime(),
          y: data.accuracy,
        };
      })
      .sort((a, b) => {
        return a.x < b.x ? -1 : 1;
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
        <ResponsiveContainer width="100%" className="px-4">
          <LineChart
            data={dataHistories.data}
            margin={{ bottom: 25, right: 40, top: 10 }}
          >
            <Line type="monotone" dataKey="y" />
            <XAxis
              angle={-30}
              dy={20}
              dataKey="x"
              tickCount={10}
              type="number"
              domain={['dataMin', 'dataMax']}
              tickFormatter={(value: number) =>
                dayjs(new Date(value)).format('YYYY.MM.DD')
              }
            />
            <ReferenceLine
              y={typingBaselines[0].accuracy}
              stroke="green"
              label="QWERTY Baseline"
            />
            <YAxis dataKey="y" type="number" unit="%" domain={[75.0, 100.0]} />
            <Tooltip
              formatter={(value: number) => {
                return [value, 'Accuracy', 's'];
              }}
              labelFormatter={(value: number) => {
                return dayjs(new Date(value)).format('YYYY.MM.DD HH:mm:ss');
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </>
  );
}
