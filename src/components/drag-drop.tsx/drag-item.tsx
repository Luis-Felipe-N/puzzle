import { useRef } from "react";

interface DragItemProps {
  children: React.ReactNode;
}

export function DragItem({ children }: DragItemProps) {
  const ref = useRef<HTMLDivElement>(null);

  const handleDragStart = (event: React.DragEvent<HTMLDivElement>) => {
    console.log(event);
  }

  return <div draggable ref={ref} onDragStart={handleDragStart}>{children}</div>;
}