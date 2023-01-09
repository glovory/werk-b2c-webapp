import { forwardRef, ReactNode } from 'react';
// import dayjs from "dayjs";
// import LocalizedFormat from "dayjs/plugin/localizedFormat";

import dayjs from '~/utils/dayjs';

// dayjs.extend(LocalizedFormat);

interface TimeProps {
  as?: any
  value?: any
  locales?: string
  format?: string
  start?: ReactNode | string | number
  end?: ReactNode | string | number
}

const defaultLocale = dayjs.locale();

/**
 * ```ts
 * interface TimeProps {
 *  as?: HTMLElement | React Component
 *  value?: any
 *  locales?: string
 *  format?: string
 *  start?: ReactNode | string | number
 *  end?: ReactNode | string | number
 * }
 * ```
 * ### This component using:
 * - [dayjs](https://day.js.org/docs/en/installation/installation)
 * ##
 */
const Time = forwardRef<HTMLTimeElement, any>(
  (
    {
      as: As = 'time',
      value,
      locales,
      format: dateFormat = "D MMMM YYYY", // L
      start,
      end,
      ...etc
    }: TimeProps,
    ref
  ) => {
    return (
      <As
        {...etc}
        ref={ref}
      >
        {start}
  
        {dayjs(value)
          .locale(locales || defaultLocale)
          .format(dateFormat)}
  
        {end}
      </As>
    );
  }
);

export default Time;
