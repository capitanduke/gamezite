import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Game, GameTrailer } from 'src/app/models';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-game-tabs',
  templateUrl: './game-tabs.component.html',
  styleUrls: ['./game-tabs.component.scss']
})
export class GameTabsComponent implements OnInit {
  @Input() game: Game | undefined;
  @Input() gameTrailers: GameTrailer | undefined;
  public active = true;
  public genres: undefined;

  constructor(
    private httpService: HttpService
  ) { }

  ngOnInit(): void {
    console.log(this.game)
    console.log(this.gameTrailers)
  }

  gettingInfo(){
    this.active === true ? this.active = false : this.active = true;
  }

}
