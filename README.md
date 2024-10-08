_Technical Assessment_

Develop a task management backend application using Nest.js and TypeORM

_Required Endpoints_

[ ] Create a new task

[ ] Show all tasks (optional filter)

[ ] Change a task status between completed and pending

[ ] Update a task's details

[ ] Delete a task

_Additional Considerations_

[ ] Tasks have to be stored persistently in a Database.

[ ] Optional implementation of JWT.

[ ] Optional implementation of unit tests.

_Database EER Diagram_

![test](https://github.com/user-attachments/assets/2da15258-ca74-4f1b-9485-996e666a10a6)

_Installation_

1. Create a mysql database called "tasks"
2. Download the repository and unzip it inside a folder
3. Run `npm i` in the repository folder
4. Run `npm run migration:generate --name=migration1` to generate a migration from the project database schema to be run on the database server
5. Run `npm run migration:run` to run the migration and create the necessary tables on the database server.
6. Run `npm run start` to start the nest.js server
