**Technical Assessment**

Develop a task management backend application using Nest.js and TypeORM

**Required Endpoints**

<ul>
<li>[x] Create a new task</li>
<li>[x] Show all tasks (optional filter)</li>
<li>[x] Show all tasks of a given username</li>
<li>[ ] Change a task status between completed and pending</li>
<li>[ ] Update a task's details</li>
<li>[ ] Delete a task</li>
</ul>

**Additional Considerations**

<ul>
<li>[x] Tasks have to be stored persistently in a Database.</li>
<li>[x] Optional implementation of JWT.</li>
<li>[ ] Optional implementation of unit tests.</li>
</ul>

**Database EER Diagram**

![test](https://github.com/user-attachments/assets/2da15258-ca74-4f1b-9485-996e666a10a6)

**Installation**

1. Create a mysql database called "tasks"
2. Download the repository and unzip it inside a folder
3. Run `npm i` in the repository folder
4. Run `npm run migration:generate --name=migration1` to generate a migration from the project database schema to be run on the database server
5. Run `npm run migration:run` to run the migration and create the necessary tables on the database server.
6. Run `npm run start` to start the nest.js server

**Endpoints**

**1. Auth Controller**

- **1.1: auth/signup (POST)**
  Used to sign up new users, requires a `username` field and a `password` field, both strings.
  `username` has to be between 4 and 45 characters long.
  `password` has to be longer than 8 characters, shorter than 255.

- **1.2: auth/signin (POST)**
  Used to sign in a user, requires a `username` field and a `password` field, both strings.
  it returns a Json Web Token with a duration of _six hours_ used to access protected endpoints.

- **1.3: auth/me (GET) (PROTECTED)**
  Used to get the logged-in user data. Providing a JWT on the `Authorization header`, with the following header-value structure: `Authorization: Bearer [JWT]`.

**2. Tasks Controller**

- **2.1 tasks/find-tasks (GET) (PROTECTED)**
  Used to get a list of all the tasks stored in the database. Providing a JWT on the `Authorization header`, with the following header-value structure: `Authorization: Bearer [JWT]`.

- **2.2 tasks/find-tasks-by-username (POST) (PROTECTED)**
  Used to get a list of all the tasks related to a given `username`. Providing a JWT on the `Authorization header`, with the following header-value structure: `Authorization: Bearer [JWT]`. This endpoint will only return you the list of tasks of the username if the given JWT corresponds to the user being consulted.

- **2.3 tasks/create (POST) (PROTECTED)**
  Used to create a new task for the logged in user. requires a `title` field and a `description` field, both strings.
  `title` has to be between 4 and 45 characters.
  `description` has to be shorter than 501 characters.
