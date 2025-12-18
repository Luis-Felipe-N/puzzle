import { use, useRef, useState } from "react";
import { usePuzzle } from "../../context/puzzle-context";

interface DragDrogColumnProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  position: { x: number; y: number };
}

export function DropZone({ children, position, ...props }: DragDrogColumnProps) {
  const { movePiece } = usePuzzle()
  const ref = useRef<HTMLDivElement>(null);
  const [isOver, setIsOver] = useState(false);

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsOver(true);
  }

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    setIsOver(false);

  }

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    setIsOver(false);

    movePiece(event.dataTransfer.getData("pieceId"), position);
  }

  console.log("Render DropZone", isOver);
  return <div ref={ref} onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop} {...props} className={isOver ? "bg-zinc-950/20" : ""}>{children}</div>;
}