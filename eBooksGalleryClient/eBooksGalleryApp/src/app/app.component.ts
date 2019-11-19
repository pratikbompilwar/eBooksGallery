import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { UserService, BooksCatalogService, SharedService } from './services';
import { Observable } from 'rxjs';
import { Book } from './models/book';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: []
})
export class AppComponent {
  title = 'eBooksGalleryApp';
  currentUser: any;
  result: Observable<Book[]>;

  constructor(private userSvc: UserService, private sharedSVC: SharedService,
    private router: Router, private booksCatalogSvc: BooksCatalogService) {
    this.userSvc.currentUser.subscribe(user => this.currentUser = user);
  }

  logout() {
    this.userSvc.clearUserState();
    this.router.navigate(['/login']);
  }

  search(inputString: string) {
    if (inputString.trim() != "" && inputString.trim() != null) {
      this.result = this.booksCatalogSvc.searchBooks(inputString);
      this.sharedSVC.getBooks(this.result);
    }else{
      let routeName = this.router.url;
      if(routeName.includes("home")){
        this.router.navigate(['/']);  
      }else{
      this.router.navigate(['/home']);
      }
    }
  }

}
