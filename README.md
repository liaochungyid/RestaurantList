# Restaurant List

> A backend demo repo

Use Node.js and express to demonstrate a Restaurant List web.
CRUD basic operations of persistent storage
RESTful routes design 
* MVC architecture (partial in progress)
* Login function (work in progress)

## Table of Contents

- [Features](#features)
- [Environment Setup](#environment-setup)
- [Usage](#usage)
- [Install](#install)
- [Acknowledgments](#acknowledgments)
- [See Also](#see-also)
- [Maintainers](#maintainers)
- [License](#license)

## Features

Sep. 9 21
* User can see all restaurants lists on home page.
* User can see more information by clicking the restaurant card.
* User can search name and category of restaurants.
* User can create a new restaurant on the list.
* User can update(edit) a restaurant.
* User can delete a restaurant on list.

## Environment Setup

1. Node.js v10.15.0
2. Other models please refer to package.json > dependencies

## Usage

Start at Locakhost:3000
```js
$ npm run start
```

Run for developing
```js
$ npm run dev
```

You might encounter an error like this
```js
$ // ReferenceError: TextEncoder is not defined
```
To fix this temporarilly, please modify file:
./node_modules/whatwg-url/dist/encoding.js
Adding the following
```js
$ "use strict";
$ let { TextEncoder, TextDecoder } = require("util"); // add this line
$ const utf8Encoder = new TextEncoder();
$ const utf8Decoder = new TextDecoder("utf-8", { ignoreBOM: true });
$ //...
```
## Install

Terminal clone
```
$ git clone https://github.com/liaochungyid/RestaurantList.git
```

## Acknowledgments

RestaurantList was inspired by [ALPHAcamp](https://tw.alphacamp.co/)

## See Also

None

## Maintainers

[CY Liao](https://github.com/liaochungyid)

## License

ISC

