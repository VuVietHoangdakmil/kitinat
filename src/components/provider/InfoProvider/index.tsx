import React, { createContext, useState, useEffect, useContext } from "react";
import { getInfo } from "../../../service/getInfo";
import { Info } from "../../../types/data/info";
interface InfoContextType {
  info: Info | null; // Thay 'any' bằng kiểu dữ liệu chính xác của thông tin
  loading: boolean;
  error: Error | null;
  setInfo: React.Dispatch<React.SetStateAction<Info | null>>;
}

const InfoContext = createContext<InfoContextType | undefined>(undefined);

export const InfoProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [info, setInfo] = useState<Info | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const data = await getInfo();
        setInfo(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error("An error occurred"));
      } finally {
        setLoading(false);
      }
    };

    fetchInfo();
  }, []);

  return (
    <InfoContext.Provider value={{ info, loading, error, setInfo }}>
      {children}
    </InfoContext.Provider>
  );
};

export const useInfo = () => {
  const context = useContext(InfoContext);
  if (context === undefined) {
    throw new Error("useInfo must be used within an InfoProvider");
  }
  return context;
};
