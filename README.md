<!-- markdownlint-disable MD001 MD014 -->

# Hackathon System
**Hackathon System** *(Temporary name)* is an automated system to upload, compile and judge players submissions of programming problems. Currently, it's supporting Java and Python for solving problems.

## Setting up the database
We are using postgres for storing data.
### (for MacOs users):
- First install [Homebrew](https://brew.sh/)
- Now install and configure Postgres using Homebrew
```bash
$ brew install postgres
$ brew services start postgres
$ psql postgres
$ CREATE ROLE admin WITH LOGIN PASSWORD 'admin';
$ ALTER ROLE admin CREATEDB;
$ \q
$ psql -d postgres -U admin
$ CREATE DATABASE hackathon;
$ \c hackathon
$ \i "/Full/path/to/seed.sql"
```
you`ll find `seed.sql` inside the project's folder.
### (for Windows Users):
We are not sure how to setup the database on windows.

## Installing and setting up the project
- Install and Setup [Nodejs](http://nodejs.org)
- Go to the hackathon-system folder in terminal and execute these commands:
```bash
$ npm install
$ npm run build
$ npm start
```

## Usage

You can see the project now at `localhost:3000`

**Use these credentials:**
username: "admin"
password: "hadi"

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
