import { Routes } from "@angular/router";
import { Library } from "./library/library.page";
import { CreateEpub } from "./create_epub/create_epub.page";
import { AddEpub } from "./add_epub/add_epub.page";
import { BookViewer } from "./library/book/book_viewer.page";
import { AppComponent } from "./app.component";
import { Login } from "./login/login.page";
import { authGuard } from "./services/auth_guard.service";

export const routes: Routes = [
  {
    path: "",
    redirectTo: "library",
    pathMatch: "full",
  },
  { path: "library", component: Library, canActivate: [authGuard] },
  { path: "create-epub", component: CreateEpub, canActivate: [authGuard] },
  { path: "add-epub", component: AddEpub, canActivate: [authGuard] },
  { path: "library/:title", component: BookViewer, canActivate: [authGuard] },
  { path: "login", component: Login },
  { path: "*", component: AppComponent },
];
