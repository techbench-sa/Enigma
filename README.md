# Hackathon System


## Installation

Install [XAMPP](https://www.apachefriends.org/download.html).
 - DO NOT install the XAMPP-VM version (unless you know what you are doing)

run Apache Web Server and MySQL Database.

Download the project.

replace `htdocs` folder's content with our project.
- the folder should be named `htdocs`, keep this in mind.

## Usage

You can see the project now at `localhost`

To acces the database visit `localhost/phpmyadmin`, our database is 202db.

  
#### Creating a user
To create a new user, go to the database (202db), click on `players` table.

click `Insert` and a new page will show up with a form.

fill the `name` and `pass` feild and click `Go`, (click `Go` again).

Check the `id` of your new player (user) by clicking on `players` table located in the sidebar,

you need the id for logging in.

  
#### Creating new question
To create new question, go to `localhost/addQuestion.php`

In the main method you should print the score of the player,`System.out.println(10);`
You dont have to create the question in both languages (if you are testing).

## Things to do
- Make a proper authentication
- Add new languages
- A new design for the system
- Create a structure for writing questions (independent from any language syntax)


