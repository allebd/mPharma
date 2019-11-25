# mPharma

a RESTful API that allows the use of internationally recognized set of diagnosis codes

[![CircleCI](https://circleci.com/gh/allebd/mPharma.svg?style=svg)](https://circleci.com/gh/allebd/mPharma)
[![Reviewed by Hound](https://img.shields.io/badge/Reviewed_by-Hound-8E64B0.svg)](https://houndci.com)
[![Coverage Status](https://coveralls.io/repos/github/allebd/mPharma/badge.svg?branch=develop)](https://coveralls.io/github/allebd/mPharma?branch=develop)

## Table of Contents

* [About](#mpharma)
* [Required Features](#required-features)
* [Pivotal Tracker](#pivotal-tracker)
* [Heroku Deployment](#heroku-deployment)
* [Swagger Documentation](#swagger-documentation)
* [Technologies Used](#technologies-used)
* [Acknowledgements](#acknowledgements)
* [Author](#author)

## Required Features

* Create a new diagnosis code record
* Edit an existing diagnosis code record
* List diagnosis codes in batches of 20 (and paginate through the rest of the record)
* Retrieve diagnosis codes by ID
* Delete a diagnosis code by ID

## Pivotal Tracker

Pivotal Tracker Stories can found here [Pivotal Tracker](https://www.pivotaltracker.com/n/projects/2418608)

## Heroku Deployment

Application was deployed to Heroku. Use public URL [https://mpharma-allebd.herokuapp.com](https://mpharma-allebd.herokuapp.com) with API endpoints.

## Swagger Documentation

API Documentation was generated with [Swagger](https://mpharma-allebd.herokuapp.com/docs).

## Technologies Used

* [Node-js](https://nodejs.org/en/) Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine. Node.js uses an event-driven, non-blocking I/O model that makes it lightweight and efficient. Node.js package ecosystem, npm, is the largest ecosystem of open source libraries in the world.
* [PostgreSQL](https://www.postgresql.org/) used for setting up relational database
* [Sequelize](https://sequelize.org//) a Node.js ORM for Postgres
* [Babel](https://babeljs.io/) used for transpiling codes from ES6 to ES5
* [Mocha](https://mochajs.org/) used for setting up tests
* [Chai](https://www.chaijs.com/) an assertion library for node and the browser that can be delightfully paired with any javascript testing framework.
* [Docker](https://www.docker.com/) helps securely build, share and run modern applications anywhere

## Installations

### Getting started

* You need to have Git, Node, NPM and Docker installed on your computer.
* Installing [Node](node) automatically comes with npm.

### Clone

* Clone this project to your local machine `https://github.com/allebd/mpharma.git`
  > Run the command below

```shell
   git clone https://github.com/allebd/mpharma.git
```

### Setup

* Installing the project dependencies
  > Run the command below

```shell
   npm install
```

* Create a .env file similar to the .env.sample file

* Create your database
  > Run the command below

```shell
  npx sequelize db:create
```

* Add tables to database
  > Run the command below

```shell
  npm run db:ready
```

* Start your node server
  > Run the command below

```shell
  npm start
```

* Use `http://localhost:3000` as base url for endpoints

### Endpoints

| METHOD | DESCRIPTION                             | ENDPOINTS
| ------ | --------------------------------------- | -------------------------
| POST   | Create a new diagnosis code record      | `/api/v1/diagnosis`
| PATCH  | Edit an existing diagnosis code record  | `/api/v1/diagnosis/:diagnosisId`
| GET    | List diagnosis codes in batches of 20   | `/api/v1/diagnosis`
| GET    | Retrieve diagnosis codes by ID          | `/api/v1/diagnosis/:diagnosisId`
| DELETE | Delete a diagnosis code by ID           | `/api/v1/diagnosis/:diagnosisId`
| GET    | Get API Documentation                   | `/docs`

### Running Unit Test

* Run test for all endpoints
  > run the command below
  
```shell
  npm test
```

### Running Docker

* run docker
  > run the command below
  
```shell
  npm run docker:run
```

## Acknowledgements

* [mPharma](https://mpharma.com/)

## Author

[Bella Oyedele](https://github.com/allebd)
