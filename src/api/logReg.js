import axios from 'axios'

export function login(username, password) {
  return axios({
    method: 'get',
    url: `${process.env.VUE_APP_BOOK_URL}/login/`,
    params: {
      username: username,
      password: password
    }
  })
}
