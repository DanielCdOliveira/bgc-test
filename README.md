<div align="center"><img style = "max-width:400px;"src="https://blog.bgcbrasil.com.br/wp-content/uploads/2022/03/1_Logo_bgc-2.png"></img></div>
<hr>
<h2 align=center>BGC Brasil technical test</h2>
<h3 align=center> Serveless back-end development Project</h3>
<hr>
<h4 align=left>

# A web scrapper API

## Important:

This application is a web scraper that saves the best selling products on the page https://www.amazon.com.br/bestsellers. For this, a cron was configured that triggers the web scrapper at 4:00 am UTC. For the first use it is necessary to change the cron time in the serverless.yaml file:

```
functions:
  cronScrapAmazon:
    handler: lambdas/schedulesTasks/cronScrapAmazon.handler
    events:
      - schedule: cron(MM HH * * ? *)
```

Just modify the hour (from 0 to 23) and minute(from 0 to 59) to a time close to deploy wait for the trigger and then if you prefer you can return it to the standard time

<hr>

<p align="center">
   <img src="https://img.shields.io/badge/author-Daniel Oliveira-4dae71?style=flat-square" />
</p>

## :computer: Technologies and Concepts

- REST API
- Node.js
- Puppeteer
- chrome-aws-lambda
- Serverless Framework
- AWS Lambda
- AWS API Gateway
- AWS Cron
- AWS DynamoDB

---

## :rocket: Routes

- ### AWS CRON

For this, a cron was configured that triggers the web scrapper at 4:00 am UTC.

```yml
GET /bestSellers/{date}
    - Route to get list of bestseller on the date
    - headers: {}
    - body:{}
```

---

## 🏁 Running the application

- ### Make sure you have the latest stable version of [Node.js](https://nodejs.org/en/download/) and [npm](https://www.npmjs.com/) running locally.

- ### Make sure you have AWS Credentials configured for Serveless Framework, if it is not configured, you can check how to do it [here](https://www.serverless.com/framework/docs/providers/aws/guide/credentials/#:~:text=Login%20to%20your%20AWS%20account,access%20by%20clicking%20the%20checkbox.)

<br>

First, clone this repository on your machine:

```
git clone https://github.com/DanielCdOliveira/bgc-test
```

Run the following command to install the dependencies.

```
npm install
```

Once the process is finished, deploy the application:

```
npm run deploy
```

When the process is finished you will receive in the terminal the link to access the route GET bestsellers/{date}
