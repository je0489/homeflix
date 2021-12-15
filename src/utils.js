export const noImage = (datas) =>
  datas.filter(({ backdrop_path }) => (backdrop_path ? true : false));

export const top10 = (datas) => datas.slice(0, 10);
