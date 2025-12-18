import { createContext, useContext, useEffect, useState } from "react";
import { getMeta } from "../utils/get-meta";
import { fisherYatesShuffle } from "../utils/fisher-yates";

interface Piece {
  id: string;
  position: { x: number; y: number };
  origin: { x: number; y: number };
}

interface Config {
  rows: number;
  columns: number;
  blockSize: number;
  imageWidth: number;
  imageHeight: number;
}

interface PuzzleContextType {
  availablePieces: Piece[];
  boardPieces: Piece[];
  config: Config;
  isLoading: boolean;
  movePiece: (id: string, newPos: { x: number; y: number }) => void;
}

const PuzzleContext = createContext({} as PuzzleContextType);

export const PuzzleProvider = ({ children }: { children: React.ReactNode }) => {
  const [availablePieces, setAvailablePieces] = useState<Piece[]>([]);
  const [boardPieces, setBoardPieces] = useState<Piece[]>([]);
  const [config, setConfig] = useState<Config>({} as Config);
  const [isLoading, setIsLoading] = useState(true);

  const movePiece = (id: string, newPos: { x: number; y: number }) => {
    const piece = availablePieces.find((p) => id === p.id)
    if (!piece) return;

    const pieceInCorrectPosition = JSON.stringify(piece.origin) === JSON.stringify(newPos)
    if (!pieceInCorrectPosition) return;

    setAvailablePieces((prev) => prev.filter((p) => p.id !== id));
    const updatedPiece = { ...piece!, position: newPos };
    setBoardPieces((prev) => [...prev, updatedPiece]);
  };

  useEffect(() => {
    const loadPuzzle = async () => {
      const imageUrl = "https://picsum.photos/id/237/441/668";
      try {
        const { width: imageWidth, height: imageHeight } = await getMeta(imageUrl);
        const minSize = Math.min(imageWidth, imageHeight);
        const blockSize = minSize / 6;

        const cols = Math.floor(imageWidth / blockSize);
        const rows = Math.floor(imageHeight / blockSize);

        const initialPieces: Piece[] = [];
        const allPositions: { x: number; y: number }[] = [];

        for (let y = 0; y < rows * blockSize; y += blockSize) {
          for (let x = 0; x < cols * blockSize; x += blockSize) {
            initialPieces.push({ id: `${x}-${y}`, origin: { x, y }, position: { x, y } });
            allPositions.push({ x, y });
          }
        }

        const shuffledPositions = fisherYatesShuffle(allPositions);
        const piecesWithShuffledPos = initialPieces.map((p, i) => ({
          ...p,
          position: shuffledPositions[i]
        }));

        setConfig({ rows, columns: cols, blockSize, imageWidth, imageHeight });
        setAvailablePieces(piecesWithShuffledPos);
      } catch (error) {
        console.error("Erro ao carregar puzzle", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadPuzzle();
  }, []);

  return (
    <PuzzleContext.Provider value={{ availablePieces, boardPieces, config, isLoading, movePiece }}>
      {isLoading ? <div>Carregando...</div> : children}
    </PuzzleContext.Provider>
  );
};

export const usePuzzle = () => useContext(PuzzleContext);