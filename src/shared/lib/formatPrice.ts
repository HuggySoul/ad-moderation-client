/** Преобразует числа к формату 100000 -> 100 000 или 1000 -> 1 000 */
export const formatPrice = (number: number): string => {
  return new Intl.NumberFormat("ru-RU", {
    style: "decimal",
    useGrouping: true,
    minimumFractionDigits: 0,
  })
    .format(number)
    .replace(/\s/g, " ")
    .replace(",", ".");
};
