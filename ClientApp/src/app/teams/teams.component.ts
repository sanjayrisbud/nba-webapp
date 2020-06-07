import { PlayersComponent } from './../players/players.component';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Team } from '../models/team';
import { TeamService } from '../services/team.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss']
})
export class TeamsComponent implements OnInit {
  teams$: Observable<Team[]>;

  constructor(private teamService: TeamService, private router: Router) {
  }

  ngOnInit() {
    this.loadTeams();
  }

  loadTeams() {
    this.teams$ = this.teamService.getTeams();
  }

  view(teamid) {
    this.router.navigate(['/players/team', teamid]);
   }
}
