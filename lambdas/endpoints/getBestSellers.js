const chromium = require("chrome-aws-lambda");
const Responses = require("../commom/API_Responses.js");
module.exports.handler = async (event) => {
  const date = new Date().toLocaleDateString("en-US").replace(/\//g, "-");
  const browser = await chromium.puppeteer.launch({
    args: chromium.args,
    defaultViewport: chromium.defaultViewport,
    executablePath: await chromium.executablePath,
    headless: chromium.headless,
    ignoreHTTPSErrors: true,
  });
  const page = await browser.newPage();
  await page.setViewport({
    width: 1920,
    height: 1080,
  });
  await page.goto("https://www.amazon.com.br/bestsellers");
  await page.waitForSelector(".a-begin");
  const result = await page.$$eval(".a-begin", (nodes) => {
    return nodes.map((node) => {
      const category = node.querySelector("h2").innerText;
      const detailCategory = node.querySelector("ol");
      const bestsellersCategory = Array.from(
        detailCategory.querySelectorAll("li")
      );
      const topThree = bestsellersCategory.slice(0, 3);
      console.log(topThree);
      const items = topThree.map((item, index) => {
        const linkImg = item.querySelector("img").getAttribute("src");
        const linkProduct =
          "https://www.amazon.com.br" +
          item.querySelector("a").getAttribute("href");
        const description = item.innerText.split("\n");
        const name = description[1];
        const rating = description[2];
        const numberEvaluations = description[3];
        const price = description[4];
        return {
          position: index + 1,
          name,
          rating,
          numberEvaluations,
          price,
          linkImg,
          linkProduct,
        };
      });
      const bestsellers = { category, items };
      return bestsellers;
    });
  });

  browser.close();
  console.log(result);
  return Responses._200({ ID: date, bestSellers: result });
};
