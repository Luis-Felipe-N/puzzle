import { useEffect, useRef } from "react"

interface GridProps {
  imageWidth: number;
  imageHeight: number;
}

export function Grid({ imageWidth, imageHeight }: GridProps) {
  const minSize = Math.min(imageWidth, imageHeight)

  const blockSize = minSize / 6

  const bw = imageWidth
  const bh = Math.floor(imageHeight / blockSize) * blockSize
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (!context || !canvas) return;

    context.clearRect(0, 0, bw, bh);

    context.beginPath();
    context.strokeStyle = "black";
    context.lineWidth = 1;

    for (let x = 0; x <= bw; x += blockSize) {
      context.moveTo(x + 0.5, 0);
      context.lineTo(x + 0.5, bh);
    }

    for (let y = 0; y <= bh; y += blockSize) {
      context.moveTo(0, y + 0.5);
      context.lineTo(bw, y + 0.5);
    }

    context.stroke();
  }, [])

  return (
    <>
      <canvas ref={canvasRef} className="bg-white" width={bw} height={bh}></canvas>
    </>
  )
}