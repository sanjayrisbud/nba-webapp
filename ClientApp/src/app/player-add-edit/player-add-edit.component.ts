import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Player } from '../models/player';
import { PlayerService } from '../services/player.service';
import { TeamService } from './../services/team.service';
import { Team } from './../models/team';

@Component({
  selector: 'app-player-add-edit',
  templateUrl: './player-add-edit.component.html',
  styleUrls: ['./player-add-edit.component.scss']
})
export class PlayerAddEditComponent implements OnInit {
  actionType: string;
  formObjectKey: string;
  formTeam: string;
  validPosition = false;
  validTeam = false;
  tempPlayer = new Player();
  selectedFile: File;
  imgfile = 'assets/rsrc/player/blank.jpeg';
  http: HttpClient;


  positions = ['Guard', 'Guard-Forward', 'Forward-Guard', 'Forward',
              'Forward-Center', 'Center-Forward', 'Center'];
  teams: Team[];

  constructor(private playerService: PlayerService, private teamService: TeamService,
              private avRoute: ActivatedRoute, private router: Router) {
    const idParam = 'id';
    this.actionType = 'Add';
    this.tempPlayer.headshot = 'blank.jpeg';
    this.tempPlayer.position = '-1';
    this.tempPlayer.team = '-1';
    if (this.avRoute.snapshot.params[idParam]) {
      this.formObjectKey = this.avRoute.snapshot.params[idParam];
    }
  }

  ngOnInit() {

    if (this.formObjectKey !== undefined) {
      this.actionType = 'Edit';
      this.playerService.getPlayer(this.formObjectKey)
        .subscribe(data => (
          this.tempPlayer = data,
          this.formTeam = this.tempPlayer.team,
          this.imgfile = 'assets/rsrc/player/' + this.tempPlayer.headshot
          ));
      this.validPosition = true;
      this.validTeam = true;
    }
    this.teamService.getTeams()
      .subscribe(data => (
        this.teams = data
      ));
  }

  onFileChanged(theevent) {
    // http://www.angulartutorial.net/2018/01/show-preview-image-while-uploading.html
    if (theevent.target.files && theevent.target.files[0]) {
      this.selectedFile = theevent.target.files[0];
      const reader = new FileReader();
      reader.onload = (event: any) => {
          this.imgfile = event.target.result;
      };
      reader.readAsDataURL(this.selectedFile);
      this.tempPlayer.headshot = this.selectedFile.name;
    }
  }

  validateSelection(selectName, selectValue) {
    if (selectName === 'position') {
      if (selectValue === '-1') {
        this.validPosition = false;
      }
      else {
        this.validPosition = true;
      }
    }
    else if (selectName === 'team') {
      if (selectValue === '-1') {
        this.validTeam = false;
      }
      else {
        this.validTeam = true;
      }
    }
  }

  onUpload() {
    this.http.post('my-backend.com/file-upload', this.selectedFile, {
      reportProgress: true,
      observe: 'events'
    })
      .subscribe(event => {
        console.log(event); // handle event here
      });
  }

  onSubmit() {
    if (this.actionType === 'Add'){
      this.tempPlayer.robotName = 'Angular';
      this.tempPlayer.fetchDate = new Date();
      this.tempPlayer.objectKey = this.tempPlayer.team + '-' + this.tempPlayer.jersey;
      this.playerService.savePlayer(this.tempPlayer)
        .subscribe(
          data => console.log('Success!'),
          error => console.error('Error: ' + error)
          );
    }
    else {
      this.playerService.updatePlayer(this.formObjectKey, this.tempPlayer)
        .subscribe(
          data => console.log('Success!'),
          error => console.error('Error: ' + error)
          );
    }
    this.router.navigate(['players/team', this.tempPlayer.team]);
  }

  cancel() {
    if (this.actionType === 'Edit') {
       this.router.navigate(['/player', this.formObjectKey, 'team', this.formTeam]);
    }
    else {
      this.router.navigate(['/']);
    }
  }
}
