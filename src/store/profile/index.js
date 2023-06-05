import StoreModule from "../module";

/**
 * Профиль пользователя
 */
class ProfileState extends StoreModule {

    /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      uName: '',
      uPhone: '',
      uEmail: '',
      waiting: false // признак ожидания загрузки
    }
  }

  async loadProfile(login, passw) {
    this.setState({
        uName: '',
        uPhone: '',
        uEmail: '',
        waiting: true
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
                this.setState({
                    ...this.getState(),
                    uName: result.result.user.profile.name,
                    uPhone: result.result.user.profile.phone,
                    uEmail: result.result.user.email,
                    waiting: false
                }, 'Загружен профиль из АПИ');
            }

            if (result.error) {
                this.setState({
                    ...this.getState(),
                    error: result.error.message,
                    waiting: false
                }, 'Ошибка профиля из АПИ');
            }
        })
    }
}

export default ProfileState;