export const bSeo = ({ title, description }) => {
  return `
  <title>${title}</title>
  <meta name="description" content="${description}">
`
};

export const bPage = ({ page, seo, appContent, js = "<!-- -->" }) => {
  page = page.replace(/<!--seo-->/, seo);
  page = page.replace(/<!-- js -->/, `<script>${js}</script>`);
  page = page.replace('<div id="app"></div>', `<div id="app">${appContent}</div>`);

  return page;
};