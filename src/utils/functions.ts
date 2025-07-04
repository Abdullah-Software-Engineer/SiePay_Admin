export const getDateTime = (d: any) => {
  if (d) {
    const dat = new Date(d);
    return `${dat.getDate()}/${dat
      .getMonth()
      .toString()
      .padStart(2, "0")}/${dat.getFullYear()} ${dat
      .getHours()
      .toString()
      .padStart(2, "0")}:${dat.getMinutes().toString().padStart(2, "0")}`;
  }
  return "-";
};
