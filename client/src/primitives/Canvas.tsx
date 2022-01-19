import React, { forwardRef } from 'react';

export default forwardRef(
  (
    props: React.HTMLAttributes<unknown>,
    ref: React.ForwardedRef<HTMLCanvasElement>
  ) => {
    return <canvas {...props} ref={ref} />;
  }
);
