import { CommonModule } from "@angular/common";
import {
  Component,
  Input,
  NgZone,
  OnChanges,
  OnInit,
  SimpleChange,
  SimpleChanges,
} from "@angular/core";
import { initFlowbite } from "flowbite";
import { StorageService } from "./services/storage.service";
import { FormsModule, ValidatorFn, Validators } from "@angular/forms";
import { ReactiveFormsModule, FormGroup, FormControl } from "@angular/forms";
import { AuthService } from "./services/auth.service";
import { Router } from "@angular/router";
import { RouterOutlet, RouterLink, RouterLinkActive } from "@angular/router";

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
  public error?: any;
  public isLoggedIn: boolean = false;

  constructor(
    private storageService: StorageService,
    private auth: AuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    if (this.auth.isLoggedIn()) {
      this.auth.isAuthenticatedObs.subscribe(
        (isAuth) => (this.isLoggedIn = isAuth),
      );
      this.router.navigate(["library"]);
    }
  }

  initial(): string {
    if (this.auth.isLoggedIn()) {
      return this.auth.getUser().email?.charAt(0);
    } else {
      return "";
    }
  }

  onLogout(): void {
    if (this.isLoggedIn) {
      this.auth.logout();
      this.router.navigate(["/login"]);
    }
  }
}
