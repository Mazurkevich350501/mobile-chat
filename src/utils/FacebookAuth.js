import { FBLoginManager } from 'react-native-facebook-login'

const FacebookAuth = {
  login(permissions) {
    return new Promise((resolve, reject) => {
      FBLoginManager.loginWithPermissions(
        permissions || ['email'], (error, data) => error ? reject(error) : resolve(data)
      )
    })
  },
  logout() {
    return new Promise((resolve, reject) => {
      FBLoginManager.logout((error, data) => error ? reject(error) : resolve(true))
    })
  }
}

export default FacebookAuth