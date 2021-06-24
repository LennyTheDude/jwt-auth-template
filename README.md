# JWT Auth template project

Template of a client-server web app with pre-implemented JWT authorization and email activation links.

## Technologies & Libraries:
API:
- Node.js 14.17.0
- Express 4.17.1
- MongoDB 3.6.9

Client:
- React 17.0.2
- TypeScript 4.3.4

## Setup

#### Server
From the project root directory, execute the following commands:
```sh
cd server
npm ci
cp .env.example .env
```
Now, go to the newly-created **server/.env** file and fill it with your own environment variables (they will be explained in detail inside the file).

Note: you will have to set up a MongoDB database for the project to run - either locally or in the cloud, your choice.

After that, ```npm run dev``` will start the server in dev mode (using Nodemon).

#### Client

Again, from the project root directory, execute the following commands:
```sh
cd client
npm ci
```

And thats it, ```npm start``` will start the React server.
