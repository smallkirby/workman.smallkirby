import { MessageOutlined } from '@ant-design/icons';
import { Card } from 'antd';
import dayjs from 'dayjs';
import { typingEvents } from '@/data/event';

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
      <div className="my-8 mx-10 md:mx-14">
        <ul className="list-disc">
          {typingEvents
            .sort((a, b) => {
              return a.date > b.date ? -1 : 1;
            })
            .map((event) => {
              return (
                <li key={event.date.getMilliseconds()} className="mb-4">
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
