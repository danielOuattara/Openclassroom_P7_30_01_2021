
/*
Define User model

To make code clear and easy to read, we define the User model first.
Under src/models folder, create user.js like this. */

export default class User {
  constructor( firstName, lastName, username, email, password, gender, age, department) {
    
    this.firstName  = firstName;
    this.lastName   = lastName;
    this.username   = username;
    this.email      = email;
    this.password   = password;
    this.gender     = gender;
    this.age        = age;
    this.department = department;   
  }
}




/*

Let’s continue with Authentication Components.
Instead of using axios or AuthService directly, these Components should work with Vuex Store:
– getting status with this.$store.state.auth
– making request by dispatching an action: this.$store.dispatch()

*/