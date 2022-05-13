import { Component, Input, OnInit } from '@angular/core';
import { Game, GameTrailer } from 'src/app/models';

@Component({
  selector: 'app-game-tabs',
  templateUrl: './game-tabs.component.html',
  styleUrls: ['./game-tabs.component.scss']
})
export class GameTabsComponent implements OnInit {
  @Input() game: Game | undefined;
  @Input() gameTrailers: GameTrailer | undefined;
  public active = true;

  constructor() { }

  ngOnInit(): void {
    console.log(this.game)
    console.log(this.gameTrailers)
  }

  gettingInfo(){
    this.active === true ? this.active = false : this.active = true;
  }


}
