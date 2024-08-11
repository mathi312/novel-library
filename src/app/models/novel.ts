import { QueryDocumentSnapshot } from "@angular/fire/firestore";

export class Novel {
    public title: string;
    public author: string | null | undefined;
    public epubRef: string;

    constructor(title: string, author: string | null | undefined, epubRef: string) {
        this.title = title;
        this.author = author;
        this.epubRef = epubRef;
    }
}

export const novelConverter = {
    toFirestore(novel: Novel) {
        return {title: novel.title, author: novel.author, epubRef: novel.epubRef};
    },
    fromFirestore: (snapshot: QueryDocumentSnapshot, options: any) => {
        const data = snapshot.data(options);
        return data as Novel;
    }
}