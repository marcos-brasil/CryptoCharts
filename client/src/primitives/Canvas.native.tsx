import React, { forwardRef } from 'react';

import Canvas from 'react-native-canvas';
import { CanvasProps } from 'react-native-canvas';

export default forwardRef((props: CanvasProps, ref) => {
  return <Canvas {...props} ref={ref as (canvas: Canvas) => null} />;
});
