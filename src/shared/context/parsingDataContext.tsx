'use client';

import React, {
  createContext,
  FC,
  ReactNode,
  useContext,
  useState,
} from 'react';

type ParsingData = {
  resultedValue: string;
  tree: {
    nodes: any;
    edges: any;
  };
};

type ParsingDataContextType = {
  data: ParsingData | null;
  setData: (user: ParsingData) => void;
};

const ParsingDataContext = createContext<
  ParsingDataContextType | undefined
>(undefined);

export const useParsingDataContext = () => {
  const context = useContext(ParsingDataContext);
  if (!context) {
    throw new Error('useUserContext must be used within a Provider');
  }
  return context;
};

type TParsingDataProvider = {
  children?: ReactNode;
};

export const ParsingDataProvider: FC<TParsingDataProvider> = ({ children }) => {
  const [data, setData] = useState<ParsingData>({
    resultedValue: '',
    tree: {
      edges: [],
      nodes: [],
    },
  });
  return (
    <ParsingDataContext.Provider
      value={{
        data,
        setData,
      }}
    >
      {children}
    </ParsingDataContext.Provider>
  );
};

export default ParsingDataContext;
