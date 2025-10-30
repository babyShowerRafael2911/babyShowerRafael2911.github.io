import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class InvitacionesService {
  constructor(private firestore: Firestore) {}

  agregarInvitacion(data: any) {
    const ref = collection(this.firestore, 'asistencias');
    return addDoc(ref, data);
  }


  obtenerInvitaciones(): Observable<any[]> {
    const ref = collection(this.firestore, 'asistencias');
    return collectionData(ref, { idField: 'id' });
  }
}
