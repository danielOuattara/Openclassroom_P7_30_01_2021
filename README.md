## Openclassroom_P7_30_01_2021

This is the last project from Openclassrooms training program: Web Developer.

The goal here is to built a full stack application for socializing amongst co-workers
in a firm.

### Backend
The backend use among others: NodeJS, Express, Sequelize, Multer.
I use sequelize to build a CRUD API. 
Nodemon is used for testing purpose 
### Database 
The Database is MySQL.
### Frontend 
The frontend is built with Vue2, VueX, Vue Router.

### How to run ?

#### Backend
- clone the project folder
- install MySQL SERVER  
- in <b>backend</b> folder copy <b>env.txt</b> file and save it as <b>.env</b> file
- fill this new file with your MySQL credentials. Only <b>your_user</b> and <b>your_password</b> need to be changed.

- open the terminal in the "backend" folder
- run <b> npm install </b> to install all dependencies
- run <b> sequelize db:create </b>
- run <b> nodemon server.js </b> : the database will synchronize and create all the tables.
- run <b> ctrl + s </b> to confirm synchronization
- run <b> sequelize seed: all </b> to seed default needed rows in some tables
- open server on : http://localhost:4200/
- done

#### Frontend

- go to <b/> frontend</b> folder
- run <b> npm install </b> to install all the dependencies
- run <b> npm run serve </b> to start vueJS devlopment server.
- done

### Questions ? 
email me : daniel.ouattara@gmx.com

### Notice:
Until now only the backend part of the project is completed. The frontend runs on jwt authentification and few authorizations only 
