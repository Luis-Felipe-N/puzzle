import { useRef } from "react";

interface DragItemProps {
  id: string;
  children: React.ReactNode;
}

export function DragItem({ id, children }: DragItemProps) {
  const ref = useRef<HTMLDivElement>(null);

  const handleDragStart = (event: React.DragEvent<HTMLDivElement>) => {
    event.dataTransfer.setData("pieceId", id);
  }

  return <div draggable ref={ref} onDragStart={handleDragStart}>{children}</div>;
}