<!-- markdownlint-disable MD001 MD014 -->

# Hackathon System

## Setup

1- Install [Nodejs](http://nodejs.org)

2- Install [Homebrew](https://brew.sh/)

3- Clone the project

4- Install and Configure Postgres using Homebrew

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
$ \i "Put the path to seed.sql from the project folder in your machine"
```

5- Go to the hackathon-system folder in terminal

```bash
$ npm install
$ npm run build
$ npm start
```

## Usage

You can see the project now at `localhost:3000`

Use these credentials:

- username "admin"
- password "hadi"

## Things to do

- ~~CLEAN THE PROJECT (to upload it to github)~~
- Make a proper authentication
- Add new languages
- Improve the new design
- Design database structure
- Make it mobile-friendly!
- ~~Start using ESLint~~
- Add form validations (for creating new question a new user pages)
- sanitize and validate players submissions
- ~~Connect frontend with backend~~
- ~~A new design for the system~~
- ~~Create a structure for writing questions (independent from any language syntax)~~
