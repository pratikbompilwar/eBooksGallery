import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from '../models/book';


@Injectable({
  providedIn: 'root'
})
export class BooksCatalogService {

  readonly API_URL:string="https://localhost:44307/api/BooksCatalog";
  constructor(private http :HttpClient) { }

  getBooks():Observable<Book[]>{
    return this.http.get<Book[]>(this.API_URL);
  }

  addBook(formData:FormData):Observable<Book>{
   return this.http.post<Book>(`${this.API_URL}/addbook`, formData);
  }  

  getBookById(bookId :string):Observable<Book>{
    return this.http.get<Book>(`${this.API_URL}/` + bookId);
  }

  updateBook(formData:FormData):Observable<Book>{
    return this.http.post<Book>(`${this.API_URL}/updatebook`, formData);
   }  

  deleteBook(bookId :string):Observable<Book>{
    return this.http.delete<Book>(`${this.API_URL}/DeleteBook/`+ bookId);
   } 

  searchBooks(keyword :string):Observable<Book[]>{
    return this.http.get<Book[]>(`${this.API_URL}/Search/`+ keyword);
   } 
  
}
