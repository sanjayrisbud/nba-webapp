import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Team } from '../models/team';
import { TeamService } from '../services/team.service';

@Component({
  selector: 'app-team-view',
  templateUrl: './team-view.component.html',
  styleUrls: ['./team-view.component.scss']
})
export class TeamViewComponent implements OnInit {
  team$: Observable<Team>;
  @Input() currentTeam: string;

  constructor(private teamService: TeamService) {}

  ngOnInit() {
    this.loadTeam();
  }

  loadTeam() {
    this.team$ = this.teamService.getTeamByTeamId(this.currentTeam);
  }
}
