export const formatNumberPrice = {
  formatter: (value: string) =>
    `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ","),
  parser: (value: string) =>
    value?.replace(/\$\s?|(,*)/g, "") as unknown as number,
};
