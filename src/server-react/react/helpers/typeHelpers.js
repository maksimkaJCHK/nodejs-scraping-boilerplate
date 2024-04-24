const monthArr = [
  'января',
  'февраля',
  'марта',
  'апреля',
  'мая',
  'июня',
  'июля',
  'августа',
  'сентября',
  'октября',
  'ноября',
  'декабря',
];

const bNumb = (n) => {
  if (n < 10) {
    return `0${n}`;
  }

  return n;
};

export const bTime = (time) => {
  const date = time.getDate();
  const month = monthArr[time.getMonth()];
  const year = time.getFullYear();
  const hour = bNumb(time.getHours());
  const minute = bNumb(time.getMinutes());

  return {
    time: `${hour}:${minute}`,
    date: `${date} ${month} ${year}`
  };
};