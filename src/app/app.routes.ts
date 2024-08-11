import { Routes } from "@angular/router";
import { Library } from "./library/library.page";
import { CreateEpub } from "./create_epub/create_epub.page";
import { AddEpub } from "./add_epub/add_epub.page";
import { BookViewer } from "./library/book/book_viewer.page";
import { AppComponent } from "./app.component";

export const routes: Routes = [
  { path: "", component: AppComponent },
  { path: "library", component: Library },
  { path: "create-epub", component: CreateEpub },
  { path: "add-epub", component: AddEpub },
  { path: "library/:title", component: BookViewer },
];
