import dayjs from "dayjs"; // * as djs
import LocalizedFormat from "dayjs/plugin/localizedFormat";
// import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(LocalizedFormat);
dayjs.extend(relativeTime);
// dayjs.extend(duration);

// const defaultLocale = dayjs.locale();
// const djs = (value: any, locales?: any) => dayjs(value, locales).locale(locales || defaultLocale);

export default dayjs;
