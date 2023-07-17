import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ToastrService } from 'ngx-toastr';
import { Category } from '../models/category';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private fs: AngularFirestore, private toastr: ToastrService) {}
  saveData(categoryData: Category) {
    this.fs
      .collection('categories')
      .add(categoryData)
      .then((docRef) => {
        console.log(docRef);
        this.toastr.success('Data Insert Sucessfully ..!');
      })
      .catch((error) => {
        console.log(error);
      });
  }
  loadData() {
    return this.fs
      .collection('categories')
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

  updateData(id: string, editData: Category) {
    this.fs
      .collection('categories')
      .doc(id)
      .update(editData)
      .then((docRef) => {
        console.log(docRef);
        this.toastr.success('Data Update Sucessfully ..!');
      })
      .catch((error) => {
        console.log(error);
      });
  }

  deleteData(id: string) {
    this.fs
      .collection('categories')
      .doc(id)
      .delete()
      .then((docRef) => {
        this.toastr.success('Data Deleted !!');
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
