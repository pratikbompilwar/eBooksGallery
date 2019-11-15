import { Component, OnInit } from '@angular/core';
import { BooksCatalogService } from 'src/app/services';
import { Book } from 'src/app/models/book';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  books:Observable<Book[]>;

  constructor(private bookscatalogSvc : BooksCatalogService,private route:ActivatedRoute,private router:Router) {
    this.books = this.bookscatalogSvc.getBooks();
   }

  ngOnInit() {
  }

  deleteBook(id:string)
  {
    this.bookscatalogSvc.deleteBook(id)
    .subscribe(
      result=>{
        console.log(result);
        this.router.navigate(['/home']);
        // this.router.navigated=false;
        // this.router.navigate(['/']);
      },
      err=>{
        console.log(err);
        alert("Error in deleting book :)");
      }
    );    
  }
}
