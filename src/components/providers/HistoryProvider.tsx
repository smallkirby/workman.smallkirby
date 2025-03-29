import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import {
  getHistories,
  getPlatforms,
  PrettyFirebaseError,
} from '@/lib/firebase/store';
import type { TypingData, TypingTheme } from '@/types/TypingData';
import { AlertContext } from './AlertProvider';

type Props = {
  children: React.ReactNode;
};

export type HistoryContext = {
  histories: TypingData[] | null;
  platforms: TypingTheme[] | null;
  sync: () => void;
};

export const HistoryContext = createContext<HistoryContext>({
  histories: null,
  platforms: null,
  sync: () => {},
});

export default function HistoryProvider({ children }: Props) {
  const [histories, setHistories] = useState<TypingData[] | null>(null);
  const [platforms, setPlatforms] = useState<TypingTheme[] | null>(null);
  const { setAlert } = useContext(AlertContext);

  const syncData = useCallback(async () => {
    setHistories(null);
    setPlatforms(null);

    getHistories().then((hists) => {
      if (hists instanceof PrettyFirebaseError) {
        setAlert('Error while fetching histories', hists.message, 'error');
      } else {
        setHistories(hists);
      }
    });
    getPlatforms().then((pfs) => {
      if (pfs instanceof PrettyFirebaseError) {
        setAlert('Error while fetching platforms', pfs.message, 'error');
      } else {
        setPlatforms(pfs);
      }
    });
  }, [setAlert]);

  useEffect(() => {
    syncData();
  }, [syncData]);

  return (
    <HistoryContext.Provider value={{ histories, platforms, sync: syncData }}>
      {children}
    </HistoryContext.Provider>
  );
}
