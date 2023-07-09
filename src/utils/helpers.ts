import _ from "lodash";

export const randomArray = (number: number): number[] =>
  Array.from({ length: number }, (_, i) => i + 1);

export const formatCurrency = (number: number | undefined) => {
  if (!number) return "0";
  const formattedNumber =
    _.replace(_.round(number, 0).toString(), /\B(?=(\d{3})+(?!\d))/g, ".") +
    " đ";
  return formattedNumber;
};

export const formatDateFromISOString = (string: string | undefined) => {
  if (!string) return "";
  return string.split("T")[0];
};

export const formatPhonenumber = (phone: string | undefined) => {
  if (!phone) return "";
  return _.replace(phone, /(\d{4})(\d{3})(\d{3})/, "$1.$2.$3");
};

export const linkify = (text: string) => {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  return text.replace(
    urlRegex,
    (url) =>
      `<a href="${url}" target="_blank">
    ${url}
  </a>`
  );
};

export const containsUrl = (text: string) => {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  return urlRegex.test(text);
};
