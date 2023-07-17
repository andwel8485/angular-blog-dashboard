import { ReturnStatement } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';
import { Post } from '../models/post';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  constructor(
    private storage: AngularFireStorage,
    private fs: AngularFirestore,
    private toastr: ToastrService,
    private router: Router
  ) {}

  uploadImage(selectedFile: any, post: Post, formStatus: string, id: string) {
    const imagePath: string = `postImg/${Date.now()}`;

    this.storage.upload(imagePath, selectedFile).then((a) => {
      console.log('upload success!');
      this.storage
        .ref(imagePath)
        .getDownloadURL()
        .subscribe((URL) => {
          post.postImgPath = URL;
          if (formStatus == 'Edit') {
            this.updateData(post, id);
          } else {
            this.saveData(post);
          }
        });
    });
  }
  updateData(postData: Post, id: string) {
    this.fs
      .collection('post')
      .doc(id)
      .update(postData)
      .then(() => {
        this.toastr.success('Post Updated!!');
      });
    this.router.navigate(['/post']);
  }

  saveData(postData: Post) {
    this.fs
      .collection('post')
      .add(postData)
      .then((docRef) => {
        this.toastr.success('Post Saved!!');
      });
    this.router.navigate(['/post']);
  }

  loadData() {
    return this.fs
      .collection('post')
      .snapshotChanges()
      .pipe(
        map((actions) =>
          actions.map((a: any) => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, data };
          })
        )
      );
  }

  loadOneData(id: string) {
    return this.fs.collection('post').doc(id).valueChanges();
  }
  deleteImage(id: string, postImgPath: string) {
    this.storage.storage
      .refFromURL(postImgPath)
      .delete()
      .then(() => {
        this.deleteData(id);
      });
  }

  deleteData(id: string) {
    this.fs
      .collection('post')
      .doc(id)
      .delete()
      .then(() => {
        this.toastr.warning('Post Deleted!!');
      });

    this.router.navigate(['/post']);
  }

  markFeatured(id: string, featuredData: { isFeatured: boolean }) {
    this.fs
      .collection('post')
      .doc(id)
      .update(featuredData)
      .then(() => {
        this.toastr.info('Feature Status Updated!!');
      });
    this.router.navigate(['/post']);
  }
}
