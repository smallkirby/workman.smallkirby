import {
  KeyOutlined,
  LoginOutlined,
  LogoutOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Avatar, Dropdown, Image, MenuProps, Space, Spin } from 'antd';
import { useRouter } from 'next/router';
import { FirebaseAuthContext, logout } from '@/lib/firebase/auth';

export default function UserBadge() {
  const router = useRouter();

  const items: MenuProps['items'] = [
    {
      key: 'admin',
      label: 'Admin Page',
      icon: <KeyOutlined />,
      onClick: () => router.push('/admin'),
    },
  ];

  const menuLogin = {
    key: 'login',
    label: 'Login',
    icon: <LoginOutlined />,
    style: { marginTop: '8px' },
    onClick: () => router.push('/login'),
  };

  const menuLogout = {
    key: 'logout',
    label: <span className="text-gray-500">Logout</span>,
    icon: <LogoutOutlined />,
    style: { marginTop: '8px' },
    onClick: async () => {
      await logout();
      router.reload();
    },
  };
  return (
    <FirebaseAuthContext.Consumer>
      {({ user }) => (
        <Dropdown menu={{ items: [...items, user ? menuLogout : menuLogin] }}>
          <Space wrap size={16}>
            {user === undefined ? (
              <Spin size="large" />
            ) : (
              <Avatar
                size={40}
                icon={
                  user?.photoUrl ? (
                    <Image
                      src={user.photoUrl}
                      alt={user.displayName || ''}
                      preview={false}
                    />
                  ) : (
                    <UserOutlined />
                  )
                }
              />
            )}
          </Space>
        </Dropdown>
      )}
    </FirebaseAuthContext.Consumer>
  );
}
