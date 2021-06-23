# JWT Auth template project

Template of a client-server web app with pre-implemented JWT authorization and email activation links.

## Technologies & Libraries:
API: 
- Node.js 14.17.0
- Express 4.17.1
- MongoDB 3.6.9

## Setup

#### Installation
From the project root directory:
```sh
cd server
npm ci
```
Now, lets set up the config files.
#### Config files
1 In the **server** subfolder there is a file named .env.example - copy it to .env
```sh
cp .env.example .env
```
2 and fill it with your variables (see .env.example for details).