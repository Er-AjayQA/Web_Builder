<!-- Remove Migration Of Specific Table: -->

npx sequelize-cli db:migrate:undo --name 200-create-users.js

<!-- Remove All Migrations: -->

npx sequelize-cli db:migrate:undo:all 

<!-- Run Migrations: -->

npx sequelize-cli db:migrate
