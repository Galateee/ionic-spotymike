// src/app/upload.service.ts
import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import { Observable, from } from 'rxjs';
import { environment } from '../../../environments/environment.prod';

const app = initializeApp(environment.firebase);
const storage = getStorage(app);

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  uploadFile(file: File): Observable<string> {
    const filePath = `artists/artist_id_3/${file.name}`;
    const fileRef = ref(storage, filePath);

    const uploadTask = from(uploadBytes(fileRef, file));
    
    return new Observable((observer) => {
      uploadTask.subscribe({
        next: () => {
          getDownloadURL(fileRef).then(url => {
            observer.next(url);
            observer.complete();
          }).catch(error => {
            observer.error(error);
          });
        },
        error: error => observer.error(error)
      });
    });
  }
}
