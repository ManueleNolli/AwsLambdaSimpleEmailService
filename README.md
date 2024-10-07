# AWS Lambda Email Service

This repository contains an AWS Lambda function that sends emails using Amazon Simple Email Service (SES) 📬

## Requirements

- AWS Account with SES configured

## Installation and Usage

To deploy the Lambda function, you will need to set up the AWS CDK. For detailed instructions, please refer to the [PersonalWebsiteAWS](https://github.com/ManueleNolli/PersonalWebsiteAws) repository.

## Folder Structure

```bash
index.ts # Lambda function code
services/
    ses.ts
```

## Deployment Overview

The Lambda function is designed to handle email sending requests using AWS SES. Make sure to configure your SES settings (e.g., verified email addresses) to avoid any delivery issues.

### Environment keys

Create a `.env` file like `.env.example` where is written the region of you AWS SES.

### AWS Services Used

- [AWS Lambda](https://aws.amazon.com/lambda/): Serverless compute service to run your code
- [Amazon SES](https://aws.amazon.com/ses/): Email sending service

### AWS CDK

For a complete overview of the AWS infrastructure used, including the email service setup, check out the [PersonalWebsiteAWS](https://github.com/ManueleNolli/PersonalWebsiteAws) repository.

## CI/CD

The CI/CD pipeline is implemented using GitHub Actions. The workflow is defined in the file [actions.yml](./.github/workflows/actions.yml).

The steps include:

1. **Tests**: Run unit tests for the Lambda function.
2. **Build**: Package the Lambda function and its dependencies.
3. **Deploy**: Deploy the function to AWS with dependencies in a layer. The code are pushed to an S3 bucket.

---

This project is a simple and efficient way to handle email communications in your applications. If you have any questions or suggestions, feel free to open an issue! 😊
