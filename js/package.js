class Package {
    constructor(sender, message, receiver) {
        this.sender = sender;
        this.message = message;
        this.receiver = receiver;
        this.date = new Date().toLocaleDateString();
        this.hours = new Date().toLocaleTimeString();
    }
    // פונקציה שמעבירה את החבילה לכבל
    send(pckg, email, type) {
        window.user.cable.sendMessage(pckg, email, type);
    }
}