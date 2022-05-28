export class Auth {
  static login(accessToken: string, client: string, uid: string): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('accessToken', accessToken)
      localStorage.setItem('client', client)
      localStorage.setItem('uid', uid)
    }
  }

  static isLoggedIn(): boolean {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('accessToken') !== null,
             localStorage.getItem('client') !== null,
             localStorage.getItem('uid') !== null
    } else {
      return false
    }
  }
  static logout(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('accessToken')
      localStorage.removeItem('client')
      localStorage.removeItem('uid')
    }
  }

  static getToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('accessToken'),
             localStorage.getItem('client'),
             localStorage.getItem('uid')
    }
    return null
  }
}