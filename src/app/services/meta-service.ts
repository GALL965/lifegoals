import { isPlatformBrowser } from '@angular/common';
import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { initializeApp, getApps } from 'firebase/app';
import {
  Firestore,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getFirestore,
  onSnapshot
} from 'firebase/firestore';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { Meta } from '../models/meta.model';

@Injectable({
  providedIn: 'root'
})
export class MetaService {

  private readonly platformId = inject(PLATFORM_ID);
  private readonly firestore: Firestore | null;

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      const firebaseApp = getApps().length
        ? getApps()[0]
        : initializeApp(environment.firebase);

      this.firestore = getFirestore(firebaseApp);
      return;
    }

    this.firestore = null;
  }

  getMetas(): Observable<Meta[]> {
    if (!this.firestore) {
      return of([]);
    }

    const metasRef = collection(
      this.firestore,
      'metas'
    );

    return new Observable<Meta[]>(subscriber => {
      const unsubscribe = onSnapshot(
        metasRef,
        snapshot => {
          subscriber.next(
            snapshot.docs.map(document => ({
              id: document.id,
              ...(document.data() as Omit<Meta, 'id'>)
            }))
          );
        },
        error => subscriber.error(error)
      );

      return () => unsubscribe();
    });
  }

  addMeta(meta: string) {
    if (!this.firestore) {
      return Promise.resolve(null);
    }

    const metasRef = collection(
      this.firestore,
      'metas'
    );

    return addDoc(
      metasRef,
      { meta }
    );
  }

  deleteMeta(id: string) {
    if (!this.firestore) {
      return Promise.resolve();
    }

    return deleteDoc(
      doc(
        this.firestore,
        'metas',
        id
      )
    );
  }
}
