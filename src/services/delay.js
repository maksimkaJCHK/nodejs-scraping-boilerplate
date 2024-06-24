export const delayF = (delay = 5000) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(), delay);
  });
};