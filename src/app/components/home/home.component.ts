import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { APIResponse, Game } from 'src/app/models';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  public sort!: string;
  public games: Array<Game> | undefined;
  private routeSub: Subscription = new Subscription;
  private gameSub: Subscription = new Subscription;
  private gameListNext: string = "";
  private gameListPrev: string = "";
  public activeNextButton: boolean = false;
  public activePrevButton: boolean = false;


  constructor(    
    private httpService: HttpService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.routeSub = this.activatedRoute.params.subscribe((params: Params) => {
      if (params['game-search']) {
        this.searchGames('metacrit', params['game-search']);
      } else {
        this.searchGames('metacrit');
      }
    });
  }

  searchGames(sort: string, search?: string, next?: string, prev?: string): void {
    this.gameSub = this.httpService
      .getGameList(sort, search, next, prev)
      .subscribe((gameList: APIResponse<Game>) => {
          this.games = gameList.results;
          this.gameListNext = gameList.next.slice(85, 92);
          if(gameList.previous !== null){
            this.gameListPrev = gameList.previous.slice(85, 92);
          }
      });
  }

  animationLoop(){
    setTimeout(() =>{
      this.activeNextButton = false;
      this.activePrevButton = false;
    },700);
  }

  goNextPage(){
    this.activeNextButton = true;
    this.searchGames('metacrit', "", this.gameListNext);
    this.gameSub = this.httpService
      .getGameList('metacrit', "", this.gameListNext)
      .subscribe((gameList: APIResponse<Game>) => {
        this.games = gameList.results;
    });
    this.animationLoop()
  }

  goPrevPage(){
    this.activePrevButton = true;
    this.searchGames('metacrit', "", "", this.gameListPrev);
    this.gameSub = this.httpService
      .getGameList('metacrit', "", "", this.gameListPrev)
      .subscribe((gameList: APIResponse<Game>) => {
        this.games = gameList.results;
    });
    this.animationLoop()
  }

  openGameDetails(id: number): void {
    this.router.navigate(['details', id]);
  }

  ngOnDestroy(): void {
    if (this.gameSub) {
      this.gameSub.unsubscribe();
    }

    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }

}