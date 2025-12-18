import { useEffect, useRef, useState } from "react"
import { DragDrogColumn } from "./drag-drop.tsx/drag-drop-column";
import { DropZone } from "./drag-drop.tsx/drop-zone";
import { usePuzzle } from "../context/puzzle-context";

interface GridProps {
  imageWidth: number;
  imageHeight: number;
}

export function Grid() {
  const { config, boardPieces } = usePuzzle()
  const minSize = Math.min(config.imageWidth, config.imageHeight)

  const blockSize = minSize / 6

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
          <div key={piece.id}
            style={{
              width: blockSize,
              height: blockSize,
              position: 'absolute',
              left: piece.position.x,
              top: piece.position.y,
              backgroundImage: `url(https://images.pexels.com/photos/27972917/pexels-photo-27972917.jpeg)`,
              backgroundSize: `${config.imageWidth}px ${config.imageHeight}px`,
              backgroundPosition: `-${piece.origin.x}px -${piece.origin.y}px`,
              border: '1px solid rgba(0,0,0,0.1)',
              boxSizing: 'border-box'
            }}>
          </div>
        ))}
      </div>
    </div >
  )
}