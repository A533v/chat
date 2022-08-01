"use strict"

async function main(dataStr, id) { //Раздел(обязательно), 
    let widthScreen = document.documentElement.clientWidth
    let hightScreen = document.documentElement.clientHeight
    let loginned = await checkCookie()
    dataStr = (loginned == false && dataStr != 'login' && dataStr != 'registration') ? 'login' : dataStr
    let content = document.querySelector('content')
    content.style.height = hightScreen - 80 + 'px'
    content.style.width = (widthScreen > 700) ? 700 + 'px' : 100 + '%'
    content.style.left = (widthScreen > 700) ? 'calc(' + 50 + '%' + ' - ' + 350 + 'px' + ')' : 0 + '%'
    content.innerHTML = ''
    genHeader(dataStr)
    genFooterNav()
    switch (dataStr) {
        case 'login':
        case 'registration':
            genLogin(dataStr)
            break
        case 'contacts':
            let dataContacts = await loadContacts()
            dataContacts.forEach(function(value) {
                genCard(dataStr, value)
            })
            break
        case 'chats':
            let buttonNewChat = document.createElement('button')
            buttonNewChat.className = 'button__new-chat'
            buttonNewChat.innerHTML = 'Создать общий чат'
            buttonNewChat.setAttribute('onclick', "addChat()")
            content.append(buttonNewChat)
            let dataChats = await loadChats()
            dataChats.forEach(function(value) {
                genCard(dataStr, value, loginned)
            })
            break
        case 'search':
            let inputSearch = document.querySelector('.header__search')
            let dataSend = inputSearch.value
            let dataSearch = await loadSearch(dataSend)
            dataSearch.forEach(function(value) {
                genCard(dataStr, value, loginned)
            })
            break
        case 'openchat':
            let dataOpenChat = await loadChatHead(id)
            dataOpenChat.forEach(function(value) {
                genOpenedChat(value)
            })
            let dataMessage = await loadMessageNow(id)
            dataMessage.forEach(function(value) {
                genMessage(value, 'new', loginned)
            })
            break
        case 'settingschat':
            let dataSettingsChat = await loadChatHead(id)
            //dataSettingsChat.forEach(function(value) {
                genSettingsChat(/*value*/)
            //})
            break
        case 'settings':
            let dataSettings = await loadSettings()
            dataSettings.forEach(function(value) {
                genSettings(value)
            })
            break
        default:
            break
    }
}

