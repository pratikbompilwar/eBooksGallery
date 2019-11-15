import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from 'src/app/models/book';
import { BooksCatalogService } from 'src/app/services';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css']
})
export class EditBookComponent implements OnInit {

  book:Book;
  
  constructor(private bookscatalogSvc :BooksCatalogService,private route:ActivatedRoute,private router:Router) { 
    this.book=this.route.snapshot.data["item"];
  }

  ngOnInit() {
  }

  save(frm,img){
    if(frm.valid)
    {
    let formData:FormData= new FormData();
    formData.append("id",this.book.id);
    formData.append("title",this.book.title);
    formData.append("subtitle",this.book.subtitle);
    formData.append("author",this.book.author);
    formData.append("description",this.book.description);
    formData.append("price",this.book.price.toString());
    formData.append("quantity",this.book.quantity.toString());
    formData.append("language",this.book.language);
    if(img.files.length==0)
    {
      formData.append("coverimageurl",this.book.coverImageUrl);
    }
    else{
      formData.append("coverimageurl",img.files[0],img.files[0].name);
    }
    
    formData.append("isFree",this.book.isFree.toString());
    //formData.append("booklocationPath",this.book.bookLocationPath.toString());

    //save to server using WEB API
    this.bookscatalogSvc.updateBook(formData)
    .subscribe(
      result=>{
        console.log(result);
        this.router.navigate(['/']);
      },
      err=>{
        console.log(err);
        alert("Error in saving edited book :)");
      }
    );
    }
    else{
      alert("Invlaid form data");
    }
  }

}
