# yandex-dialogs-sdk-mongodb
[![npm version](https://badge.fury.io/js/yandex-dialogs-sdk-mongodb.svg)](https://badge.fury.io/js/yandex-dialogs-sdk-mongodb)


Makes your session persistent by saving it into a MongoDB.
This middleware uses **mongodb** database

Middleware for [yandex-dialogs-sdk](https://github.com/fletcherist/yandex-dialogs-sdk)

# Installation

`npm i yandex-dialogs-sdk-mongodb --save`    
`yarn add yandex-dialogs-sdk-mongodb`

# Usage

```js
const { Alice } = require('yandex-dialogs-sdk');
const mongoDB = require('yandex-dialogs-sdk-mongodb');

const alice = new Alice();
// Now user session becomes persistent
// Sync with file databse.json
alice.use(mongoDB.middleware(url, database, user, password));

alice.any(ctx => {
    const counter = ctx.session.get('counter') || 0;
    ctx.session.set('counter', counter + 1);
    return Reply.text(`count: ${counter + 1}`);
});
alice.listen(8080);
```
