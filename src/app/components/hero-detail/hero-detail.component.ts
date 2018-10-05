import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Hero } from '../hero/hero'
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { HeroService } from '../../services/hero.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.scss']
})
export class HeroDetailComponent implements OnInit {

  @Input() hero: Hero;
  heroForm = this.fb.group({
    name : ['', Validators.required],
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
        this.heroForm.setValue({name: this.hero.name, id:this.hero.id});
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
