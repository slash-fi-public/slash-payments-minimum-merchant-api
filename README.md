# slash-payments-minimum-merchant-api

For more information on the uses of this tool, see
https://slash-fi.gitbook.io/docs/integration-guide/quick-start

## API Architecture

API Gateway \* 1 -> Lambda \* 3

## Deploy APIs

Please make sure you have an environment where aws cdk can run and execute the following command

```
$ npm i
$ cdk bootstrap aws://[AccountId]/[RegionId]
$ cdk deploy
```

## Settings

- Check the generated url from the AWS CloudFormation console
- Enter the following values in each field of Slash.fi's merchant management app -> Settings -> Payment Setting and save
  - URL to receive Payment Result kickback from Slash Payment
    - /kickback
  - Payment success return URL
    - /success
  - Payment failure return URL
    - /failure
- Requests are output to CloudWatch Logs as Lambda logs

## Generate Payment URL

```
$ npx scripts/ts-node generate-payment-url.ts --help
```

## Clean up

```
$ cdk destroy
```