function genHeader(dataStr) { // Генерирует шапку раздела в блоке Header (Иконка, Название, Поиск.).
    let headerIcon = document.querySelector('.header__icon')
    headerIcon.style.backgroundSize = 'cover'
    let headerName = document.querySelector('.header__name')
    let headerSearch = document.querySelector('.header__search')
    headerSearch.placeholder = '🔍'
    switch (dataStr) {
        case 'login':
            headerIcon.style.backgroundImage = 'url('+ 'img/userd.png' +')'
            headerName.innerHTML = 'Вход в LAMPmessager'
            headerName.style.color = 'MediumPurple'
            headerName.style.textShadow = '0px 0px 25px BlueViolet'
            headerSearch.style.left = 100 + 'px'
            break
        case 'registration':
            headerIcon.style.backgroundImage = 'url('+ 'img/userd.png' +')'
            headerName.innerHTML = 'Регистрация в LAMPmessager'
            headerName.style.color = 'LightSalmon'
            headerName.style.textShadow = '0px 0px 25px Coral'
            headerSearch.style.left = 100 + 'px'
            break
        case 'contacts':
            headerIcon.style.backgroundImage = 'url('+ 'img/contacts.png' +')'
            headerName.innerHTML = 'Контакты'
            headerName.style.color = 'DodgerBlue'
            headerName.style.textShadow = '0px 0px 25px DodgerBlue'
            headerSearch.style.left = 100 + 'px'
            break  
        case 'chats': 
        case 'openchat':
        case 'settingschat':
            headerIcon.style.backgroundImage = 'url('+ 'img/chats.png' +')'
            headerName.innerHTML = 'Сообщения'
            headerName.style.color = 'Moccasin'
            headerName.style.textShadow = '0px 0px 25px Yellow'
            headerSearch.style.left = 100 + 'px'
            break  
        case 'search': 
            headerIcon.style.backgroundImage = 'url('+ 'img/search.png' +')'
            headerName.innerHTML = 'Поиск'
            headerName.style.color = 'SpringGreen'
            headerName.style.textShadow = '0px 0px 25px Lime'
            headerSearch.style.left = 0 + 'px'
            headerSearch.setAttribute('oninput'," main('search')")
            break  
        case 'settings': 
            headerIcon.style.backgroundImage = 'url('+ 'img/settings.png' +')'
            headerName.innerHTML = 'Настройки'
            headerName.style.color = 'Salmon'
            headerName.style.textShadow = '0px 0px 25px Red'
            headerSearch.style.left = 100 + 'px'
            break 
        default:
            headerIcon.style.backgroundImage = 'url(' + 'img/error.png' + ')'
            headerName.innerHTML = 'Ошибка/Error'
            headerName.style.color = 'lightsalmon'
            headerName.style.textShadow = '0px 0px 25px coral'
            headerSearch.style.left = 100 + 'px'
            break 
    }
}
function genFooterNav() { // Генерирует кнопки навигации в блоке Footer.
    let footerNavigation = [
        { name: 'contacts', icon: 'img/contacts.png', runame: 'Контакты', },
        { name: 'chats', icon: 'img/chats.png', runame: 'Сообщения', },
        { name: 'search', icon: 'img/search.png', runame: 'Поиск', },
        { name: 'settings', icon: 'img/settings.png', runame: 'Настройки', }, ]
    let footer = document.querySelector('footer')
    footer.innerHTML = ''
    footerNavigation.forEach(function(value) {
        let footerNav = document.createElement('div')
        footerNav.className = 'nav-button'
        footerNav.setAttribute('onclick', "main('" + value.name + "')")
        footer.append(footerNav)
        let footerNavIcon = document.createElement('div')
        footerNavIcon.className = 'nav-button__icon'
        footerNavIcon.style.backgroundImage = 'url('+ value.icon +')'
        footerNavIcon.style.backgroundSize = 'cover'
        footerNav.append(footerNavIcon)
        let footerNavAlert = document.createElement('div')
        footerNavAlert.className = 'nav-button__alert'
        footerNavAlert.innerHTML = '1'
        footerNav.append(footerNavAlert)
    })
}
function genCard(dataStr, dataCard, loginned) { // Генерирует однотипные карточки в разделах контакты, чаты, поиск юзеров.
    let content = document.querySelector('content')
    let card = document.createElement('div')
    card.className = 'card-' + dataStr
    content.append(card)
    let cardImage = document.createElement('div')
    cardImage.className = 'card-' + dataStr + '__image'
    card.append(cardImage)
    let cardInfo = document.createElement('div')
    cardInfo.className = 'card-' + dataStr + '__info'
    card.append(cardInfo)
    let cardInfoA = document.createElement('div')
    cardInfoA.className = 'card-' + dataStr + '__info-a'
    cardInfo.append(cardInfoA)
    let cardInfoB = document.createElement('div')
    cardInfoB.className = 'card-' + dataStr + '__info-b'
    cardInfo.append(cardInfoB)
    let cardSetList = document.createElement('div')
    cardSetList.className = 'set-list'
    card.append(cardSetList)
    switch (dataStr) {
        case 'contacts':
            cardImage.style.backgroundImage = (dataCard.avatar == null) ? 'url(' + 'img/userd.png' + ')' : 'url(' + dataCard.avatar + ')'
            cardInfoA.innerHTML = dataCard.login
            cardInfoB.innerHTML = dataCard.name
            let openChat = document.createElement('div')
            openChat.innerHTML = 'Чат с ' + dataCard.login
            openChat.setAttribute('onclick', "main('openchat', " + dataCard.idchat + ")")
            cardSetList.append(openChat)
            let deleteContact = document.createElement('div')
            deleteContact.innerHTML = 'Удалить ' + dataCard.login
            deleteContact.setAttribute('onclick', "deleteContact(" + dataCard.idcontact + ")")
            cardSetList.append(deleteContact)
            break
        case 'chats':
            card.setAttribute('onclick', "main('openchat', "+dataCard.IDchat+")")
            let urlImage = (dataCard.privatech == '1') ? dataCard.avatar : dataCard.avatarchat
            urlImage = (urlImage == null) ? 'img/userd.png' : urlImage
            cardImage.style.backgroundImage = 'url('+ urlImage +')'
            cardInfoA.innerHTML = (dataCard.privatech == '1') ? dataCard.login : dataCard.namechat
            cardInfoB.innerHTML = dataCard.auth + ': ' + dataCard.m1TXT
            let classMsgs = (dataCard.m1Auth == loginned) ? 'iMsg' : 'nMsg'
            cardInfoB.classList.add(classMsgs)
            let deleteChat = document.createElement('div')
            deleteChat.innerHTML = 'Удалить ' + dataCard.login
            deleteChat.setAttribute('onclick', "sendDeleteContact(" + dataCard.idcontact + ")")
            cardSetList.append(deleteChat)
            break
        case 'search':
            cardImage.style.backgroundImage = (dataCard.avatar == null) ? 'url(' + 'img/userd.png' + ')' : 'url(' + dataCard.avatar + ')'
            cardInfoA.innerHTML = dataCard.login
            cardInfoB.innerHTML = (dataCard.incontacts == null) ? 'Добавть в контакты?' : dataCard.name
            if (dataCard.incontacts == null) {
                let addContacts = document.createElement('div')
                addContacts.innerHTML = 'Добавить, ' + dataCard.login + ', в контакты'
                addContacts.setAttribute('onclick', "sendAddContacts(" + dataCard.id + ", '" + dataCard.login + "')")
                cardSetList.append(addContacts)
            }else{    
                let openChat = document.createElement('div')
                openChat.innerHTML = 'Чат с ' + dataCard.login
                openChat.setAttribute('onclick', "main('openchat', " + dataCard.idchat + ")")
                cardSetList.append(openChat)
                let deleteContact = document.createElement('div')
                deleteContact.innerHTML = 'Удалить ' + dataCard.login
                deleteContact.setAttribute('onclick', "sendDeleteContact(" + dataCard.idcontact + ")")
                cardSetList.append(deleteContact)
            }
        break
    }
}
function genOpenedChat(dataChat) { // Генерирует окно открытого чата.
    let content = document.querySelector('content')
    let chatHeader = document.createElement('div')
    chatHeader.className = 'chat-header'
    content.append(chatHeader)
    let chatImage = document.createElement('div')
    chatImage.className = 'chat-header__image'
    let urlImage = (dataChat.privatech == '1') ? dataChat.avatar : dataChat.avatarchat
    urlImage = (urlImage == null) ? 'img/userd.png' : urlImage
    chatImage.style.backgroundImage = 'url('+ urlImage +')'
    chatHeader.append(chatImage)
    let chatInfo = document.createElement('div')
    chatInfo.className = 'chat-header__info'
    chatHeader.append(chatInfo)
    let chatInfoA = document.createElement('div')
    chatInfoA.className = 'chat-header__info-a'
    chatInfoA.innerHTML = (dataChat.privatech == '1') ? dataChat.login : dataChat.namechat
    chatInfo.append(chatInfoA)
    let cardInfoB = document.createElement('div')
    cardInfoB.className = 'chat-header__info-b'
    cardInfoB.innerHTML = (dataChat.privatech == '1') ? 'Приватный чат.' : 'Участники: ' + dataChat.logins + '.'
    chatInfo.append(cardInfoB)
    if (dataChat.privatech != '1') {
        let chatSetList = document.createElement('div')
        chatSetList.className = 'set-list'
        chatHeader.append(chatSetList)
        let settingsChat = document.createElement('div')
        settingsChat.innerHTML = 'Настройки чата'
        settingsChat.setAttribute('onclick', "main('settingschat', '" + dataChat.id + "')")
        chatSetList.append(settingsChat)
    }

    let chatBody = document.createElement('div')
    chatBody.className = 'chat-body'
    content.append(chatBody)

    let chatInput = document.createElement('div')
    chatInput.className = 'chat-input'
    content.append(chatInput)
    let textArea = document.createElement('textarea')
    textArea.placeholder = 'Текст сообщения...' 
    textArea.className = 'chat-input__area-input'
    chatInput.append(textArea)
    let chatBtn = document.createElement('button')
    chatBtn.className = 'chat-input__button'
    chatBtn.setAttribute('onclick','sendMessage('+dataChat.id+')')
    chatBtn.innerHTML = 'Отправить'
    chatInput.append(chatBtn)
}
function genMessage(data, position, loginned) { // Генерирует сообщения в открытый чат.
    let hightScreen = document.documentElement.clientHeight
    let chatBody = document.querySelector('.chat-body')
    chatBody.style.height = hightScreen - 378 + 'px'
    let messageBlock = document.createElement('div')
    messageBlock.className = 'message'
    let classMsgs = (loginned == data.idauthor) ? 'iMsg' : 'nMsg'
    messageBlock.classList.add(classMsgs)
    let messageText = document.createElement('div')
    messageText.className = 'message__text'
    messageText.innerHTML = data.login + ': ' + data.text
    let messageAvatar = document.createElement('div')
    messageAvatar.className = 'message__avatar'
    let imgUrl = (data.avatar == null) ? 'img/userd.png' : data.avatar
    messageAvatar.style.backgroundImage = 'url('+ imgUrl +')'

    if (data.iduser == data.idauthor) {
        messageBlock.append(messageText)
        messageBlock.append(messageAvatar)
    }else{
        messageBlock.append(messageAvatar)
        messageBlock.append(messageText) 
    }
    if (position == 'old') {
        chatBody.prepend(messageBlock)
    }else{
        chatBody.append(messageBlock)
    }
}
function genSettings(dataSettings) {
    let content = document.querySelector('content')
    
    let lebelLogout = document.createElement('label')
    lebelLogout.innerHTML = 'Выйти из аккаунта'
    content.append(lebelLogout)
    let buttonLogout = document.createElement('button')
    buttonLogout.className = 'settings-button__logout'
    buttonLogout.innerHTML = 'Выйти'
    buttonLogout.setAttribute('onclick', 'logout()')
    content.append(buttonLogout)

    let lebelAvatar = document.createElement('label')
    lebelAvatar.innerHTML = 'Изменить аватарку'
    content.append(lebelAvatar)
    let previewAvatar = document.createElement('div')
    previewAvatar.className = 'settings-preview__avatar'
    previewAvatar.style.backgroundImage = (dataSettings.avatar == null || dataSettings.avatar == '') ? 'url(' + 'img/userd.png' + ')' : 'url(' + dataSettings.avatar + ')'
    content.append(previewAvatar)
    let inputAvatar = document.createElement('input')
    inputAvatar.className = 'settings-input__avatar'
    inputAvatar.type = 'file'
    content.append(inputAvatar)
    let buttonAvatar = document.createElement('button')
    buttonAvatar.className = 'settings-button__avatar'
    buttonAvatar.innerHTML = 'Сохранить аватарку'
    buttonAvatar.setAttribute('onclick', "saveAvatar()")
    content.append(buttonAvatar)

    let lebelName = document.createElement('label')
    lebelName.innerHTML = 'Изменить имя'
    content.append(lebelName)
    let inputName = document.createElement('input')
    inputName.className = 'settings-input__name'
    inputName.value = dataSettings.name
    content.append(inputName)
    let buttonName = document.createElement('button')
    buttonName.className = 'settings-button__name'
    buttonName.innerHTML = 'Сохранить имя'
    buttonName.setAttribute('onclick', "saveName('" + dataSettings.name + "')")
    content.append(buttonName)

    let lebelPassword = document.createElement('label')
    lebelPassword.innerHTML = 'Изменить пароль'
    content.append(lebelPassword)
    let inputPassword1 = document.createElement('input')
    inputPassword1.className = 'settings-input__password-1'
    content.append(inputPassword1)
    let inputPassword2 = document.createElement('input')
    inputPassword2.className = 'settings-input__password-2'
    content.append(inputPassword2)
    let buttonPassword = document.createElement('button')
    buttonPassword.className = 'settings-button__password'
    buttonPassword.innerHTML = 'Сохранить пароль'
    buttonPassword.setAttribute('onclick', "savePassword()")
    content.append(buttonPassword)
}
function genSettingsChat(idChat) {
    let content = document.querySelector('content')
    let lebelAvatar = document.createElement('label')
    lebelAvatar.innerHTML = 'Изменить аватарку чата'
    content.append(lebelAvatar)
    let previewAvatar = document.createElement('div')
    previewAvatar.className = 'settings-chat__avatar'
    content.append(previewAvatar)
    let inputAvatar = document.createElement('input')
    inputAvatar.type = 'file'
    content.append(inputAvatar)
    let buttonAvatar = document.createElement('button')
    buttonAvatar.className = 'settings-button__avatar'
    buttonAvatar.innerHTML = 'Сохранить аватарку'
    content.append(buttonAvatar)

    let lebelChat = document.createElement('label')
    lebelChat.innerHTML = 'Изменить название чата'
    content.append(lebelChat)
    let inputChat = document.createElement('input')
    content.append(inputChat)
    let buttonChat = document.createElement('button')
    buttonChat.className = 'settings-chat__button'
    buttonChat.innerHTML = 'Сохранить название'
    content.append(buttonChat)
    
    let lebelUsers = document.createElement('label')
    lebelUsers.innerHTML = 'Добавить пользователей (User1, User2)'
    content.append(lebelUsers)
    let inputUsers = document.createElement('input')
    content.append(inputUsers)
    let buttonUsers = document.createElement('button')
    buttonUsers.className = 'settings-users__button'
    buttonUsers.innerHTML = 'Добавить в чат'
    content.append(buttonUsers)

    let buttonExit = document.createElement('button')
    buttonExit.className = 'settings-button__logout'
    buttonExit.innerHTML = 'Выйти'
    content.append(buttonExit)
}
function genLogin(dataStr) { // Генерирует форму входа или регистрации.
    let content = document.querySelector('content')
    content.innerHTML = ''
    let footer = document.querySelector('footer')
    footer.innerHTML = ''
    let inputLogin = document.createElement('input')
    inputLogin.className = 'input__login'
    inputLogin.placeholder = 'Введите LoG1_N'
    content.append(inputLogin)
    let inputPass = document.createElement('input')
    inputPass.className = 'input__password'
    inputPass.type = 'password'
    inputPass.placeholder = 'Введите Pa55worD'
    content.append(inputPass)
    let buttonLogin = document.createElement('button')
    buttonLogin.className = 'button__login'
    buttonLogin.innerHTML = (dataStr = 'login') ? 'Вход' : 'Регистрация'
    content.append(buttonLogin)
    let formLink = document.createElement('a')
    formLink.innerHTML = (dataStr = 'login') ? 'Нет аккаунта?' : 'Уже есть аккаунт?'
    footer.append(formLink)
    switch (dataStr) {
        case 'login':
            buttonLogin.setAttribute('onclick', "login('login')")
            formLink.setAttribute('onclick', "main('registration')")
            break
        case 'registration':
            buttonLogin.setAttribute('onclick', "login('regis')")
            formLink.setAttribute('onclick', "main('login')")
            break     
    }
}


