const bNumb = (numb) => numb < 10 ? '0' + numb : numb;

const bDate = () => {
  const curDate = new Date();
  const bYear = curDate.getFullYear();
  const bMonth = bNumb(curDate.getDate());
  const bDate = bNumb(curDate.getDate());

  return `${bDate}_${bMonth}-${bYear}`;
}

exports.bDate = bDate;