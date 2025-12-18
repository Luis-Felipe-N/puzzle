import { useState } from "react";
import { Piece } from "./piece";

interface PiecesProps {
  imageWidth: number;
  imageHeight: number;
}

export function Pieces({ imageWidth, imageHeight }: PiecesProps) {
  const minSize = Math.min(imageWidth, imageHeight);
  const blockSize = minSize / 6;
  const bw = imageWidth;
  const bh = Math.floor(imageHeight / blockSize) * blockSize;

  const imageUrl = "https://picsum.photos/id/237/441/668";

  const [pieces] = useState(() => {
    const p = [];
    for (let y = 0; y < bh; y += blockSize) {
      for (let x = 0; x < bw; x += blockSize) {
        p.push({
          id: `${x}-${y}`,
          position: { x, y },
          origin: { x, y },
        });
      }
    }
    return p;
  });

  return (
    <div className="bg-gray-200 relative border border-black" style={{ width: bw, height: bh }}>
      {pieces.map((piece) => (
        <Piece
          key={piece.id}
          position={piece.position}
          origin={piece.origin}
          size={blockSize}
          image={imageUrl}
          imageSize={{ width: bw, height: bh }}
        />
      ))}
    </div>
  );
}