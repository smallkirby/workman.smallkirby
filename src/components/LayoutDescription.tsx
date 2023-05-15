import { ExperimentOutlined } from '@ant-design/icons';
import { Card, Image } from 'antd';

export default function LayoutDescription() {
  return (
    <Card
      title={
        <div className="flex items-center">
          <div>
            <ExperimentOutlined
              style={{ fontSize: '150%', marginRight: '8px' }}
            />
          </div>
          <div>Workman Layout</div>
        </div>
      }
    >
      <div className="flex md:flex-row flex-col justify-center items-center">
        <Image
          src="/images/workman-layout.png"
          alt="workman layout"
          width="80%"
          className="rounded-lg shadow-lg mb-4 w-full"
        />
        <div className="ml-10">
          <ul className="list-disc">
            <li>
              <a href="https://workmanlayout.org/" target="_blank">
                workman
              </a>{' '}
              is a relatevily modern keyboard layout.
            </li>
            <li>
              smallkirby uses with{' '}
              <a
                href="https://shop.yushakobo.jp/en/products/corne-cherry-v3"
                target="_blank"
              >
                Corne Cherry V3 split keyboard
              </a>
              .
            </li>
            <li>
              For the latest version of their layout, refer to{' '}
              <a
                href="https://github.com/smallkirby/dotfiles/blob/master/keyboard-layout/corne/workman"
                target="_blank"
              >
                smallkirby/dotfiles
              </a>
            </li>
          </ul>
        </div>
      </div>
    </Card>
  );
}
