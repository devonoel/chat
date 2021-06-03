# Chat App

## Dependencies
+ Ruby
+ Bundler
+ Node
+ Yarn
+ Postgres

## Getting Started
The app is split into two parts: `frontend` and `backend`. The `frontend` directory contains a React.js frontend, and the `backend` directory contains a Ruby on Rails backend.

### First Time Setup
Before running the app for the first time, you'll need to install dependencies and create the database.

For the `frontend`:
```
$ cd frontend && yarn install
```

For the `backend`:
```
$ cd backend && bundle install
$ bundle exec rails db:setup
```

### Running the App
To start both dev servers from the same command, you'll need a CLI for running a `Procfile`. Node Foreman can help us. From the project's root directory, run:
```
$ npx nf start
````
