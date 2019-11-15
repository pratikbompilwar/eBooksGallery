import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Book } from '../models/book';
import { BooksCatalogService } from '../services';

@Injectable({
  providedIn: 'root'
})
export class EventResolverServiceService implements Resolve<Book> {

  constructor(private bookcatalogSvc:BooksCatalogService) { }

  resolve(route: import("@angular/router").ActivatedRouteSnapshot, state: import("@angular/router").RouterStateSnapshot): Book | import("rxjs").Observable<Book> | Promise<Book> {
    let id = route.params["id"];
    return this.bookcatalogSvc.getBookById(id);
  }

  
}
