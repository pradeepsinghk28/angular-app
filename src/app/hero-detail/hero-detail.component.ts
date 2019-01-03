import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Hero } from '../model/hero';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { HeroService } from '../hero/hero.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.scss']
})
export class HeroDetailComponent implements OnInit {

  hero: Hero;
  heroForm = this.fb.group({
    firstName : ['', Validators.required],
    lastName : ['', Validators.required],
    id : ['']
  })  
  
  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private heroService: HeroService,
    private fb: FormBuilder 
  ) { }

  ngOnInit() {
    this.getHero();    
  }

  getHero(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.heroService.getHero(id)
      .subscribe(hero => {
        this.hero = hero;
        this.heroForm.setValue({
          firstName: this.hero.firstName, 
          lastName: this.hero.lastName, 
          id:this.hero.id
        });
      });
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.hero= this.heroForm.value;
    this.heroService.updateHero(this.hero)
    .subscribe(() => this.goBack());
  }
}
