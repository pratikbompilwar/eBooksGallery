import { Component, OnInit, Input } from '@angular/core';
import { BooksCatalogService, SharedService } from 'src/app/services';
import { Book } from 'src/app/models/book';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  books: Observable<Book[]>;

  @Input() bookResult: Observable<Book[]>;

  constructor(private bookscatalogSvc: BooksCatalogService, private sharedSVC:SharedService,
    private route: ActivatedRoute, private router: Router) {

    if (this.bookResult != null) {
      this.books = this.bookResult
    }
    else {
      this.books = this.bookscatalogSvc.getBooks();
    }

    this.sharedSVC.getBooks$.subscribe(
      res => {
        console.log(res);
        this.books = res;
      },
      err => {
        alert("Login failed")
      }
    )
  }

  ngOnInit() {
  }

  deleteBook(id: string) {
    this.bookscatalogSvc.deleteBook(id)
      .subscribe(
        result => {
          console.log(result);
          this.router.navigate(['/home']);
          // this.router.navigated=false;
          // this.router.navigate(['/']);
        },
        err => {
          console.log(err);
          alert("Error in deleting book :)");
        }
      );
  }
}
