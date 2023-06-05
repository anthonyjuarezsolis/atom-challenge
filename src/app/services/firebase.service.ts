import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { Model } from './model';

@Injectable({
  providedIn: 'root',
})
export class FirebaseCrudService {
  private dbPath = '/register';

  registersRef: AngularFirestoreCollection<Model>;

  constructor(private db: AngularFirestore) {
    this.registersRef = db.collection(this.dbPath);
  }

  getAll(): AngularFirestoreCollection<Model> {
    return this.registersRef;
  }

  create(model: Model): any {
    return this.registersRef.add({ ...model });
  }

  update(id: string, data: Model): Promise<void> {
    return this.registersRef.doc(id).update(data);
  }

  delete(id: string): Promise<void> {
    return this.registersRef.doc(id).delete();
  }
}
