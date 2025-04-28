class Page {
    constructor() {
        this.main = document.querySelector("main");
        this.homePage = document.querySelector(".homePage");
        this.mainPage = document.querySelector(".mainPage");
        this.registrationPage = document.querySelector(".registrationPage");
        this.loginPage = document.querySelector(".loginPage");
        this.thisPage = this.homePage.content.cloneNode(true);
        this.back = false;

        window.addEventListener("popstate", this.handlePopState);
    }

    init() {
        if (JSON.parse(localStorage.getItem('currentUser'))) {
            page.goToMainPage();
        } else {
            this.goToHomePage();
        }
    }

    goToPage(pageName, page) {
        this.pageName = pageName;
        this.page = page;
        while (this.main.firstChild) {
            this.main.removeChild(this.main.lastChild);
        }
        this.thisPage = page.content.cloneNode(true);
        this.main.append(this.thisPage);

        if (!this.back) {
            history.pushState({}, pageName, `#${pageName}`);
        }
        this.back = false;
    }

    goToHomePage() {
        page.goToPage("homePage", page.homePage);
        document.querySelector('.loginBtn').addEventListener('click', page.goToLoginPage)
        document.querySelector('.registrationBtn').addEventListener('click', page.goToRegistrationPage);
    }

    goToRegistrationPage() {
        page.goToPage("registrationPage", page.registrationPage);
        document.querySelector('.goToMainPage').addEventListener('click', page.registration);
        document.querySelector('.loginBtn').addEventListener('click', page.goToLoginPage);
        const checkbox = document.querySelector(".registrationPasswordCheckbox");
        checkbox.addEventListener("change", () => {
            const passwordInput = document.querySelector(".registrationPassword");
            page.togglePasswordVisibility(checkbox, passwordInput);
        });
    }

    goToLoginPage() {
        page.goToPage("loginPage", page.loginPage);
        document.querySelector('.newAccount').addEventListener('click', page.goToRegistrationPage);
        document.querySelector('.goToMainPage').addEventListener('click', page.login);

        const checkbox = document.querySelector(".loginPasswordCheckbox");
        checkbox.addEventListener("change", () => {
            const passwordInput = document.querySelector(".loginPassword");
            page.togglePasswordVisibility(checkbox, passwordInput);
        });
    }

    goToMainPage() {
        page.goToPage("mainPage", page.mainPage);
        let user = document.querySelector('.userName');
        if (JSON.parse(localStorage.getItem('currentUser'))) {
            let userNow = JSON.parse(localStorage.getItem('currentUser')).name;
            user.innerText = `${userNow}`;
        }

        if (!window.user) {
            const currentUser = JSON.parse(localStorage.getItem('currentUser'));
            const userData = JSON.parse(localStorage.getItem(currentUser.email));
            const { email, password, name, incomingMail, outgoingMail } = userData;
            window.user = new User(name, email, password, outgoingMail, incomingMail);
        }

        textScreen.displayMessages();
        document.querySelector('.sendBtn').addEventListener('click', createMessage);
        document.querySelector('.logOutBtn').addEventListener('click', page.logout);

        // const userArr = JSON.parse(localStorage.getItem('userArr'));
        // const container = document.querySelector('.dropdown-content');
        // userArr.forEach(user => {
        //     const link = document.createElement('a');
        //     link.textContent = user.email;
        //     container.appendChild(link);
        // });

        document.querySelector('.clickDiv').addEventListener('click', textScreen.handleMessageActions);

        let volumeIcon = document.querySelector('#volume');
        volumeIcon.addEventListener('click', () => {
            sound = !sound;
            if (sound) {
                volumeIcon.classList.remove('fa-volume-xmark');
                volumeIcon.classList.add('fa-volume-high');
            } else {
                volumeIcon.classList.remove('fa-volume-high');
                volumeIcon.classList.add('fa-volume-xmark');
            }
        });
    }

    logout() {
        localStorage.setItem('currentUser', null);
        location.reload();
        page.goToHomePage();
    }

    registration(e) {
        e.preventDefault();
        let userEmale = document.querySelector('.registrationEmail').value;
        let myUser = JSON.parse(localStorage.getItem(userEmale));
        if (myUser) {
            document.querySelector('.hideMassage').style.display = 'block';
        } else {
            let name = document.querySelector('.registrationName').value;
            let email = document.querySelector('.registrationEmail').value;
            let password = document.querySelector('.registrationPassword').value;

            let arr;
            let myArr = localStorage.getItem('userArr');
            if (!myArr) {
                arr = [];
            } else {
                arr = JSON.parse(localStorage.getItem('userArr'));
            }

            window.user = new User(name, email, password, [], []);
            localStorage.setItem(email, JSON.stringify(window.user));
            localStorage.setItem('currentUser', JSON.stringify(window.user));
            arr.push(window.user);
            localStorage.setItem('userArr', JSON.stringify(arr));
            page.goToMainPage();
        }
    }

    login(e) {
        e.preventDefault();
        let email = document.querySelector('.loginEmail').value;
        let password = document.querySelector('.loginPassword').value;
        let myUser = JSON.parse(localStorage.getItem(email));
        if (!myUser) {
            document.querySelector('.hideMassage').style.display = 'block';
        }
        else {
            let name = myUser.name;
            let incomingMail = myUser.incomingMail;
            let outgoingMail = myUser.outgoingMail;
            if (myUser.password !== password) {
                document.querySelector('.hideMassage').style.display = 'block';
            }
            else {
                window.user = new User(name, email, password, incomingMail, outgoingMail);
                localStorage.setItem('currentUser', JSON.stringify(window.user));
                page.goToMainPage();
            }
        }
    }

    togglePasswordVisibility(checkbox, passwordInput) {
        this.checkbox = checkbox;
        this.passwordInput = passwordInput;
        const currentType = passwordInput.getAttribute("type");
        if (checkbox.checked) {
            passwordInput.setAttribute("type", "text");
        } else {
            passwordInput.setAttribute("type", "password");
        }
    }

    handlePopState() {
        page.hash = location.hash.replace("#", '');
        page.back = true;
        switch (page.hash) {
            case "homePage":
                page.goToHomePage();
                break;
            case "registrationPage":
                page.goToRegistrationPage();
                break;
            case "loginPage":
                page.goToLoginPage();
                break;
            case "mainPage":
                page.goToMainPage();
                break;
        }
    }

}