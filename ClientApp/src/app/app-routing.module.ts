import { PlayersComponent } from './players/players.component';
import { PlayerViewComponent } from './player-view/player-view.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlayerAddEditComponent } from './player-add-edit/player-add-edit.component';
import { TeamsComponent } from './teams/teams.component';
import { TeamViewComponent } from './team-view/team-view.component';


const routes: Routes = [
  { path: 'players/team/:id', component: PlayersComponent },
  { path: 'player/:id/team/:tid', component: PlayerViewComponent },
  { path: 'player/add', component: PlayerAddEditComponent },
  { path: 'player/edit/:id', component: PlayerAddEditComponent },
  { path: 'teams', component: TeamsComponent },
  { path: 'team/:id', component: TeamViewComponent },
  { path: '**', redirectTo: '/players/team/' },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
