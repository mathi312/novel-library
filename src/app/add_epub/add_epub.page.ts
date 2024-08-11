import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { Validators } from "@angular/forms";
import { Novel } from "../models/novel";
import { CommonModule } from "@angular/common";
import { NovelsService } from "../services/novels.service";
import { StorageService } from "../services/storage.service";
import { initFlowbite } from "flowbite";

@Component({
  selector: "create-epub",
  standalone: true,
  templateUrl: "./add_epub.page.html",
  styleUrl: "../../css/styles.css",
  imports: [ReactiveFormsModule, CommonModule],
})
export class AddEpub implements OnInit {
  public file?: File;
  public success: Boolean = false;
  public error: any;
  public startUpload: Boolean = false;
  addEpubForm = new FormGroup({
    title: new FormControl(null, Validators.required),
    author: new FormControl(null),
    epub: new FormControl(null, Validators.required),
  });

  constructor(
    private novelsService: NovelsService,
    private storageService: StorageService,
  ) {}

  ngOnInit() {
    initFlowbite();
  }

  get title() {
    return this.addEpubForm.get("title");
  }

  get epub() {
    return this.addEpubForm.get("epub");
  }

  onFileChange(event: any) {
    this.file = event.target.files[0];
  }

  async onSubmit() {
    this.startUpload = false;
    this.success = false;
    this.error = undefined;

    if (!this.addEpubForm.valid) {
      this.addEpubForm.markAllAsTouched();
    } else {
      if (
        this.addEpubForm.value.title &&
        this.addEpubForm.value.epub &&
        this.file
      ) {
        this.startUpload = true;
        try {
          const path = await this.storageService.uploadEpub(this.file);
          if (path) {
            let novel = new Novel(
              this.addEpubForm.value.title,
              this.addEpubForm.value.author,
              path,
            );
            await this.novelsService.addNovel(novel);

            this.success = true;
            this.addEpubForm.reset();
            this.file = undefined;
          } else {
            throw new Error("Failed to upload file.");
          }
        } catch (error) {
          this.error = error || "An error occurred during the upload.";
        } finally {
          this.startUpload = false;

          // Reset success and error messages after 5 seconds
          setTimeout(() => {
            this.success = false;
            this.error = undefined;
          }, 5000);
        }
      } else {
        this.error = "Error while uploading file";

        setTimeout(() => {
          this.error = undefined;
        }, 5000);
      }
    }
  }
}
