export const delayF = (delay = 5000) => {
  return new Promise((resolve, reject) => {
    setInterval(() => resolve(), delay);
  });
};