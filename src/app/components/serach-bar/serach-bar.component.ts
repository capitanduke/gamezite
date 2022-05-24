import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-serach-bar',
  templateUrl: './serach-bar.component.html',
  styleUrls: ['./serach-bar.component.scss']
})
export class SerachBarComponent implements OnInit {
  public showing: boolean = false;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm){
    this.router.navigate(['search', form.value.search]);
    this.showing = !this.showing;
    form.reset();
  }

  test(){
    this.showing = !this.showing;
  }

}
