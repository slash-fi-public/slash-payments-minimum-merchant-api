# AWS CDK for SlashPayments Minimum Merchant APIs 

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

![image](https://user-images.githubusercontent.com/1631778/184496854-f37d4163-9d55-42d6-bc5e-fc8e558ce677.png)

- Enter the following values in each field of Slash.fi's merchant management app -> Settings -> Payment Setting and save
  - URL to receive Payment Result kickback from Slash Payment
    - /kickback
  - Payment success return URL
    - /success
  - Payment failure return URL
    - /failure
    
![image](https://user-images.githubusercontent.com/1631778/184496786-7472b457-106e-4ecd-b2cf-e3aad3d63b87.png)
    
- Requests are output to CloudWatch Logs as Lambda logs

## Generate Payment URL

```
$ npx ts-node scripts/generate-payment-url.ts --help
```

## Clean up

```
$ cdk destroy
```