async function loadContacts() { // Возвращает список контактов пользователя.
    let response = await fetch('php/contacts-load.php', { 
        method: 'POST' 
    })
    return response = await response.json()
}
async function addContact(idUser, loginUser) {
    let formData = new FormData
    formData.append('iduser', idUser)
    let response = await fetch('php/contact-add.php', { 
        method: 'POST',
        body: formData
    })
    response = await response.json()
    alert(loginUser + ', добавлен в список контактов!')
    main('search')
}
async function deleteContact(idContact) {
    let formData = new FormData
    formData.append('idcontact', idContact)
    let response = await fetch('php/contact-delete.php', { 
        method: 'POST',
        body: formData
    })
    response = await response.json()
    main('contacts')
    alert(response['0'].login + ', удален из списка контактов!')

}
async function loadChats() { // Возвращает все чаты пользователя.
    let response = await fetch('php/chats-load.php', { 
        method: 'POST' 
    })
    return response = await response.json()
}
async function loadChatHead(idChat) {
    let formData = new FormData
    formData.append('chatid', idChat)
    let response = await fetch('php/chat-head-load.php', { 
        method: 'POST',
        body: formData
    })
    return response = await response.json()
}
async function addChat() { // Возвращает список контактов пользователя.
    let response = await fetch('php/chat-add.php', { 
        method: 'POST' 
    })
    return response = await response.json()
}
async function loadMessageNew() { //Возвращает новые сообщения открытого чата.
    if (newMsg) {
        let formData = new FormData
        formData.append('msgid', newMsg)

        let response = await fetch('php/messages-new-load.php', { 
            method: 'POST',
            body: formData
        })
        return response = await response.json()
    }
}
async function loadMessageOld() { // Возвращает сообщения до первого сообщения в чате.
    let formData = new FormData
    formData.append('msgid', idMessage)

    let response = await fetch('php/messages-old-load.php', { 
        method: 'POST',
        body: formData
    })
    return response = await response.json()
}
async function loadMessageNow(idChat) { // Возвращает последние сообщения открываемого чата
    let formData = new FormData
    formData.append('chatid', idChat)

    let response = await fetch('php/messages-now-load.php', { 
        method: 'POST',
        body: formData
    })
    return response = await response.json()
}
async function sendMessage(idChat) { // Отправляет введенное сообщение.
    let textArea = document.querySelector('.chat-input__area-input')
    let textAreaVal = textArea.value
    textArea.value = ''
    let formData = new FormData
    formData.append('chatid', idChat)
    formData.append('text', textAreaVal)

    let response = await fetch('php/message-send.php', { 
        method: 'POST',
        body: formData
    })
}
async function loadSearch(inputData) { // Возвращает пользователей по символам из строки поиска.
    let formData = new FormData;
    formData.append('input', inputData)
    let response = await fetch('php/search-load.php', {
        method: 'POST',
        body: formData
    })
    return response = await response.json()
}
async function loadSettings() {
    let response = await fetch('php/settings-load.php', { 
        method: 'POST' 
    })
    return response = await response.json()
}
async function saveAvatar() {
    let formData = new FormData
    let avatar = document.querySelector('.settings-input__avatar').files
    console.log(avatar)
    formData.append('img', avatar[0])
    console.log(formData)
    let response = await fetch('php/settings-reavatar.php', { 
        method: 'POST',
        body: formData
    })
    response = await response.json()
    alert('Аватар сохранен!')
    main('settings')
}
async function saveName(oldName) {
    let inputName = document.querySelector('.settings-input__name')
    let name = inputName.value
    let formData = new FormData
    if (/^[a-zA-Zа-яА-Я ]{2,31}$/.test(name)) {
        inputName.classList.add('success')
        formData.append('name', name)
        let response = await fetch('php/settings-rename.php', { 
            method: 'POST',
            body: formData
        })
        response = await response.json()
        let result = (response) ? ' ' : 'НЕ'
        alert('Имя' + result + 'изменено с <<' + oldName + '>> на <<' + name + '>>!')
        main('settings')
    }else{
        inputName.classList.add('error')
        alert('Имя не имя!')
    }
}
async function savePassword() {
    let inputPassword1 = document.querySelector('.settings-input__password-1')
    let inputPassword2 = document.querySelector('.settings-input__password-2')
    let password1 = inputPassword1.value
    let password2 =inputPassword2.value
    let formData = new FormData
    if (/^[a-zA-Z0-9]{0,21}$/.test(password1)) {
        inputPassword1.classList.add('success')
        if (/^[a-zA-Z0-9]{0,21}$/.test(password2)) {
            inputPassword2.classList.add('success')
            formData.append('password1', password1)
            formData.append('password2', password2)
            let response = await fetch('php/settings-repassword.php', { 
                method: 'POST',
                body: formData
            })
            response = await response.json()
            alert(response)
            main('settings')
        }else{ 
            inputPassword2.classList.add('error')
            alert('Старый пароль не соответвествует стандарту!') 
        }
    }else{ 
        inputPassword1.classList.add('success')
        alert('Новый пароль не соответвествует стандарту!') 
    }
}
async function saveAvatarChat() {
    let formData = new FormData
    let avatar = document.querySelector('.settings-input__avatar-chat').files
    console.log(avatar)
    formData.append('img', avatar[0])
    console.log(formData)
    let response = await fetch('php/chat-reavatar.php', { 
        method: 'POST',
        body: formData
    })
    response = await response.json()
    alert('Аватар сохранен!')
    main('settings')
}
async function saveName(oldName) {
    let inputName = document.querySelector('.settings-input__name')
    let name = inputName.value
    let formData = new FormData
    if (/^[a-zA-Zа-яА-Я ]{2,31}$/.test(name)) {
        inputName.classList.add('success')
        formData.append('name', name)
        let response = await fetch('php/settings-rename.php', { 
            method: 'POST',
            body: formData
        })
        response = await response.json()
        let result = (response) ? ' ' : 'НЕ'
        alert('Имя' + result + 'изменено с <<' + oldName + '>> на <<' + name + '>>!')
        main('settings')
    }else{
        inputName.classList.add('error')
        alert('Имя не имя!')
    }
}
async function login(type) { // Отправляет данные входа или регистрации.
    let data = new FormData()
    let inputLogin = document.querySelector('.input__login')
    let inputPass = document.querySelector('.input__password')
    let login = inputLogin.value
    let password = inputPass.value
    if (/^[a-zA-Z0-9_]{2,21}$/.test(login) && login != '') {
        inputLogin.classList.add('success')
        data.append('login', login)
        if (/^[a-zA-Z0-9]{0,21}$/.test(password)) {
            inputPass.classList.add('success')
            data.append('password', password)
            let url = (type == 'login') ? 'php/login.php' : 'php/registration.php'
            let response = await fetch(url, {
                method: 'POST',
                body: data
            })
            response = await response.json()
            alert(response)
            genFooterNav()
            main('chats')
        }else{
            inputPass.classList.add('error')
            alert('Пароль должен состоять из латинских символов и цифр!')
        }
    }else{
        inputLogin.classList.add('error')
        alert('Логин должен состоять из латинских символов, цифр и _! Не менее 2 символов и не более 21!')
    }
}
async function logout() {
    let response = await fetch('php/logout.php', { 
        method: 'POST' 
    })
    response = await response.json()
    alert(response)
    main('login')
}
async function checkCookie() { // Возвращает куки пользователя.
    let response = await fetch('php/check-cookie.php', {
        method: 'POST'
    })
    response = await response.json()
    return response
}