import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { getMeta } from "../utils/get-meta";

export interface Config {
  rows: number;
  columns: number;
  blockSize: number;
  imageWidth: number;
  imageHeight: number;
  imageUrl: string;
}

interface PuzzleContextType {
  config: Config;
  isLoading: boolean;
}

const EMPTY_CONFIG: Config = {
  rows: 0,
  columns: 0,
  blockSize: 0,
  imageWidth: 0,
  imageHeight: 0,
  imageUrl: "",
};

const PuzzleContext = createContext({} as PuzzleContextType);

export const PuzzleProvider = ({ children }: { children: ReactNode }) => {
  const [config, setConfig] = useState<Config>(EMPTY_CONFIG);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadPuzzle = async () => {
      const IMAGE_URL = "https://images.pexels.com/photos/27972917/pexels-photo-27972917.jpeg";
      try {
        const meta = await getMeta(IMAGE_URL);
        const MAX_WIDTH = Math.min(window.innerWidth - 40, 600);

        const scale = meta.width > MAX_WIDTH ? MAX_WIDTH / meta.width : 1;

        const imageWidth = Math.floor(meta.width * scale);
        const imageHeight = Math.floor(meta.height * scale);

        const minSize = Math.min(imageWidth, imageHeight);
        const blockSize = minSize / 6;

        const columns = Math.floor(imageWidth / blockSize);
        const rows = Math.floor(imageHeight / blockSize);

        setConfig({ rows, columns, blockSize, imageWidth, imageHeight, imageUrl: IMAGE_URL });
      } catch (error) {
        console.error("Erro ao carregar puzzle", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadPuzzle();
  }, []);

  const value = useMemo(() => ({ config, isLoading }), [config, isLoading]);

  return (
    <PuzzleContext.Provider value={value}>
      {isLoading ? <div>Carregando...</div> : children}
    </PuzzleContext.Provider>
  );
};

export const usePuzzle = () => useContext(PuzzleContext);