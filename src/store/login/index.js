import StoreModule from "../module";

/**
 * Авторизация пользователя / сессия
 */
class LoginState extends StoreModule {

  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      login: '',
      password: '',
      token: '',
      uName: ''
    }
  }

  async setSession(login, passw) {
    this.setState({
      ...this.getState(),
      error: ''
    });

    await fetch('/api/v1/users/sign',
      {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
          "login": login,
          "password": passw,
          "remember": true
        }),
          
      }).then(response => response.json())
      .then(result => {
        if (result.result) {
          console.log('from setsession',result.result);
          this.setState({
            ...this.getState(),
            login: login,
            password: passw,
            token: result.result.token,
            uName: result.result.user.profile.name
          }, 'Загружен токен из АПИ');
        }

        if (result.error) {

          this.setState({
            ...this.getState(),
            error: result.error.data.issues[0].message
            // error: errMsg
            // error: result.error.message
          }, 'Ошбика логина из АПИ');

        }
      })
  }
}

export default LoginState;
