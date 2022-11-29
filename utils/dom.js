import cls from 'classnames';
// import { isObj, isStr } from './typeChecking';

/** classnames return undefined if length < 1 for prevent react render class="" */
export function Cx(){
	return cls.apply(null, arguments) || undefined;
}

// export function setClass(el, cls, fn = 'add') {
//   el && cls && el.classList[fn](...cls.split(' '));
// }

// export function hasClass(el, c) {
//   return el && c && el.classList.contains(c);
// }

/**
@el 	: DOM element / node
@attr : valid attribute name & value (Object)
*/
// export function setAttr(el, attr) {
//   if (el) {
//     if (isObj(attr)) {
//       for (let key in attr) {
//         el.setAttribute(key, attr[key]);
//       }
//     } else if (isStr(attr))
//       attr.split(' ').forEach((v) => el.removeAttribute(v));
//     else
//       console.warn('setAttr() : params 2 required Object to add / string to remove, To remove several attributes, separate the attribute names with a space');
//   }
// }

// export function Cx() {
//   let hasOwn = {}.hasOwnProperty,
//       c = [],
//       alength = arguments.length;
//   for (let i = 0; i < alength; i++) {
//     let arg = arguments[i];
//     if (!arg) continue;

//     if (isStr(arg) || isNum(arg)) {
//       c.push(arg);
//     } else if (Array.isArray(arg) && arg.length) {
//       let inr = Cx.apply(null, arg);
//       if (inr) c.push(inr);
//     } else if (isObj(arg)) {
//       for (let k in arg) {
//         if (hasOwn.call(arg, k) && arg[k]) c.push(k);
//       }
//     }
//   }
//   return c.length ? c.join(' ') : undefined;
// }
