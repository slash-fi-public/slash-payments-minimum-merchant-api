import axios from "axios";
import * as yargs from "yargs";
import * as crypto from "crypto";

const argv = yargs
  .scriptName("generate-payment-url")
  .option("env", {
    alias: "environment",
    type: "string",
    describe: "testnet or mainnet",
    demandOption: false,
    default: "testnet",
  })
  .option("auth", {
    alias: "authentication_token",
    type: "string",
    describe:
      "Authentication Token can be obtained from the Merchant Management screen",
    demandOption: true,
    default: false,
  })
  .option("hash", {
    alias: "hash_token",
    type: "string",
    describe: "Hash Token can be obtained from the Merchant Management screen",
    demandOption: true,
    default: false,
  })
  .option("o", {
    type: "string",
    describe: "The value set by the merchant to uniquely identify the payment",
    demandOption: true,
    default: false,
    alias: "order_code",
  })
  .option("a", {
    type: "number",
    describe:
      "The amount to be charged by your deposit currency. It is Zero or more.If the payer determines the amount to be paid, this field can be null. So this field is optional.",
    demandOption: false,
    default: false,
    alias: "amount",
  })
  .option("theme", {
    type: "string",
    describe: "dark or light",
    demandOption: false,
    default: "dark",
    alias: "color_theme",
  })
  .option("callback", {
    type: "string",
    describe:
      "Custom Callback URL that will be called when the transaction’s status was changed",
    demandOption: false,
    default: false,
    alias: "callback_url",
  })
  .version(false)
  .wrap(null)
  .help()
  .parseSync();

const payment_request_url =
  `${argv.env}` === "mainnet"
    ? "https://slash.fi/api/v1/payment/receive"
    : "https://testnet.slash.fi/api/v1/payment/receive";
const authentication_token = `${argv.auth}`;
const hash_token = `${argv.hash}`;
const order_code = `${argv.o}`;
const amount = `${argv.a}` === "false" ? "" : `${argv.a}`;
const color_theme = `${argv.theme}`;
const callback_url = `${argv.callback}` === "false" ? "" : `${argv.callback}`;

const raw = order_code + "::" + amount + "::" + hash_token;

const hashHex = crypto.createHash("sha256").update(raw, "utf8").digest("hex");

let requestObj;
if (amount) {
  requestObj = {
    identification_token: authentication_token,
    order_code: order_code,
    verify_token: hashHex,
    amount: amount,
    color_theme: color_theme,
    callback_url: callback_url,
  };
} else {
  requestObj = {
    identification_token: authentication_token,
    order_code: order_code,
    verify_token: hashHex,
    // amount: amount,
    color_theme: color_theme,
    callback_url: callback_url,
  };
}

axios
  .post(payment_request_url, requestObj)
  .then((res) => {
    console.info(JSON.stringify(res.data, undefined, 2));
  })
  .catch((e) => {
    if (e.response !== undefined) {
      console.error(e.response.data.error);
    }
  });
