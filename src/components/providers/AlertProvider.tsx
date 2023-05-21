import { Alert } from 'antd';
import { createContext, useState } from 'react';

type Props = {
  children: React.ReactNode;
};

type Alert = {
  title: string;
  message: string;
  type: 'error' | 'success';
};

export type AlertContext = {
  alert: Alert | null;
  setAlert: (title: string, message: string, type: 'error' | 'success') => void;
};

export const AlertContext = createContext<AlertContext>({
  alert: null,
  setAlert: () => {},
});

const AlertProvider = ({ children }: Props) => {
  const [alert, _setAlert] = useState<Alert | null>(null);

  return (
    <AlertContext.Provider
      value={{
        alert,
        setAlert: (title, message, type) => _setAlert({ title, message, type }),
      }}
    >
      <div className="relative">
        {alert && (
          <Alert
            message={alert?.title}
            description={alert?.message}
            type={alert?.type}
            showIcon={true}
            closable={true}
            onClose={() => _setAlert(null)}
            className="fixed top-0 left-0 z-50 w-full mt-2"
          />
        )}
        {children}
      </div>
    </AlertContext.Provider>
  );
};

export default AlertProvider;
