import { useRef, useState, type DragEvent, type HTMLAttributes, type ReactNode } from "react";
import { usePieces } from "../../context/pieces-context";

interface DragDrogColumnProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  position: { x: number; y: number };
}

export function DropZone({ children, position, ...props }: DragDrogColumnProps) {
  const { movePiece } = usePieces();
  const ref = useRef<HTMLDivElement>(null);

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  }


  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    movePiece(event.dataTransfer.getData("pieceId"), position);
  }

  return <div ref={ref} onDragOver={handleDragOver} onDrop={handleDrop} {...props}>{children}</div>;
}