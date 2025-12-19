import { DragItem } from "./drag-drop.tsx/drag-item";

interface PieceProps {
  id: string;
  position: { x: number; y: number };
  origin: { x: number; y: number };
  size: number;
  image: string;
  imageSize: { width: number; height: number };
}

export function Piece({ id, position, size, origin, image, imageSize }: PieceProps) {
  console.log({ position });
  return (
    <DragItem id={id}>

      <div
        className="hover:z-10 hover:border-blue-400 transition-all cursor-pointer"
        style={{
          width: size,
          height: size,
          left: position.x,
          top: position.y,
          position: 'absolute',
          backgroundImage: `url(${image})`,
          backgroundSize: `${imageSize.width}px ${imageSize.height}px`,
          backgroundPosition: `-${origin.x}px -${origin.y}px`,
          border: '1px solid rgba(0,0,0,0.1)',
          boxSizing: 'border-box'
        }}
      >
      </div>
    </DragItem>
  )
}