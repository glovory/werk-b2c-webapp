import dayjs from "dayjs";
import LocalizedFormat from "dayjs/plugin/localizedFormat";

dayjs.extend(LocalizedFormat);

const defaultLocale = dayjs.locale();

export default function Time({
  as: As = 'time',
  value,
  locales,
  format: dateFormat = "D MMMM YYYY", // L
  ...etc
}: any){
  return (
    <As {...etc}>
      {dayjs(value)
        .locale(locales || defaultLocale)
        .format(dateFormat)}
    </As>
  );
}
