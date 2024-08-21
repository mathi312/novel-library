import { inject, Injectable } from "@angular/core";
import { Auth, getAuth, signInWithEmailAndPassword } from "@angular/fire/auth";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private auth: Auth = inject(Auth);

  private _isAuthenticatedSubject: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  public isAuthenticatedObs: Observable<boolean> =
    this._isAuthenticatedSubject.asObservable();

  isLoggedIn(): boolean {
    const userData =
      localStorage.getItem("userData") || sessionStorage.getItem("userData");
    if (userData) this._isAuthenticatedSubject.next(true);
    return userData !== null;
  }

  getUser(): any {
    const userData =
      localStorage.getItem("userData") || sessionStorage.getItem("userData");
    return userData ? JSON.parse(userData) : null;
  }

  logout() {
    localStorage.removeItem("userData");
    sessionStorage.removeItem("userData");
    this._isAuthenticatedSubject.next(false);
  }

  singInWithEmailAndPassword(email: string, password: string) {
    const a = signInWithEmailAndPassword(this.auth, email, password)
      .then((userCredentials) => {
        this._isAuthenticatedSubject.next(true);
        return userCredentials.user;
      })
      .catch((error) => {
        throw error;
      });
    return a;
  }
}
