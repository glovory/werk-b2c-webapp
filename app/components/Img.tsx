import { forwardRef, useState } from 'react';
import { Cx } from '~/utils/dom';
import { isSSR } from "~/utils/typeChecking";

const Img = forwardRef<HTMLImageElement, any>(
  (
    {
      src,
      className,
      loading = 'lazy', // eager | lazy (Default browser = eager)
      decoding = 'async', // sync | async | auto (Default browser = auto)
      draggable = false,
      onError,
      onLoad,
      ...etc
    }: any,
    ref
  ) => {
    // let initLoad = true;
    // if(!src){
    //   // src = imgError;
    //   initLoad = false;
    // }

    const [load, setLoad] = useState(!isSSR()); // true

    const Load = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
      // console.log('Load e: ', e);
      setLoad(false);
      onLoad?.(e);
    }

    const Err = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
      setLoad(false);

      // e.target.src = imgError;

      onError?.(e);
    }

    return (
      <img
        {...etc}
        ref={ref}
        src={src}
        decoding={decoding}
        loading={loading}
        draggable={draggable}
        className={Cx(
          load && 'img-loader',
          className
        )}
        onError={Err}
        onLoad={Load}
      />
    );
  }
);

export default Img;
