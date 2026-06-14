/** تبدیل اعداد انگلیسی به فارسی — برای نمایش */
export function toPersianDigits(str: string): string {
  return str.replace(/[0-9]/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[Number(d)]);
}

/** تبدیل اعداد فارسی/عربی به انگلیسی — برای پردازش و جستجو */
export function toEnglishDigits(str: string): string {
  return str
    .replace(/[۰-۹]/g, (d) => String(d.charCodeAt(0) - 1776))
    .replace(/[٠-٩]/g, (d) => String(d.charCodeAt(0) - 1632));
}
