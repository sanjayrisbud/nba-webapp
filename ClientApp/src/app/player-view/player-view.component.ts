import { Component, OnInit } from '@angular/core';
import { Player } from '../models/player';
import { Observable } from 'rxjs';
import { PlayerService } from '../services/player.service';
import { ActivatedRoute } from '@angular/router';
import { Team } from '../models/team';
import { TeamService } from '../services/team.service';

@Component({
  selector: 'app-player-view',
  templateUrl: './player-view.component.html',
  styleUrls: ['./player-view.component.scss']
})
export class PlayerViewComponent implements OnInit {
  player$: Observable<Player>;
  team$: Observable<Team>;
  objectkey: string;
  teamId: string;

  constructor(private playerService: PlayerService, private teamService: TeamService,
              private avRoute: ActivatedRoute) {
    const idParam = 'id';
    const tidParam = 'tid';
    if (this.avRoute.snapshot.params[idParam]) {
      this.objectkey = this.avRoute.snapshot.params[idParam];
      this.teamId = this.avRoute.snapshot.params[tidParam];
    }
  }

  ngOnInit() {
    this.loadPlayer();
  }

  loadPlayer() {
    this.player$ = this.playerService.getPlayer(this.objectkey);
  }
}
