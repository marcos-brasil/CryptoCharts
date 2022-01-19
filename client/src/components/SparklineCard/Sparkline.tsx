import React from 'react';

import { Canvas } from '../../primitives';
import { rescale } from '../../utils';
import { Platform } from 'react-native';

type Props = React.HTMLAttributes<JSX.Element> & {
  points: number[];
  color: string;
};

export default function Sparline(props: Props): JSX.Element {
  let points = props.points;
  props = Platform.OS === 'web' ? { ...props, points: [] } : props;

  return (
    <Canvas
      {...props}
      ref={drawCanvas(points, props.color)}
      // style={{ height: 150, width: 300 }}
    />
  );
}

const drawCanvas =
  (points: number[], color: string) => (canvas: HTMLCanvasElement) => {
    if (canvas == null) {
      return;
    }

    const ctx = canvas.getContext('2d');
    if (ctx == null) {
      return;
    }

    let { height, width } = ctx.canvas;

    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = 'rgba(0, 0, 0, 0.0)';
    ctx.fillRect(0, 0, width, height);

    ctx.save();

    ctx.lineWidth = Platform.OS === 'web' ? 1.5 : 1;
    ctx.lineJoin = 'round';

    ctx.strokeStyle = color;

    const normalizedHeight = height * 0.9;

    let canvasVerticalPadding = (height - normalizedHeight) / 2;

    let max = -Infinity;
    let min = Infinity;

    for (let y of points) {
      if (y > max) {
        max = y;
      }

      if (y < min) {
        min = y;
      }
    }

    const remap = rescale(normalizedHeight, 0)(min, max);
    const dx = 1 / points.length;

    ctx.beginPath();

    let widthNativeFix = Platform.OS === 'web' ? 0.95 : 0.655;
    let heighNativetFix = Platform.OS === 'web' ? 0.9 : 1;

    for (let idx = 0; idx < points.length; idx++) {
      ctx.lineTo(
        idx * dx * width * widthNativeFix,
        (remap(points[idx]) + canvasVerticalPadding) * heighNativetFix
      );
    }

    ctx.stroke();
  };
