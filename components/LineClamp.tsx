import type { ReactNode, ElementType } from "react";
import { useState, useRef, useEffect } from 'react';
import Button from 'react-bootstrap/Button';

import { Cx } from '../utils/dom';

interface Props {
  as?: ElementType,
  open?: boolean,
  line?: number | undefined | null,
  id?: string | undefined,
  label?: ReactNode,
  labelShow?: ReactNode,
  labelProps?: object | undefined,
  className?: string | undefined,
  children?: ReactNode,
}

export default function LineClamp({
  as: As = 'div',
  open,
  line,
  id,
  label,
  labelShow,
  labelProps,
  className,
  children,
}: Props){
  const asRef = useRef();
  const [isOverflow, setIsOverflow] = useState<boolean>(false);
  const [show, setShow] = useState<boolean>(!!open);

  useEffect(() => {
    const node = asRef.current as (ReactNode | any); // HTMLElement | ElementType
    if(line && node){
      const { lineHeight, paddingTop, paddingBottom, borderTopWidth, borderBottomWidth } = getComputedStyle(node);
      // fontSize = "13px", lineHeight = "19.5px"
      // console.log('style: ', style);
      const contentSize = Number.parseFloat(paddingTop) + Number.parseFloat(paddingBottom) + Number.parseFloat(borderTopWidth) + Number.parseFloat(borderBottomWidth);
      if(node.clientHeight > (Number.parseFloat(lineHeight) * line) + contentSize){
        setIsOverflow(true);
      }
    }
  }, [asRef.current, line]);

  const toggle = () => {
    setShow(!show);
  }

  return (
    <>
      <As
        ref={asRef}
        id={id}
        className={Cx(show ? '' : isOverflow && 'line-clamp', className)}
        style={{ '--w-clamp': isOverflow ? line : undefined }}
      >
        {children}
      </As>

      {isOverflow &&
        <Button
          {...labelProps}
          onClick={toggle}
          aria-controls={id}
          aria-expanded={show}
        >
          {show ? labelShow : label}
        </Button>
      }
    </>
  );
}
