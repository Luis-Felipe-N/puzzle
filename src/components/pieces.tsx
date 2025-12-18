import { Piece } from "./piece";
import { usePuzzle } from "../context/puzzle-context";

export function Pieces() {
  const { availablePieces, config } = usePuzzle();
  const imageUrl = "https://images.pexels.com/photos/27972917/pexels-photo-27972917.jpeg";
  console.log({ availablePieces });
  return (
    <div className="bg-gray-200 relative " style={{ width: config.imageWidth, height: config.imageHeight }}>
      {availablePieces.map((piece, i) => (
        <Piece
          key={piece.id}
          id={piece.id}
          position={availablePieces[i].position}
          origin={piece.origin}
          size={config.blockSize}
          image={imageUrl}
          imageSize={{ width: config.imageWidth, height: config.imageHeight }}
        />
      ))}
    </div>
  );
}