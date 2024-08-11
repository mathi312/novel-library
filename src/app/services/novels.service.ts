import { inject, Injectable } from "@angular/core";
import {
  Firestore,
  addDoc,
  collection,
  getDocs,
  getDoc,
  doc,
  query,
  where,
} from "@angular/fire/firestore";
import { Novel, novelConverter } from "../models/novel";

@Injectable({
  providedIn: "root",
})
export class NovelsService {
  private firestore: Firestore = inject(Firestore);

  async getNovels() {
    const novels: Novel[] = [];
    const querySnapshot = await getDocs(
      collection(this.firestore, "novels").withConverter(novelConverter),
    );
    querySnapshot.forEach((novel) => {
      novels.push(novel.data());
    });
    return novels;
  }

  async getNovelByTitle(title: string) {
    const novels: Novel[] = [];
    const q = query(
      collection(this.firestore, "novels"),
      where("title", "==", title),
    );
    const querySnapshot = await getDocs(q.withConverter(novelConverter));
    querySnapshot.forEach((novel) => {
      novels.push(novel.data());
    });
    return novels[0];
  }

  addNovel(novel: any) {
    return addDoc(
      collection(this.firestore, "novels"),
      Object.assign({}, novel),
    );
  }
}
