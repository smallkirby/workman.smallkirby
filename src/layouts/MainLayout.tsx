import { GithubFilled } from '@ant-design/icons';
import { Button, Space, Tooltip } from 'antd';
import Title from '@/components/header/Title';
import UserBadge from '@/components/header/UserBadge';

type Props = { children: React.ReactNode };

export default function MainLayout({ children }: Props) {
  return (
    <div className="mx-auto flex flex-col min-h-screen p-0">
      <header className="text-center relative">
        <div className="m-3 md:w-2/3 mx-auto static">
          <Title />
        </div>
        <div className="md:absolute md:top-0 md:right-0 md:m-8 m-1">
          <UserBadge />
        </div>
      </header>

      <div className="md:w-2/3 md:mx-auto mx-2">{children}</div>

      <footer className="mt-auto px-8 md:px-16 pt-2">
        <div
          className="text-center w-full mt-8 md:mt-16 text-gray-600
            border-solid border-0 border-t-2 border-gray-100 py-4 flex
            justify-center"
        >
          <Space wrap className="mr-4">
            smallkirby few rights reserved, 2023
          </Space>
          <Space wrap>
            <Tooltip placement="top" title="View Source at GitHub">
              <Button
                href="https://github.com/smallkirby/workman.smallkirby.xyz"
                target="_blank"
                icon={
                  <GithubFilled
                    style={{
                      fontSize: '1.5rem',
                    }}
                  />
                }
                type="text"
                style={{
                  padding: '0px',
                  margin: '0px',
                }}
              />
            </Tooltip>
          </Space>
        </div>
      </footer>
    </div>
  );
}
