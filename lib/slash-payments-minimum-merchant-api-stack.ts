import { Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import { aws_apigateway as apigateway } from "aws-cdk-lib";
import { aws_lambda_nodejs as lambda } from "aws-cdk-lib";
import { CfnOutput } from "aws-cdk-lib";

export class SlashPaymentsMinimumMerchantApiStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // Lambda - GET /success
    const getSuccessHandler = new lambda.NodejsFunction(
      this,
      "getSuccessHandler",
      {
        entry: "lambda/paymentResults.ts",
        handler: "getSuccessHandler",
      }
    );

    // Lambda - GET /success
    const getFailureHandler = new lambda.NodejsFunction(
      this,
      "getFailureHandler",
      {
        entry: "lambda/paymentResults.ts",
        handler: "getFailureHandler",
      }
    );

    // Lambda - POST /success
    const getKickbackHandler = new lambda.NodejsFunction(
      this,
      "getKickbackHandler",
      {
        entry: "lambda/paymentResults.ts",
        handler: "getKickbackHandler",
      }
    );

    // API Gateway - REST API
    const api = new apigateway.RestApi(this, "paymentResultAPI");

    // Lambda proxy integration
    const success = api.root.addResource("success");
    success.addMethod(
      "GET",
      new apigateway.LambdaIntegration(getSuccessHandler)
    );
    const failure = api.root.addResource("failure");
    failure.addMethod(
      "GET",
      new apigateway.LambdaIntegration(getFailureHandler)
    );
    const kickback = api.root.addResource("kickback");
    kickback.addMethod(
      "POST",
      new apigateway.LambdaIntegration(getKickbackHandler)
    );
  }
}
