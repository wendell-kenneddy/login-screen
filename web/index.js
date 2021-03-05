const toggleToast = (message) => {
  const toast = document.querySelector('div.toast')
  toast.firstElementChild.innerHTML = message
  toast.classList.toggle('hide')
}

const Storage = {
  get() {
    return JSON.parse(localStorage.getItem('user: signed')) || {
      signed: false,
      username: null,
      pwd: null
    }
  },

  set(item) {
    localStorage.setItem('user: signed', JSON.stringify(item))
  }
}

const User = Storage.get()

const Form = {
  username: document.querySelector('input#username'),
  pwd: document.querySelector('input#pwd'),

  getUserData() {
    return {
      username: this.username.value,
      pwd: this.pwd.value
    }
  },

  clearFields() {
    this.username.value = ''
    this.pwd.value = ''

    App.reload()
  },

  validateFields() {
    const { username, pwd } = this.getUserData()

    if (username.trim() == '' ||
      pwd.trim() == ''
    ) {
      throw new Error('Por favor, preencha todos os campos.')
    }
  },

  updateUser() {
    const { username, pwd } = this.getUserData()
    User.signed = true
    User.username = username
    User.pwd = pwd
  },

  submit(event) {
    event.preventDefault()

    try {
      this.validateFields()
      this.updateUser()
      this.clearFields()
    } catch (error) {
      toggleToast(error.message)
    }
  }
}

const logIn = {
  yourUsername: document.querySelector('input#your-username'),
  yourPwd: document.querySelector('input#your-pwd'),

  getData() {
    return {
      givenUsername: this.yourUsername.value,
      givenPwd: this.yourPwd.value
    }
  },

  validateUser() {
    const { givenUsername, givenPwd } = this.getData()

    if (givenUsername != User.username || givenPwd != User.pwd) {
      throw new Error('Login incorreto. Tente novamente')
    }
  },

  submitLogin(event) {
    event.preventDefault()

    try {
      this.validateUser()
      const loginForm = document.querySelector('form#login')
      const header = document.querySelector('header#page-header')

      header.firstElementChild.innerHTML = `Olá, ${User.username}`
      loginForm.classList.toggle('hide')
      header.classList.toggle('hide')
    } catch (error) {
      toggleToast(error.message)
    }
  }
}

const App = {
  init() {
    Storage.set(User)

    const loginForm = document.querySelector('form#login')
    const userDataForm = document.querySelector('form#user-data')

    if (User.signed == true) {
      userDataForm.classList.toggle('hide')
      loginForm.classList.toggle('hide')
    }
  },

  reload() {
    this.init()
  }
}

App.init()
