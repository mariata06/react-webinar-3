import StoreModule from "../module";

/**
 * Авторизация пользователя
 */
class LoginState extends StoreModule {

  initState() {
    return {
      login: '',
      password: '',
      uName: '',
      uPhone: '',
      uEmail: '',
    }
  }

  // async loginUser() {
  //   await fetch('/api/v1/users/sign',
  //     {
  //     method: 'POST',
  //     headers: {
  //         "Content-Type": "application/json",
  //         // "X-token": "fa57a7348079cd27f06260b99881e6d2b2fee56cff8e212a2cc2e89e0234243",
  //     },
  //     body: JSON.stringify({
  //             // "login": "test_1",
  //             // "password": "123456",
  //             "login": this.state.login,
  //             "password": this.state.password,
  //             "remember": true
  //         }),
        
  //   }).then(response => response.json())
  //   .then(result => {
  //       console.log(result);
  //       if (result.result) {
  //           console.log(result.result.token);
  //           console.log(result.result.user.email);
  //           console.log(result.result.user.profile.name);
  //           console.log(result.result.user.profile.phone);
  //       }
  //       if (result.error) console.log(result.error.message);
  //   })
  // }
}

export default LoginState;
