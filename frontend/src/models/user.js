
export default class User {
    constructor( firstName, lastName, username, email, emailOrUsername, password, avatar, aboutMe ) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.username = username;
        this.email = email;
        this.emailOrUsername = emailOrUsername;
        this.password = password;
        this.avatar = avatar;
        this.aboutMe = aboutMe;
    }
}