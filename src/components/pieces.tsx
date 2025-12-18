import { useState } from "react";
import { Piece } from "./piece";
import { fisherYatesShuffle } from "../utils/fisher-yates";
import { usePuzzle } from "../context/puzzle-context";

interface PiecesProps {
  imageWidth: number;
  imageHeight: number;
}

export function Pieces() {
  const { availablePieces, config } = usePuzzle();
  const imageUrl = "https://images.pexels.com/photos/27972917/pexels-photo-27972917.jpeg";
  console.log({ availablePieces });
  return (
    <div className="bg-gray-200 relative border border-black" style={{ width: config.imageWidth, height: config.imageHeight }}>
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