import { Component, OnInit } from "@angular/core";
import { initFlowbite } from "flowbite";

@Component({
  selector: "create-epub",
  templateUrl: "./create_epub.page.html",
  styleUrl: "../../css/styles.css",
})
export class CreateEpub implements OnInit {
  title = "create-epub";

  ngOnInit() {
    initFlowbite();
  }
}
