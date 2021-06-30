## Openclassroom_P7_30_01_2021

This is the last project from Openclassrooms training program: Web Developer.
The goal here is to built a full stack application for socializing amongst co-workers
in the firm Groupomania.

### Backend
The backend use among others: NodeJS, Express, Sequelize, Multer.
I use sequelize to interact with MySQL. Nodemon is used for testing purpose.
sequelize-cli needed.
### Database 
The Database is MySQL, as a project requirement
### Frontend 
The frontend is built with Vue2, VueX, Vue Router.

### How to run ?

#### Backend
- clone the project folder
- install MySQL Server + [ client ] , Community Edition is enough
- in <b>backend/</b> folder copy <b>env.txt</b> file and save it as <b>.env</b> file
- fill in this new file with your MySQL credentials. Only <b>your_user</b> and <b>your_password</b> need to be changed.
- open the terminal in the "backend" folder
- run <b> npm install </b> to install all dependencies
- run <b> npm i sequelize-cli -g </b>  to install sequelize-cli globally or use <b> npx sequelize-cli (command...command) </b> to execute commands whitout installing it
- run <b> sequelize db:create </b>
- execute: <b> node server.js</b> OR <b> nodemon server.js </b> (last is easier )
- from the root folder go to <b> backend/app.js </b>.
  At line 40, uncomment <b>{force: true}</b>, then <b>crtl+save</b>: Sequelize will force create & synchronize all the tables int the database. 
  After that, recomment it again.
- run <b> sequelize seed: all </b> to seed default needed rows in some tables
- open server on : http://localhost:4200/
- done

#### Frontend
- go to the <b/> frontend</b> folder
- run <b> npm install </b> to install all the dependencies
- run <b> npm run serve </b> to start vueJS development server.
- follow VueJS instructions on the terminal windows
- done

### Admin account creation in Frontend
- use  <b> 1_superRolePassword! </b> as authorization password

### Any question ? 
