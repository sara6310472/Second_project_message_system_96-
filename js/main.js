const textScreen = new TextScreen();
const client = new Client();
const page = new Page();
window.user = null;
let sound = true;
page.init();

const server = new Server();
const cable = new Cable();

// אורזת את ההודעה לחבילה
function createMessage() {
    var audio = new Audio('../audio/Message.aac');
    if (sound == true) {
        audio.play();
    }
    this.pckg;
    this.emailReceiver = document.querySelector('.nameGetting').value.toLowerCase();
    this.allReceivers = document.querySelector('.nameGetting').value.toLowerCase();
    this.arr = this.emailReceiver.split(' ');
    this.userEmail = (JSON.parse(localStorage.getItem('currentUser')).email);
    this.massage = document.querySelector('.massage').value;
    this.arr.forEach(item => {
        this.emailReceiver = item;
        if (JSON.parse(localStorage.getItem(this.emailReceiver))) {
            this.sender = window.user.email;
            this.pckg = new Package(this.sender, this.massage, this.emailReceiver);

            this.pckg.send(this.pckg, this.emailReceiver, 'incoming');
        } else {
            this.massage = " הכתובת  " + `${this.emailReceiver}` + " לא נמצאה 😭😭";
            this.receiver = window.user.email;
            this.pckg = new Package('server', this.massage, this.receiver);
            this.pckg.send(this.pckg, this.userEmail, 'incoming');
        }
    });
    if (this.pckg.sender != 'server') {
        this.pckg.receiver = this.allReceivers;
        this.pckg.send(this.pckg, this.userEmail, 'outgoing');
    }

    setTimeout(() => {
        if (this.pckg.sender == this.pckg.receiver) {
            document.querySelector('.animation1').style.display = 'block';
        }
        else if (this.pckg.sender == 'server') {
            document.querySelector('.animation2').style.display = 'block';
        }
        else if (this.pckg.sender != this.pckg.receiver) {
            document.querySelector('.animation3').style.display = 'block';
        }
    }, 300)
}