# Hackathon System

Finally... the project is up to date.

## Prerequests

MySQL Database.

## Setup

Install [Nodejs](http://nodejs.org)

Import `hackathon_system.sql` to your database

Download the project or use this command:

```bash
$ git clone git@github.com:techbench-sa/hackathon-system.git
```

Open Terminal on the same directory of the project

```bash
$ npm install
$ npm run build
$ npm start
```

- Check the package.json for scripts.

## Usage

You can see the project now at `localhost:3000`

Use these credentials:

- username test
- password test

## Things to do

- ~~CLEAN THE PROJECT (to upload it to github)~~
- Make a proper authentication
- Add new languages
- Improve the new design
- Design database structure
- Make it mobile-friendly!
- ~~Start using ESLint correctly~~
- Add form validations (for creating new question a new user pages)
- sanitize and validate players submissions
- ~~Connect frontend with backend~~
- ~~A new design for the system~~
- ~~Create a structure for writing questions (independent from any language syntax)~~

1- Install [Homebrew](https://brew.sh/)
if you dont have it, paste the following line on the terminal
`bash $ /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"`
2- Install and Configure Postgres
`bash $ brew install postgres $ brew services start postgres $ psql postgres $ CREATE ROLE admin WITH LOGIN PASSWORD 'admin'; $ ALTER ROLE admin CREATEDB; $ \q $ psql -d postgres -U admin $ CREATE DATABASE hackathon; $ \c hackathon $ \i <path to seed.sql file in your machine>`

3- Go to the hackathon-system folder in terminal
`bash $ npm install $ npm run build $ npm start`
