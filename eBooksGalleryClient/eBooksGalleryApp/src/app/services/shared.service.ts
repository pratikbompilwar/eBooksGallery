import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class SharedService {

  getBooks$: Observable<any>;
  private myMethodSubject = new Subject<any>();

  constructor() {
    this.getBooks$ = this.myMethodSubject.asObservable();
   }

  getBooks(data){
    console.log("shared data : "+data);
    this.myMethodSubject.next(data);
  }

}
