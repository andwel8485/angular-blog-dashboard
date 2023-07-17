import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SubscriptionsService {
  constructor(private fs: AngularFirestore, private toastr: ToastrService) {}
  loadSubscribers() {
    return this.fs
      .collection('subscriber')
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

  deleteSubscriber(id: string) {
    this.fs
      .collection('subscriber')
      .doc(id)
      .delete()
      .then((docRef) => {
        this.toastr.warning('Subscription Canceled !!');
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
