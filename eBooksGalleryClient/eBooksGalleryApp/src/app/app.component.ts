import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: []
})
export class AppComponent {
  title = 'eBooksGalleryApp';  
  currentUser:any;

  constructor(private userSvc:UserService, private router:Router)
  {
      this.userSvc.currentUser.subscribe(user=>this.currentUser=user);
  }

  logout(){
      this.userSvc.clearUserState();
      this.router.navigate(['/login']);
  }
}
