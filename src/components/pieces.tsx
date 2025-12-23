import { Piece } from "./piece";
import { usePuzzle } from "../context/puzzle-context";
import { usePieces } from "../context/pieces-context";

export function Pieces() {
  const { config } = usePuzzle();
  const { availablePieces } = usePieces();

  return (
    <div className="bg-gray-200 relative" style={{ width: config.imageWidth, height: config.imageHeight }}>
      {availablePieces.map((piece, i) => (
        <Piece
          key={piece.id}
          id={piece.id}
          position={availablePieces[i].position}
          origin={piece.origin}
          size={config.blockSize}
          image={config.imageUrl}
          imageSize={{ width: config.imageWidth, height: config.imageHeight }}
        />
      ))}
    </div>
  );
}