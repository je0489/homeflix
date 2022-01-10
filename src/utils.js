export const noImage = (datas) =>
  datas.filter(({ backdrop_path }) => (backdrop_path ? true : false));

export const top10 = (datas) => datas.slice(0, 10);

export const replaceSpace = (str, newSubstr) => str.replace(/\s/g, newSubstr);

export const makeImageFullUrl = (path, size = "original") =>
  `https://image.tmdb.org/t/p/${size}/${path}`;

export const makeYoutubeUrl = (gubun, key) => {
  if (!["video", "thumnail"].includes(gubun))
    throw new Error("'param' must be a TheEnum value");
  return gubun === "video"
    ? `https://www.youtube.com/watch?v=${key}`
    : `https://img.youtube.com/vi/${key}/0.jpg`;
};
