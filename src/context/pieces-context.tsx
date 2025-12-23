import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { fisherYatesShuffle } from "../utils/fisher-yates";
import { usePuzzle } from "./puzzle-context";

export interface PuzzlePiece {
  id: string;
  position: { x: number; y: number };
  origin: { x: number; y: number };
}

interface PiecesContextType {
  availablePieces: PuzzlePiece[];
  boardPieces: PuzzlePiece[];
  isReady: boolean;
  isWinner: boolean;
  movePiece: (id: string, newPos: { x: number; y: number }) => void;
}

const PiecesContext = createContext({} as PiecesContextType);

export const PiecesProvider = ({ children }: { children: ReactNode }) => {
  const { config, isLoading: isPuzzleLoading } = usePuzzle();

  const [availablePieces, setAvailablePieces] = useState<PuzzlePiece[]>([]);
  const [boardPieces, setBoardPieces] = useState<PuzzlePiece[]>([]);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (isPuzzleLoading) return;
    if (!config.blockSize || !config.rows || !config.columns) return;

    const initialPieces: PuzzlePiece[] = [];
    const positions: { x: number; y: number }[] = [];

    for (let y = 0; y < config.rows * config.blockSize; y += config.blockSize) {
      for (let x = 0; x < config.columns * config.blockSize; x += config.blockSize) {
        initialPieces.push({ id: `${x}-${y}`, origin: { x, y }, position: { x, y } });
        positions.push({ x, y });
      }
    }

    const shuffled = fisherYatesShuffle(positions);
    const piecesWithPositions = initialPieces.map((piece, idx) => ({
      ...piece,
      position: shuffled[idx],
    }));

    setAvailablePieces(piecesWithPositions);
    setBoardPieces([]);
    setIsReady(true);
  }, [config, isPuzzleLoading]);

  const isWinner = useMemo(() => isReady && availablePieces.length === 0, [isReady, availablePieces]);

  useEffect(() => {
    if (!isWinner) return;
    const timeoutId = setTimeout(() => alert("Você venceu!"), 100);
    return () => clearTimeout(timeoutId);
  }, [isWinner]);

  const movePiece = useCallback((id: string, newPos: { x: number; y: number }) => {
    setAvailablePieces((prev) => {
      const piece = prev.find((p) => p.id === id);
      if (!piece) return prev;

      const pieceInCorrectPosition = piece.origin.x === newPos.x && piece.origin.y === newPos.y;
      if (!pieceInCorrectPosition) return prev;

      setBoardPieces((board) => [...board, { ...piece, position: newPos }]);
      return prev.filter((p) => p.id !== id);
    });
  }, []);

  const value = useMemo(
    () => ({ availablePieces, boardPieces, isReady, isWinner, movePiece }),
    [availablePieces, boardPieces, isReady, isWinner, movePiece]
  );

  return <PiecesContext.Provider value={value}>{children}</PiecesContext.Provider>;
};

export const usePieces = () => useContext(PiecesContext);