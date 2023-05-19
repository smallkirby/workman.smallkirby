import { ExperimentOutlined } from '@ant-design/icons';
import { Card, Image } from 'antd';
import { useEffect, useState } from 'react';

export default function LayoutDescription() {
  const [imageSize, setImageSize] = useState('50%');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setImageSize(window.innerWidth < 768 ? '70%' : '40%');
    }
  }, []);

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
      bodyStyle={{ padding: '0px' }}
    >
      <div
        className="flex md:flex-row flex-col
        justify-center items-center mt-6 md:m-4"
      >
        <Image
          src="/images/workman-layout.png"
          alt="workman layout"
          className="rounded-lg shadow-lg mb-4 w-full"
          width={imageSize}
        />
        <div className="mr-4 md:ml-10">
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
