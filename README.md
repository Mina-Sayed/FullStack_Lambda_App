# Serverless CRUD Application

This project is a serverless CRUD (Create, Read, Update, Delete) application built using AWS Lambda, API Gateway, and DynamoDB. It provides RESTful endpoints to manage items in a DynamoDB table named `rest_crud`.

## Table of Contents

- [Overview](#overview)
- [Prerequisites](#prerequisites)
- [DynamoDB](#DynamoDB)
- [API GATEWAYE ROUTES](#apigateway)


## Overview

The serverless application consists of a Lambda function written in Node.js, utilizing the AWS SDK for JavaScript. The function handles CRUD operations for a resource named `items` in a DynamoDB table. API Gateway is used to expose RESTful endpoints that trigger the Lambda function.

## Prerequisites

Before you begin, ensure you have the following:

- AWS account with necessary permissions.
- Node.js installed on your local machine.
- AWS CLI installed and configured.

## Installation

1. Clone the repository to your local machine.

   ```bash
   git clone git@github.com:Mina-Sayed/FullStack_Lambda_App.git
   ```
   
 ## DynamoDB
 
 - Table Name Items 
 ---

## API GATEWAYE ROUTES
---
- item (GET)
- (PUT)
- item {id} (DELETE)
- (GET)
---

## TEST API 

``` bash
https://osngtnzzlc.execute-api.us-east-1.amazonaws.com/dev/items
```

- Add Token 
```bash
https://lamb-demo.auth.us-east-1.amazoncognito.com/login?client_id=3mrr9e461ccd056ov9jupnj1kv&response_type=token&scope=email+openid+phone&redirect_uri=https%3A%2F%2Fexample.com%2Fcallback
```
- You Can Access as a user from this link and this redirct you in example.com to take a token and access to endpoints 

