class Cable {
    constructor() {
        this.cableBusy = false;
    }
    // פונקציה שמעבירה את החבילה מהשולח לשרת
    sendMessage(message, receiver, type) {
        if (!this.cableBusy) {
            this.cableBusy = true;
            setTimeout(() => {
                const currentUser = JSON.parse(localStorage.getItem('currentUser')).email;
                if (type === 'outgoing') {
                    server.sendOutgoingMail(message, receiver);
                } else if (type === 'incoming') {
                    server.sendIncomingMail(message, receiver);
                }
            }, 300);
        }
        this.cableBusy = false;
    }
    // פונקציה שמעבירה את החבילה מהשרת לאחסון
    storeMessage(pckg, type, receiverEmail) {
        this.type = type;
        this.receiverEmail = pckg.receiver;
        const receiverData = JSON.parse(localStorage.getItem(receiverEmail));
        if (type === 'incoming') {
            receiverData.incomingMail.push(pckg);
        } else if (type === 'outgoing') {
            receiverData.outgoingMail.push(pckg);
        }
        window.user.incomingMail = receiverData.incomingMail;
        window.user.outgoingMail = receiverData.outgoingMail;
        localStorage.setItem(receiverEmail, JSON.stringify(receiverData));
        // הפונקציה שמציגה על המסך
        setTimeout(() => {
            textScreen.displayMessages();
        }, 4700);
    }
}