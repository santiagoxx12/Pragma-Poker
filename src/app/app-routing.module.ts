import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateGamePageComponent } from './pages/create-game-page/create-game-page.component';
import { GameRoomComponent } from './pages/game-room/game-room.component';

const routes: Routes = [

  { path: '', redirectTo: '/splash', pathMatch: 'full' },
  { path: 'create-game', component: CreateGamePageComponent },
  { path: 'game-room/:gameName', component: GameRoomComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
