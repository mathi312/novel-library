import { inject, Injectable } from "@angular/core";
import {
  Storage,
  ref,
  uploadBytes,
  getDownloadURL,
  getBlob,
} from "@angular/fire/storage";

@Injectable({
  providedIn: "root",
})
export class StorageService {
  private storage: Storage = inject(Storage);

  async uploadEpub(file: File) {
    if (!file) return;

    const epub: File = file;

    const storageRef = ref(this.storage, `epubs/${epub.name}`);

    await uploadBytes(storageRef, epub).then((snapshot) => {
      console.log("Uploaded a blob or file!");
    });
    return storageRef.fullPath;
  }

  getEpub(path: String) {
    const storageRef = ref(this.storage, `${path}`);
    return getDownloadURL(storageRef);
  }

  getLogInBackground() {
    const storageRef = ref(this.storage, `background/login.jpg`);
    return getDownloadURL(storageRef);
  }
}
