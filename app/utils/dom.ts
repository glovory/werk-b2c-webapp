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
	if(e.key === 'Enter'){
		e.target.click();
	}
}
