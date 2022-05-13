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
  public indexTrailer: number = 0;

  constructor(
    private httpService: HttpService,
    private activatedRoute: ActivatedRoute
  ) { }

  gaugeType = 'semi' as const;
  gaugeLabel = 'Rating';
  colorGauge = '#ffffff';
  thresholdConfig = {
    '0': { color: 'red' },
    '40': { color: 'orange' },
    '75.5': { color: 'green' },
  };

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
      });
  }

  getGameTrailer(id: string): void{
    this.gameTrailerSub = this.httpService
    .getGameDetailsTrailer(id)
    .subscribe((gameTrailer: GameTrailer) => {
      this.gameTrailer = gameTrailer;
    });
  }

  getColor(value: number): string {
    if (value > 75) {
      return '#5ee432';
    } else if (value > 50) {
      return '#fffa50';
    } else if (value > 30) {
      return '#f7aa38';
    } else {
      return '#ef4655';
    }
  }


}
