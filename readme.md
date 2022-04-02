# Tribe awesome app

## Summary
This application is a standalone _task based_ micro service providing REST HTTP endpoints.

## Features Overview
* Fully isolated and dockerized application
* Avoiding compilation error with the power of [Typescript](https://www.typescriptlang.org/)
* Strong error handling
* Using PM2 advanced production process manager

## Installation guide
Follow these steps to simply run the project.

### Clone the project
Clone this repository into your local machine using the following command:
```bash
git clone git@github.com:majidakbari/awesome-app.git
```

### Environment variables
There is a `.env.example` file in the project's root directory containing OS level environment variables used for deploying the whole application.
Every single variable inside the file has a default value, so you do not need to change them; But you can also override your own variables. First copy the example file to the `.env` file:
```bash
cd /path-to-project
cp .env.example .env
```
Then open your favorite text editor like `vim` or `nano` and change the variables.

For example `APP_PORT` environment variable shows the project will run on the following port. You can change them to your desired values.

### Running containers
Open `Terminal` and type the following command:
```bash
docker-compose up -d 
```

### Running tests
Simply execute the following command in terminal:
```bash
docker-compose exec backend npm run test
```
It will run all the tests with code coverage.


## Technical discussions (Images/Containers)
This project includes just one docker container based on `node` base image.

`backend`
node:latest

## Author
Majid Akbari [Linkedin](https://linkedin.com/in/majid-akbari)

## Licence
[MIT](https://choosealicense.com/licenses/mit/)