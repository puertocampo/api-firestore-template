import { Firestore } from "@google-cloud/firestore";

const db = new Firestore({
  projectId: "quickiterate-sekoh-292312",
  keyFilename: "./quickiterate-sekoh-key.json"
});

export const firestoreCollection = (collectionName: string) => db.collection(collectionName);

// クエリが集約できるclientを利用する場合、以下を使用
// export class FirestoreConnection {
//   private collectionRef: FirebaseFirestore.CollectionReference;

//   constructor(collectionName: string) {
//     this.collectionRef = db.collection(collectionName);
//   }

//   async execute(field: string, operator: WhereFilterOp, value: any) {
//     return await this.collectionRef.where(field, operator, value).get();
//   }
// }
