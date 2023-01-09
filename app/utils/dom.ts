import cls from 'classnames';

/** 
 * classnames return undefined if length < 1 for prevent react render class=""
 * ##
 * ### Docs:
 * - [classnames](https://github.com/JedWatson/classnames)
 */
declare namespace classNames {
  type Value = string | number | boolean | undefined | null;
  type Mapping = Record<string, unknown>;
  interface ArgumentArray extends Array<Argument> {}
  type Argument = Value | Mapping | ArgumentArray;
}
export function Cx(...args: classNames.ArgumentArray){
	return cls.apply(null, args) || undefined;
}

/**
 * ### For trigger click element when press Enter key
 * @param e : Event
 */
export const enterToClick = (e: any) => {
	if(e?.key === 'Enter'){
		e.target.click();
	}
}

/**
 * ### For loader <img />
 * @param className string | number | null | undefined
 * @param onLoad Function | null | function
 * @param onError Function | null | function
 * @returns Object
 */
export function imgLoader(
  className?: string,
  onLoad?: any, // (e: any) => void 
  onError?: any // (e: any) => void
){
  return {
    className: Cx("img-loader", className),
    onLoad: (e: any) => {
      e.target.classList.remove('img-loader');
      onLoad?.(e);
    },
    onError: (e: any) => {
      e.target.classList.remove('img-loader');
      onError?.(e);
    },
  }
}
