import { Component, OnInit } from '@angular/core';
import { BooksCatalogService } from 'src/app/services';
import { Router } from '@angular/router';
import { Book } from 'src/app/models/book';

@Component({
  selector: 'app-add-books',
  templateUrl: './add-books.component.html',
  styleUrls: ['./add-books.component.css']
})
export class AddBooksComponent implements OnInit {

  book:Book;
  constructor(private bookscatalogSvc : BooksCatalogService,private router:Router) { 

    this.book={
      title:"",
      subtitle:"",
      author:"",
      description:"",
      price:0,
      quantity:0,
      language:"",
      coverImageUrl:"",
      createdDate:undefined,
      updatedDate:undefined,
      isFree:false,
      isAvailable:true,
      status:"",
      bookLocationPath:""

    }
  }

  ngOnInit() {
  }

  save(frm,img){
    if(frm.valid)
    {
    let formData:FormData= new FormData();
    formData.append("title",this.book.title);
    formData.append("subtitle",this.book.subtitle.toString());
    formData.append("author",this.book.author.toString());
    formData.append("description",this.book.description.toString());
    formData.append("price",this.book.price.toString());
    formData.append("quantity",this.book.quantity.toString());
    formData.append("language",this.book.language.toString());
    formData.append("coverimageurl",img.files[0],img.files[0].name);
    formData.append("isFree",this.book.isFree.toString());
    //formData.append("booklocationPath",this.book.bookLocationPath.toString());

    //save to server using WEB API
    this.bookscatalogSvc.addBook(formData)
    .subscribe(
      result=>{
        console.log(result);
        this.router.navigate(['/']);
      },
      err=>{
        console.log(err);
        alert("Error in adding :)");
      }
    );
    }
    else{
      alert("Invlaid form data");
    }
  }

}
