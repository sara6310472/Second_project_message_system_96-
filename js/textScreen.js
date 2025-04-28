class TextScreen {
  constructor() {
    this.incomingMailContainer = document.querySelector('.incomingMail');
    this.outgoingMailContainer = document.querySelector('.outgoingMail');
    this.modalContent = document.getElementById('modalContent');
  }
  // פונקציה שעוברת על המערך ומדפיסה את כל ההודעות שנמצאות בו
  displayMessages() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser')).email;
    const { outgoingMail, incomingMail } = JSON.parse(localStorage.getItem(currentUser));

    const containers = {
      incomingMail: document.querySelector('.incomingMail'),
      outgoingMail: document.querySelector('.outgoingMail')
    };
    Object.entries(containers).forEach(([key, container]) => {
      container.replaceChildren();
      const messages = key === 'incomingMail' ? incomingMail : outgoingMail;
      let i = messages.length;
      if (i == 0) {
        const messageDiv = document.createElement('div');
        messageDiv.innerHTML = `
              <div class="noMassage">
               <h2>${key === 'incomingMail' ? `לא התקבלו הודעות` : `לא נשלחו הודעות`}</h2>
              </div>
            `;
        container.appendChild(messageDiv);
      } else {
        messages.slice().reverse().forEach(item => {
          const messageDiv = document.createElement('div');
          messageDiv.innerHTML = `
              <div class="${key === 'incomingMail' ? 'incomingMassage' : 'outgoingMassage'}">
                <p>${item.date}   ${item.hours}</p>
                <p>${key === 'outgoingMail' ? `ההודעה נשלחה ל: ${item.receiver}` : `ההודעה התקבלה מ: ${item.sender}`}</p>
                <p>תוכן ההודעה: ${item.message}</p>
                <p><lable id="trash${i}${key}" class="icon1">מחיקה<i class="fas fa-trash"></i></lable>
                <lable id="square${i}${key}" class="icon2">פתיחה<i class="fas fa-square"></i></lable>
                <lable id="redo${i--}${key}" class="icon3">העברה<i<i class="fa-solid fa-arrow-right"></i></lable></p>
              </div>
            `;
          container.appendChild(messageDiv);
        });
      }
    });
  }
  // פונקציה שמוצאת את הID שעליו נלחץ
  handleMessageActions(event) {
    let clickedElementId = event.target.id;
    let { firstWord, number, lastWord } = textScreen.parseString(clickedElementId);

    if (firstWord === 'trash') {
      if (confirm('האם אתה בטוח שברצונך למחוק את ההודעה?')) {
        let mailbox = lastWord === 'outgoingMail' ? window.user.outgoingMail : window.user.incomingMail;
        textScreen.removeMessageByIndex(number - 1, mailbox, lastWord);
        textScreen.displayMessages(number - 1);
      }
    } else if (firstWord === 'square') {
      document.getElementById("myModal").style.display = "block";
      document.getElementById("myModal").addEventListener('click', () => document.getElementById("myModal").style.display = "none");
      let mailbox = lastWord === 'outgoingMail' ? window.user.outgoingMail : window.user.incomingMail;
      textScreen.fillModalContent(number - 1, mailbox, lastWord);
    } else if (firstWord === 'redo') {
      let mailbox = lastWord === 'outgoingMail' ? window.user.outgoingMail : window.user.incomingMail;
      textScreen.fillInputWithMessage(number - 1, mailbox, lastWord);
    }
  }
  // פונקציה להסיר מהמערך את ההודעה
  removeMessageByIndex(index, messages, type) {
    if (index >= 0 && index < messages.length) {
      messages.splice(index, 1);
    }
    if (type == 'outgoingMail') {
      window.user.outgoingMail = messages;
    } else {
      window.user.incomingMail = messages;
    }
    let currentUser = JSON.parse(localStorage.getItem('currentUser')).email;
    localStorage.setItem(currentUser, JSON.stringify(window.user));
  }
  // פונקציה למציאת הדיב שעליו נלחץ ומפרקת אותו
  parseString(str) {
    const firstWords = ['square', 'redo', 'trash'];
    const lastWords = ['incomingMail', 'outgoingMail'];
    const firstWord = firstWords.find(word => str.startsWith(word));
    if (!firstWord) {
      return { firstWord: '', number: '', lastWord: '' };
    }
    const remainingStr = str.slice(firstWord.length);
    const numberMatch = remainingStr.match(/^\d+/);
    const number = numberMatch ? numberMatch[0] : '';
    const lastWord = remainingStr.slice(number.length);
    if (!lastWords.includes(lastWord)) {
      return { firstWord: '', number: '', lastWord: '' };
    }
    return { firstWord, number, lastWord };
  }
  // פונקציה שפותחת בגדול
  fillModalContent(index, array, key) {
    let modalContent = document.getElementById("modalContent");
    if (modalContent && index >= 0 && index < array.length) {
      modalContent.replaceChildren();
      const messageDiv = document.createElement('div');
      messageDiv.innerHTML = `
              <div class="divModel">
                <p>${array[index].date}   ${array[index].hours}</p>
                <p>${key === 'outgoingMail' ? `ההודעה נשלחה ל: ${array[index].receiver}` : `ההודעה התקבלה מ: ${array[index].sender}`}</p>
                <p>תוכן ההודעה: ${array[index].message}</p>
              </div>
            `;
      modalContent.appendChild(messageDiv);
    }
  }
  // פונקציה של העברה לתוך האיונפוט
  fillInputWithMessage(index, array, key) {
    const inputMassage = document.querySelector('.massage');
    if (inputMassage && index >= 0 && index < array.length) {
      if (key == 'incomingMail') {
        inputMassage.value = " ההודעה הועברה מ:  " + `${array[index].receiver}` + "תוכן ההודעה:" + `${array[index].message}`;
      } else {
        inputMassage.value = " ההודעה הועברה מ:  " + `${array[index].sender}` + "תוכן ההודעה:" + `${array[index].message}`;
      }
    }
  }
}