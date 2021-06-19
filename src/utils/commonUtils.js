export const frecuentUrls = {
  baseImgUrls: "https://image.tmdb.org/t/p/w500/",
};

export const formatDateToEurope = (date) => {
  let newDate = new Date();
  let day = newDate.getDate();
  let month = newDate.getMonth() + 1;
  let year = newDate.getFullYear();

  if (month < 10) {
    return `0${month}-${year}`;
  } else {
    return `${month}-${year}`;
  }
};

const fonts = ["DelaGothicOne", "MateSC", "IndieFlower"];

export const fontClassGetterByIndex = (index) => {
  return fonts[index % 3];
};
