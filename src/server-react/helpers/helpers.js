export const bSeo = ({ title, description }) => {
  return `
  <title>${title}</title>
  <meta name="description" content="${description}">
`
};

export const bPage = ({ page, seo, appContent, js = "<!-- -->" }) => {
  page = page.replace(/<!--seo-->/, seo);
  page = page.replace(/<!-- js -->/, `<script>${js}</script>`);
  page = page.replace('<div id="forRenderContent"></div>', `<div id="forRenderContent">${appContent}</div>`);

  return page;
};