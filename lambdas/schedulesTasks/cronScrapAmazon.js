const chromium = require("chrome-aws-lambda");
const Responses = require("../commom/API_Responses.js");
const Dynamo = require("../commom/Dynamo.js");
const tableName = process.env.tableName;
module.exports.handler = async (event) => {
  // formatando data atual
  const dateNow = new Date().toLocaleDateString("en-US");
  const dateArray = dateNow.split("/");
  if (dateArray[0].length < 2) {
    dateArray[0] = "0" + dateArray[0];
  }
  if (dateArray[1].length < 2) {
    dateArray[1] = "0" + dateArray[1];
  }
  const date = dateArray.join("-");
  // configurando o puppeteer
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
  // scrapping dos dados do site da amazon
  const result = await page.$$eval(".a-begin", (nodes) => {
    return nodes.map((node) => {
      const categoryArray = node.querySelector("h2").innerText.split(" ");
      const category = categoryArray[categoryArray.length - 1];
      const detailCategory = node.querySelector("ol");
      const bestsellersCategory = Array.from(
        detailCategory.querySelectorAll("li")
      );
      const topThree = bestsellersCategory.slice(0, 3);
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
  // salvando no dynamo db
  const bestSellersDB = { ID: date, bestSellers: result };
  const newBestSellersDB = await Dynamo.write(bestSellersDB, tableName).catch(
    (err) => {
      console.log("Error in Dynamo write", err);
      return null;
    }
  );
  if (!newBestSellersDB) {
    return Responses._400({ message: "Failed to write bestsellers" });
  }
  return Responses._200(newBestSellersDB);
};
