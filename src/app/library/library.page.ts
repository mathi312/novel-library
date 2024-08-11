import { Component, OnInit } from "@angular/core";
import { Novel } from "../models/novel";
import { NovelsService } from "../services/novels.service";
import { NgFor } from "@angular/common";

import { RouterLink, RouterLinkActive, RouterOutlet } from "@angular/router";
import { initFlowbite } from "flowbite";

@Component({
  selector: "library",
  standalone: true,
  templateUrl: "./library.page.html",
  styleUrl: "../../css/styles.css",
  imports: [NgFor, RouterLink, RouterLinkActive, RouterOutlet],
})
export class Library implements OnInit {
  public novelsList: Novel[] = [];

  constructor(private novelsService: NovelsService) {}

  async ngOnInit() {
    initFlowbite();
    this.novelsList = await this.novelsService.getNovels();
  }
}
