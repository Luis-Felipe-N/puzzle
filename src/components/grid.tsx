import { useRef, useState } from "react"
import { DropZone } from "./drag-drop.tsx/drop-zone";
import { usePuzzle } from "../context/puzzle-context";
import { usePieces } from "../context/pieces-context";
import { Piece } from "./piece";

export function Grid() {
  const { config } = usePuzzle();
  const { boardPieces } = usePieces();
  const { blockSize } = config

  const bw = config.imageWidth
  const bh = Math.floor(config.imageHeight / blockSize) * blockSize
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const rows = Math.floor(bh / blockSize)
  const columns = Math.floor(bw / blockSize)

  const [zones] = useState(() => {
    const z = []
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < columns; x++) {
        z.push({ position: { x: x * blockSize, y: y * blockSize }, piece: null });
      }
    }
    return z
  })
  console.log({ zones })
  return (
    <div className="relative" style={{ width: bw, height: bh }}>
      <canvas ref={canvasRef} className="bg-white" width={bw} height={bh} />
      <div className="absolute inset-0 grid"
        style={{ gridTemplateColumns: `repeat(${columns}, ${blockSize}px)` }}>
        {zones.map((zone, i) => (
          <DropZone position={zone.position} key={i} style={{ width: blockSize, height: blockSize }}>
            <div style={{ width: blockSize, height: blockSize }} className="border-dashed border-gray-300 border-[0.5px]" />
          </DropZone>
        ))}

        {boardPieces.map((piece) => (
          <Piece key={piece.id} id={piece.id} position={piece.position} origin={piece.origin} size={blockSize} image={config.imageUrl} imageSize={{ width: config.imageWidth, height: config.imageHeight }} />
        ))}
      </div>
    </div >
  )
}