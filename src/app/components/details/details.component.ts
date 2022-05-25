import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
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
  private page: string | undefined;

  constructor(
    private httpService: HttpService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) { }

  gaugeType = 'semi' as const;
  gaugeLabel = 'Rating';
  colorGauge = '#ffffff';
  thresholdConfig = {
    '0': { color: 'red' },
    '40': { color: 'orange' },
    '75.5': { color: 'purple' },
  };

  ngOnInit(): void {
    this.routeSub = this.activatedRoute.params.subscribe((params: Params) => {
        this.getOneGame(params['game-id']);
        this.getGameTrailer(params['game-id']);
        this.page = params['page'];
    });
  }

  goBack(){
    this.router.navigate(['page', this.page]);
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
      return '#5ee432';
    } else if (value > 30) {
      return '#5ee432';
    } else {
      return '#5ee432';
    }
  }


}
