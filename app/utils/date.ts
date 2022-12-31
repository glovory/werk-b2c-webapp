export const parseDate = (
  date: any, // string | Date | object
  locales?: string,
  options: any = { dateStyle: 'long' }
) => {
  return new Intl.DateTimeFormat(locales || 'en-GB', options || {}).format(typeof date === 'object' ? date : new Date(date));
}
