export const convertDateToString = (date: string): string => {
  const monthMap: Map<string, string> = new Map();
  monthMap.set("1", "January");
  monthMap.set("2", "February");
  monthMap.set("3", "March");
  monthMap.set("4", "April");
  monthMap.set("5", "May");
  monthMap.set("6", "June");
  monthMap.set("7", "July");
  monthMap.set("8", "August");
  monthMap.set("9", "September");
  monthMap.set("10", "October");
  monthMap.set("11", "November");
  monthMap.set("12", "December");

  const date_with_slashes = new Date(date).toLocaleDateString("en-US");
  const date_split = date_with_slashes.split("/");
  return `${monthMap.get(date_split[0])} ${date_split[1]}, ${date_split[2]}`;
}