# Credentials-Manager
Credentials Manager App using MERN Stack

## Project

The main purpose for this project was Authentication with JWT as well as using the full MERN stack to create a Credential Management Application.
The application stores credentials for divisions inside an organization using MongoDB. In this App there are four main Organizations and in each Organization
there are divisions, each division has a list of credentials stored. The App itself has users that are given certain roles, Each Role has certain permissions
to access Organizations and division within these organizations.

## Contents

- [Installation](#install)

## Installation

Create a project folder on your local machine.

Using terminal or bash and navigate to the folder.

Clone repo from github.
`git clone https://github.com/MwViljoen/Credentials-Manager.git`

Once the project is cloned we have a back end(Server) using Express and a front end(client) using React.
`npm install` for both server and client.

create a .env in root folder with the followning variables.
`CONNECT_MONGO_DB=`(add connection to mongoDB database using password and username).
`JWT_KEY=`(Create a secret key for security).
`NODE_ENV=`(production or development) this is used for heroku.

Set up a database on Atlas according to models in Server code.

If and only if database is set up you can run the backend using `npm start`.

Open backend as a Project and type `npm start`.

Open frontend as a Project and type `npm start`.

Log in using User credentials set up in DB.
