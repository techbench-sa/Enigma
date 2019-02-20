<!-- markdownlint-disable MD001 MD014 -->

# Hackathon System

**Hackathon System** _(Temporary name)_ is an automated system to upload, compile and judge players submissions of programming problems. Currently, it's supporting Java and Python for solving problems.

## Setting up the database

We are using postgres for storing data.

### (For Mac OS Users)

- First install [Homebrew](https://brew.sh/)
- Now install and configure Postgres using Homebrew

```bash
$ brew install postgres
$ brew services start postgres
$ psql -d postgres -f "/path/to/seed.sql"
```

you'll find `seed.sql` file inside the project's folder.

### (For Windows Users)

We are not sure how to setup the database on windows.

## Installing and setting up the project

- Install and Setup [Nodejs](http://nodejs.org)
- Go to the `hackathon-system` folder in terminal and execute these commands:

```bash
$ npm install
$ npm run build
$ npm start
```

## Usage

You can see the project now at http://localhost:3000

**Use these credentials:**

- username: "admin"
- password: "hadi"

## Things to do

- Make a proper authentication
- Add new languages
- Improve the new design
- Make it mobile-friendly!
- sanitize and validate players submissions
- ~~Design database structure~~
- ~~Start using ESLint~~
- ~~Add form validations~~
- ~~Connect frontend with backend~~
- ~~A new design for the system~~
- ~~Create a structure for writing questions (independent from any language syntax)~~
