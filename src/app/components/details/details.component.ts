import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { APIResponse, Game } from 'src/app/models';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  private routeSub: Subscription = new Subscription;
  private gameSub: Subscription = new Subscription;
  public game: Game | undefined;
 

  constructor(
    private httpService: HttpService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.routeSub = this.activatedRoute.params.subscribe((params: Params) => {
        this.getOneGame(params['game-id']);
    });
  }

  getOneGame(id: string): void {
    this.gameSub = this.httpService
      .getGameDetails(id)
      .subscribe((gameDetail: Game) => {
        this.game = gameDetail;
        console.log(this.game)
      });
  }


}
