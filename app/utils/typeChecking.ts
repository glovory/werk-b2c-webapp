/** @NOTE : Only SSR, for check disable JavaScript by user browser */
export const isSSR = () => !(typeof window !== 'undefined');
