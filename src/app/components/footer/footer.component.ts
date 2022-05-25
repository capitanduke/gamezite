import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  public showing: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  open(){
    this.showing = !this.showing;
  }

}
