import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { APIResponse, Game, GameTrailer } from 'src/app/models';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  private routeSub: Subscription = new Subscription;
  private gameSub: Subscription = new Subscription;
  private gameTrailerSub: Subscription = new Subscription;
  public game: Game | undefined;
  public gameTrailer!: GameTrailer;
 

  constructor(
    private httpService: HttpService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.routeSub = this.activatedRoute.params.subscribe((params: Params) => {
        this.getOneGame(params['game-id']);
        this.getGameTrailer(params['game-id']);
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

  getGameTrailer(id: string): void{
    this.gameTrailerSub = this.httpService
    .getGameDetailsTrailer(id)
    .subscribe((gameTrailer: GameTrailer) => {
      this.gameTrailer = gameTrailer;
      console.log(this.gameTrailer.results[0])
    });
  }


}
