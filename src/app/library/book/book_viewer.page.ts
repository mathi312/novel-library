import { Component, Injectable, OnInit } from "@angular/core";
import ePub, { Book } from "epubjs";
import { StorageService } from "../../services/storage.service";
import { Novel } from "../../models/novel";
import { ActivatedRoute, Router } from "@angular/router";
import { NovelsService } from "../../services/novels.service";
import { CommonModule } from "@angular/common";
import { initFlowbite } from "flowbite";

@Component({
  selector: "book",
  standalone: true,
  templateUrl: "./book_viewer.page.html",
  styleUrl: "../../../css/styles.css",
  imports: [CommonModule],
})
export class BookViewer implements OnInit {
  public book?: Book;
  public novel?: Novel;
  private title: string;
  public rendition?: any;
  public atEnd: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private storageService: StorageService,
    private novelsService: NovelsService,
  ) {
    this.title = this.route.snapshot.paramMap.get("title")!;
  }

  async ngOnInit() {
    initFlowbite();
    this.novel = (await this.novelsService.getNovelByTitle(
      this.title,
    )) as Novel;
    if (this.novel == undefined) {
      return;
    }
    const epub = await this.storageService.getEpub(this.novel.epubRef);

    this.book = ePub(epub);
    this.rendition = this.book.renderTo("epubArea", {
      flow: "scrolled-doc",
      width: "100%",
    });
    this.rendition.display();

    this.rendition.themes.default({
      body: {
        "background-color": "rgba(17, 24, 39, 1)",
        color: "white !important",
      },
      header: {
        color: "white !important",
      },
      "pg-footer": {
        color: "white !important",
      },
    });

    this.rendition.on("rendered", (section: any) => {
      const nextSection = section.next();

      if (nextSection) {
        const nextNav = this.book?.navigation.get(nextSection.href);

        const nextLabel = nextNav ? nextNav.label : "next";
        this.atEnd = false;
      } else {
        // No next section means we are at the last section
        this.atEnd = true;
      }
    });
  }

  onNext() {
    if (this.atEnd) return;
    this.rendition.next();
  }

  onPrevious() {
    if (this.rendition.location.atStart) return;
    this.rendition.prev();
  }
}
