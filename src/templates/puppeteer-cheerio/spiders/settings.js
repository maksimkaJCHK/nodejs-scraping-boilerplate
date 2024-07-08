const width = 1880;
const height = 1024;

export const settings = {
  viewPort: {
    width,
    height,
  },
  launch: {
    headless: false,
    args: [`--window-size=${width},${height}`]
  },
  gotoParam: {
    timeout: 60_000,
    waitUntil: 'domcontentloaded'
  }
};