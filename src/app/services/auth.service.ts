import { inject, Injectable } from "@angular/core";
import { Auth, getAuth, signInWithEmailAndPassword } from "@angular/fire/auth";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private auth: Auth = inject(Auth);

  isLoggedIn(): boolean {
    const userData = localStorage.getItem("userData");
    return userData !== null;
  }

  getUser(): any {
    const userData = localStorage.getItem("userData");
    return userData ? JSON.parse(userData) : null;
  }

  logout() {
    localStorage.removeItem("userData");
    sessionStorage.removeItem("userData");
  }

  singInWithEmailAndPassword(email: string, password: string) {
    const a = signInWithEmailAndPassword(this.auth, email, password)
      .then((userCredentials) => {
        return userCredentials.user;
      })
      .catch((error) => {
        throw error;
      });
    return a;
  }
}
