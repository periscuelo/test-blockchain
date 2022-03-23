# test blockchain

## # Description
This API is responsible by create a simple block chain.

We use here some technologies like:
* [**NodeJs 16.13.2**](https://nodejs.org/en) with *ECMA 6*
* [**fastify**](https://www.fastify.io) [![NPM version](https://img.shields.io/npm/v/fastify.svg?style=flat)](https://www.npmjs.com/package/fastify)
* [**Jest (for e2e Tests)**](https://jestjs.io/) [![NPM version](https://badge.fury.io/js/jest.svg)](https://www.npmjs.com/package/jest)

## # Setup
Create on temp folder 3 files:
- chains.csv
- nextchain.txt
- nextnonce.txt

Create a local .env file base on example too.

You can use Thunder Client VSCode Extension to Test API.  
Just use the files on thunder folder to import and test  
the endpoint.

## # Commands
`$ npm run dev`  
`$ npm start`  
`$ npm run test`

Access this url on your browser: "http://localhost:3100"  
If returns the message "Welcome to API Block Chain" that's working perfectly!

## # Routes
`url` /chain  

`method` POST  

`params JSON`
```
{
    "hash": "0",
    "message": "Halo Mundo",
    "nonce": 5
}
```
## # Author
- Periscuelo - [E-mail](mailto:periscuelo@gmail.com)
