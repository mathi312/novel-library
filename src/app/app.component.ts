import { CommonModule } from "@angular/common";
import { Component, Input, OnInit } from "@angular/core";
import { initFlowbite } from "flowbite";
import { StorageService } from "./services/storage.service";
import { FormsModule, ValidatorFn, Validators } from "@angular/forms";
import { ReactiveFormsModule, FormGroup, FormControl } from "@angular/forms";
import { AuthService } from "./services/auth.service";
import { Router } from "@angular/router";
import { RouterOutlet, RouterLink, RouterLinkActive } from "@angular/router";
import { User } from "@angular/fire/auth";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    FormsModule,
  ],
  templateUrl: "./app.component.html",
  styleUrl: "../css/styles.css",
})
export class AppComponent implements OnInit {
  title = "novel-library";
  public background: string = "";
  public user?: User;
  public error?: any;
  @Input()
  public remember: boolean = false;
  loginForm = new FormGroup({
    email: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required),
  });

  constructor(
    private storageService: StorageService,
    private auth: AuthService,
    private router: Router,
  ) {}

  async ngOnInit() {
    initFlowbite();
    this.background = await this.getBackground();
    if (this.auth.isLoggedIn()) {
      this.user = this.auth.getUser();
      this.router.navigate(["/library"]);
    }
  }

  get email() {
    return this.loginForm.get("email");
  }

  get password() {
    return this.loginForm.get("password");
  }

  initial() {
    if (this.user?.email) {
      return this.user?.email?.charAt(0);
    } else {
      return "";
    }
  }

  public async getBackground() {
    return await this.storageService.getLogInBackground();
  }

  onLogout() {
    if (this.user) {
      this.auth.logout();
      this.user = undefined;
      this.router.navigate([""]);
    }
  }

  async onSubmit() {
    this.error = null;

    if (!this.loginForm.valid) {
      this.loginForm.markAllAsTouched();
    } else {
      if (this.loginForm.value.email && this.loginForm.value.password) {
        try {
          this.user = await this.auth.singInWithEmailAndPassword(
            this.loginForm.value.email,
            this.loginForm.value.password,
          );
          if (this.user !== null) {
            if (this.remember) {
              localStorage.setItem("userData", JSON.stringify(this.user));
            }
            console.log(this.user);
            this.router.navigate(["/library"]);
          }
        } catch (error) {
          this.error = error;
        }
      }
    }
  }
}
