export class AuthService {
  private Authenticated = false;

  login() {
    this.Authenticated = true;
  }

  logOut() {
    this.Authenticated = false;
    window.localStorage.clear();
  }

  isLoggedIn(): boolean {
    return this.Authenticated;
  }
}
