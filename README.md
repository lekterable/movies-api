# movies-api [![Build Status](https://travis-ci.org/lekterable/movies-api.svg?branch=master)](https://travis-ci.org/lekterable/movies-api)

movies-api is a basic movie database interacting with external API.

## Dependencies

- express - _great web framework for node_
- mongodb - _native mongodb node.js driver_
- request - _easy to use HTTP client_
- body-parser - _request body parsing middleware_

## DevDependencies

- jest - _javascript testing framework_
- supertest - _HTTP testing library_

## Getting Started

1. `git clone https://github.com/lekterable/netguru-movies.git` or download ZIP
2. Get your own API key from http://www.omdbapi.com/

### Setup environment

1. Download and install Node.Js
2. Download and install MongoDB
3. Run `mongod` to start MongoDB
4. Navigate to the root /netguru-movies directory and run `npm install` to install local dependencies listed in package.json
5. Run `API_KEY={YOUR API KEY} npm start` to start application

### Testing

1. Run `mongod` to start MongoDB
2. Run `API_KEY={YOUR API KEY} npm test`

## Documentation

### Routes

- GET `/movies`
  - Fetches an array of all movies already present in application database
  - (optional) `?title=` case sensitive parameter specifies title of the result
  - Response contains `{success:(boolean), message:(response array or error message)}`
- POST `/movies`
  - Fetches movie object from external `http://www.omdbapi.com/` api and saves it to the application database
  - (required) `title` case insensitive parameter spicifies title of movie object
  - No duplicates are saved to database, instead application updates object with the same `imdbID` property
  - Response contains `{success:(boolean), message:(response object or error message)}`
- GET `/comments`
  - Fetches an array of all comments already present in application database
  - (optional) `?movie_id=` parameter filters comments by database `_id` property of associated movie
  - Response contains `{success:(boolean), message:(response array or error message)}`
- POST `/comments`
  - Allows to add a comment to a specified movie
  - (required) `movie_id` parameter specifies the movie object to which the comment will be added
  - (required) `body` parameter specifies the content of comment added
  - Response contains `{success:(boolean), message:(response object or error message)}`
