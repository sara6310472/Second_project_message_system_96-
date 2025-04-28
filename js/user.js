class User {
    constructor(name, email, password, outgoingMail, incomingMail) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.outgoingMail = outgoingMail;
        this.incomingMail = incomingMail;
        this.cable = new Cable();
    }
}