import { useRef, type DragEvent, type ReactNode } from "react";

interface DragDrogColumnProps {
  children: ReactNode;
}

export function DragDrogColumn({ children }: DragDrogColumnProps) {
  const ref = useRef<HTMLDivElement>(null);

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    console.log("Drag over", event);
  }
  return <div ref={ref} onDragOver={handleDragOver}>{children}</div>;
}