import dayjs from "dayjs";

export const generateBiletNo = () => {
  const tarih = dayjs().format("YYYYMMDD");
  const randomNum = Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, "0");
  return `${tarih}${randomNum}`;
}; 