class Contact extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
        <link rel="stylesheet" href="../css/content.css">
        <div class="dropdown">
            <button class="dropbtn">אנשי קשר</button>
        <div class="dropdown-content">
        </div>
        </div> 
        `;
        this.display();
    }
    display() {
        const userArr = JSON.parse(localStorage.getItem('userArr'));
        const container = this.shadowRoot.querySelector('.dropdown-content');
        userArr.forEach(user => {
            const link = document.createElement('a');
            link.textContent = user.email;
            container.appendChild(link);
        });
    }
}
customElements.define('contact-list', Contact);