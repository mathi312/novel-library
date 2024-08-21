import { CommonModule } from "@angular/common";
import { Component, Input, OnInit } from "@angular/core";
import { initFlowbite } from "flowbite";
import { StorageService } from "../services/storage.service";
import { FormsModule, ValidatorFn, Validators } from "@angular/forms";
import { ReactiveFormsModule, FormGroup, FormControl } from "@angular/forms";
import { AuthService } from "../services/auth.service";
import { Router } from "@angular/router";
import { RouterOutlet, RouterLink, RouterLinkActive } from "@angular/router";
import { User } from "@angular/fire/auth";

@Component({
  selector: "login",
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    FormsModule,
  ],
  templateUrl: "./login.page.html",
  styleUrl: "../../css/styles.css",
})
export class Login implements OnInit {
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
  }

  get email() {
    return this.loginForm.get("email");
  }

  get password() {
    return this.loginForm.get("password");
  }

  public async getBackground() {
    return await this.storageService.getLogInBackground();
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
            } else {
              sessionStorage.setItem("userData", JSON.stringify(this.user));
            }
            this.router.navigate([""]);
          }
        } catch (error) {
          this.error = error;
        }
      }
    }
  }
}
