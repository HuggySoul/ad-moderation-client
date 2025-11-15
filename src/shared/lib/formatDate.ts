export const formatDate = (isoDate: string) => {
  const date = new Date(isoDate);

  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const hour = date.getHours();
  const minute = date.getMinutes();

  if (Number.isNaN(day) || Number.isNaN(month) || Number.isNaN(year)) {
    return {
      day: "00",
      month: "00",
      year: "00",
    };
  }

  return {
    day: `${day}`.padStart(2, "0"),
    month: `${month}`.padStart(2, "0"),
    year: `${year}`.slice(2),
    hour: `${hour}`,
    minute: `${minute}`.padStart(2, "0"),
  };
};
