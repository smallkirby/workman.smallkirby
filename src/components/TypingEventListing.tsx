import { typingEvents } from '@/data/event';
import { Card } from 'antd';
import { MessageOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';

export default function TypingEventListing() {
  return (
    <Card
      title={
        <div className="flex items-center">
          <div>
            <MessageOutlined style={{ fontSize: '150%', marginRight: '8px' }} />
          </div>
          <div>Events</div>
        </div>
      }
      bodyStyle={{ padding: '0px' }}
    >
      <div className="md:my-8 md:mx-4">
        <ul className="list-disc">
          {typingEvents
            .toSorted((a, b) => {
              return a.date > b.date ? -1 : 1;
            })
            .map((event, index) => {
              return (
                <li key={index} className="mb-4">
                  <span className="font-bold mr-2">
                    {dayjs(event.date).format('YYYY.MM.DD')}:
                  </span>
                  <span>{event.description}</span>
                </li>
              );
            })}
        </ul>
      </div>
    </Card>
  );
}
