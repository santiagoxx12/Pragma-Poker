import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateGamePageComponent } from './pages/create-game-page/create-game-page.component';

const routes: Routes = [

  { path: '', redirectTo: '/splash', pathMatch: 'full' },
  { path: 'create-game', component: CreateGamePageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
