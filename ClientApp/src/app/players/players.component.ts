import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Player } from '../models/player';
import { PlayerService } from '../services/player.service';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.scss']
})
export class PlayersComponent implements OnInit {
  players$: Observable<Player[]>;
  teamId: string;

  constructor(private playerService: PlayerService, private avRoute: ActivatedRoute) { }

  ngOnInit() {
    const idParam = 'id';
    this.avRoute.paramMap.subscribe((params: ParamMap) => {
      const teamId = params.get(idParam);
      this.teamId = teamId;
    });
    this.loadPlayers();
  }

  loadPlayers() {
    this.players$ = this.playerService.getPlayers(this.teamId);
  }

  delete(id) {
    const ans = confirm('Do you want to delete player with id: ' + id);
    if (ans) {
      this.playerService.deletePlayer(id).subscribe((data) => {
        this.loadPlayers();
      });
    }
  }
}
