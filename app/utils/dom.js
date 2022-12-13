import cls from 'classnames';

/** classnames return undefined if length < 1 for prevent react render class="" */
export function Cx(){
	return cls.apply(null, arguments) || undefined;
}

export const enterToClick = (e) => {
	if(e.key === 'Enter'){
		e.target.click();
	}
}
