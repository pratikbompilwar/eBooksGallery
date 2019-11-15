import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent, AddBooksComponent } from './components';
import { EditBookComponent } from './components/edit-book/edit-book.component';
import { EventResolverServiceService } from './resolvers/event-resolver-service.service';


const routes: Routes = [
  {path:'',component:HomeComponent,pathMatch:"full"},
  {path:'home',component:HomeComponent},
  {path:'books/add',component:AddBooksComponent}  ,
  { path:'editBook/:id',component:EditBookComponent,resolve:{item:EventResolverServiceService}}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
