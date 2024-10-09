**Technical Assessment**

Develop a task management backend application using Nest.js and TypeORM

**Required Endpoints**

<ul>
<li>[x] Create a new task</li>
<li>[x] Show all tasks (optional filter)</li>
<li>[x] Show all tasks of a given username</li>
<li>[x] Change a task status between completed and pending</li>
<li>[x] Update a task's details</li>
<li>[x] Delete a task</li>
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
3. Rename the .env.example file to .env, and fill the needed environment variables
4. Run `npm i` in the repository folder
5. Run `npm run migration:generate --name=migration1` to generate a migration from the project database schema to be run on the database server
6. Run `npm run migration:run` to run the migration and create the necessary tables on the database server.
7. Run `npm run start` to start the nest.js server

**Endpoints**

**1. Auth Controller**

- **1.1: auth/signup**

  **Method**: POST

  **CURL**:

  ```
  curl -X POST http://localhost:3000/auth/signup -H "Content-Type: application/json" -d "{\"username\": \"<yourUsername>\", \"password\": \"<yourPassword>\"}"
  ```

  **Description**: Used to sign up new users, requires a `username` field and a `password` field, both strings.

  - `username` has to be between 4 and 45 characters long.
  - `password` has to be longer than 8 characters, shorter than 255.

- **1.2: auth/signin (POST)**
  **Method**: POST

  **CURL**:

  ```
  curl -X POST http://localhost:3000/auth/signin -H "Content-Type: application/json" -d "{\"username\": \"<yourUsername>\", \"password\": \"<yourPassword>\"}"
  ```

  **Description**: Used to sign in a user, requires a `username` field and a `password` field, both strings.

  Returns a Json Web Token with a duration of _six hours_ used to access protected endpoints.

- **1.3: auth/me (GET) (PROTECTED)**
  Used to get the logged-in user data. Providing a JWT on the `Authorization header`, with the following header-value structure: `Authorization: Bearer [JWT]`.

**2. Tasks Controller**

- **2.1 tasks/find-tasks (GET) (PROTECTED)**
  Used to get a list of all the tasks stored in the database. Providing a JWT on the `Authorization header`, with the following header-value structure: `Authorization: Bearer [JWT]`.

- **2.2 tasks/find-tasks-by-username (POST) (PROTECTED)**
  Used to get a list of all the tasks related to a given `username`. Providing a JWT on the `Authorization header`, with the following header-value structure: `Authorization: Bearer [JWT]`. This endpoint will only return you the list of tasks of the username if the given JWT corresponds to the user being consulted.

- **2.3 tasks/create (POST) (PROTECTED)**
  Used to create a new task for the logged in user. Providing a JWT on the `Authorization header`, with the following header-value structure: `Authorization: Bearer [JWT]`. requires a `title` field and a `description` field, both strings
  `title` has to be between 4 and 45 characters.
  `description` has to be shorter than 501 characters.

- **2.4 tasks/delete (POST) (PROTECTED)**
  Used to delete a task. Providing a JWT on the `Authorization header`, with the following header-value structure: `Authorization: Bearer [JWT]`. requires an `id` field, corresponding to the task ID. This endpoint will only allow you to delete the selected task if the selected task belongs to the user id of the given JWT.

- **2.5 tasks/change-status (POST) (PROTECTED)**
  Used to change the status of a task, changing between "Completada" and "Pendiente". Providing a JWT on the `Authorization header`, with the following header-value structure: `Authorization: Bearer [JWT]`. requires an `id` field, corresponding to the task ID. This endpoint will only allow you to edit the selected task if the selected task belongs to the user id of the given JWT.

- **2.6 tasks/update (POST) (PROTECTED)**
  Used to edit the title and description of a task. Providing a JWT on the `Authorization header`, with the following header-value structure: `Authorization: Bearer [JWT]`. requires an `id`, `title`, and `description` fields. This endpoint will only allow you to edit the selected task if the selected task belongs to the user id of the given JWT.
