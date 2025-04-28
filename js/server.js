class Server {
    // פונקציה שמעבירה לכבל את ההודעות היוצאות
    sendOutgoingMail(message, receiver) {
        cable.storeMessage(message, 'outgoing', receiver);
    }

    // פונקציה שמעבירה לכבל את ההודעות הנכנסות
    sendIncomingMail(message, receiver) {
        cable.storeMessage(message, 'incoming', receiver);
    }
}