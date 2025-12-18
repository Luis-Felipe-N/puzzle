import { useRef } from "react";

interface DragDrogColumnProps {
  children: React.ReactNode;
}

export function DragDrogColumn({ children }: DragDrogColumnProps) {
  const ref = useRef<HTMLDivElement>(null);

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    console.log("Drag over", event);
  }
  return <div ref={ref} onDragOver={handleDragOver}>{children}</div>;
}