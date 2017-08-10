# lambda-ch

[![Build Status](https://travis-ci.org/Negan1911/lambdaw.svg?branch=master)](https://travis-ci.org/Negan1911/lambdaw)

[![codecov](https://codecov.io/gh/Negan1911/lambdaw/branch/master/graph/badge.svg)](https://codecov.io/gh/Negan1911/lambdaw)

[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

This is what the AWS SDK should had, there is no point on manually creating
JSON object to pass through the callback when you can use a library that will
ensure that you know what are using (it has JSDoc) and is battle-tested.

## Install

Just run:

```bash
npm install --save lambdaw
```

And you could require it in those ways:

```js
const R = require('lambdaw/apigateway')
const { ApiGateway } = require('lambdaw')
```

## HTTP: API Gateway

You could use this helpers to handle HTTP Responses:

```js
const R = requrire('lambdaw/apigateway')

module.exports.helloWorld  = (event, context, callback) => {
  const response = new R()
    .Status(200)
    .WithCORS()
    .WithBody({
      message: 'Go Serverless v1.0! Your function executed successfully!',
      input: event
    })

    callback(null, response)
}
```

Isn't it beautiful?

## Lex

You could use to create the responses for your own bots:

```js
const L = requrire('lambdaw/lex')

module.exports.handler = (event, context, callback) => {
  const response = new L(event)
    .asClose(L.FULFILMENT_STATES.Fulfilled)
    .withMessage(L.MSG_CONTENT_TYPES.PlainText, 'Bye!')
    .end()

  callback(null, response)
}
```

## Developers

Planning to help with a feature? Fork and start a PR, just make sure to follow the common styleguides (use prettier, write on fluent API, write tests)....

You could run tests/generate coverage with:

```bash
npm t
```

And generate documentation with:

```bash
npm run doc
```