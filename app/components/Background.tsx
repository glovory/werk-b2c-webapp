import { forwardRef, useEffect, useState } from 'react';

const Background = forwardRef(
  (
    {
      as: As = "div",
      src,
      style,
      children,
      onLoad,
      onError,
      ...etc
    }: any,
    ref
  ) => {
    const [load, setLoad] = useState(false);
    const [dataSrc, setDataSrc] = useState();

    useEffect(() => {
      if (src) {
        const img = new Image();
        img.src = src;

        const loadFn = (e: any) => {
          setDataSrc(src);
          setLoad(true);
          onLoad?.(e);
        }
        const errorFn = (e: any) => {
          setLoad(true);
          onError?.(e);
        }

        img.addEventListener('load', loadFn);
        img.addEventListener('error', errorFn);

        return () => {
          img.removeEventListener('load', loadFn);
          img.removeEventListener('error', errorFn);
        }
      }
    }, [src]);

    return (
      <As
        {...etc}
        ref={ref}
        style={{
          ...style,
          backgroundImage: dataSrc ? `url(${dataSrc})` : undefined
        }}
      >
        {typeof children === 'function' ? children(load) : children}
      </As>
    );
  }
);

export default Background;
