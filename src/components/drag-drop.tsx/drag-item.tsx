import { useRef, type DragEvent, type ReactNode } from "react";

interface DragItemProps {
  id: string;
  children: ReactNode;
}

export function DragItem({ id, children }: DragItemProps) {
  const ref = useRef<HTMLDivElement>(null);

  const handleDragStart = (event: DragEvent<HTMLDivElement>) => {
    event.dataTransfer.setData("pieceId", id);
  }

  return <div draggable ref={ref} onDragStart={handleDragStart}>{children}</div>;
}