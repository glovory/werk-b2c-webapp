import cls from 'classnames';

/** classnames return undefined if length < 1 for prevent react render class="" */
declare namespace classNames {
  type Value = string | number | boolean | undefined | null;
  type Mapping = Record<string, unknown>;
  interface ArgumentArray extends Array<Argument> {}
  type Argument = Value | Mapping | ArgumentArray;
}
export function Cx(...args: classNames.ArgumentArray){
	return cls.apply(null, args) || undefined;
}

// For trigger click element when press Enter key
export const enterToClick = (e: any) => {
	if(e?.key === 'Enter'){
		e.target.click();
	}
}

// For loader <img />
export function imgLoader(
  className?: string,
  onLoad?: (e: any) => void,
  onError?: (e: any) => void
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
