# Tribe recommendation system

## Summary
This application is a standalone _task based_ microservice providing REST HTTP endpoints.

## Challenge to be tackled
People may show interest in different topics, but even if they were asked, they might not be aware of the things they like
or the subjects they're interested in; So we're about to build an app to suggest users, the posts and topics that could be interesting to them.  
Whenever a post is created, this application will capture the corresponding webhook and will remember that the author likes this topic. 
We store this data in a local database. For now, we distinguish topics based on the tags attached to posts, but in future it would be awesome to perform some sort of analysis on post content to extract keywords and tags out of them. 
The other users who put a reply on the posts or react to these contents will be considered interested and eager to see similar posts as well. So by capturing `reply.added` and `reaction.added` webhooks, we query graphql endpoint and 
will find the corresponding post tags; Then we append this data to our local db.  
After a while, when the application learns about people's interest, it will be able to notify users about the new posts that might be interesting to them (sth as [Twitter](https://twitter.com/) recommendation system).  
So in a nutshell the purpose is to increase user engagement factor.

## Features Overview
* Fully isolated and dockerized application
* Avoiding compilation error with the power of [Typescript](https://www.typescriptlang.org/)
* Strong error handling
* Using PM2 advanced production process manager
* Secure endpoints by checking HTTP custom headers to block request forgeries

## Installation guide
Follow these steps to simply run the project.

### Clone the project
Clone this repository into your local machine using the following command:
```bash
git clone git@github.com:majidakbari/awesome-app.git
```

### Environment variables
There is a `.env.example` file in the project's root directory containing OS level environment variables used for deploying the whole application.
Every single variable inside the file has a default value (except for secrets), so you do not need to change them; But you can also override your own variables. First copy the example file to the `.env` file:
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


### Local deployment tip
The application purpose is to capture some webhooks from a remote address. In such a scenario your app needs to be hosted on a valid ip address on internet;
For local deployment/testing goals we can easily publish our app temporarily using [ngrok](https://ngrok.com/). Install the package on your local machine and run the following command in terminal:
```bash
ngrok http http://localhost:8080 
```
Then introduce the address in the output to your tribe console. Then easily you'll be able to capture Tribe webhooks in your local environment.

## Technical discussions (Images/Containers)
This project includes three docker containers:

`backend`
node:17.8.0  
`broker`
bitnami/rabbitmq  
`datastore`
postgres:alpine3.15

## Further suggestions
* Manage database connections pool in a better way.
* Using text analysis to extract tags out of posts contents.
* Add more tests and increase the code coverage.
* Using code quality tools like [Sonar](https://www.sonarqube.org/) to avoid having code smells and other development issues.
* Add a tool to manage structured logs for debugging purposes.

## Author
Majid Akbari [Linkedin](https://linkedin.com/in/majid-akbari)

## Licence
[MIT](https://choosealicense.com/licenses/mit/)