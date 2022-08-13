import { APIGatewayProxyHandler, APIGatewayProxyResult } from "aws-lambda";

/** GET /success */
export const getSuccessHandler: APIGatewayProxyHandler = async (event) => {
  console.log("event = " + JSON.stringify(event, undefined, 2));
  return createResponse("a payment settled successfully.");
};

/** GET /failure */
export const getFailureHandler: APIGatewayProxyHandler = async (event) => {
  console.log("event = " + JSON.stringify(event, undefined, 2));
  return createResponse("a payment failed.");
};

/** POST /kickback */
export const getKickbackHandler: APIGatewayProxyHandler = async (event) => {
  console.log("event = " + JSON.stringify(event, undefined, 2));
  return createResponse("received a kickback.");
};

/** レスポンスデータを生成する */
function createResponse(body: any): APIGatewayProxyResult {
  return {
    statusCode: 200,
    body: JSON.stringify(body),
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  };
}
