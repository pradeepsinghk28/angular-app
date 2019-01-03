import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import { HeroService } from './hero.service';
import { Hero } from '../model/hero';

@Component({
  selector: 'app-heroes',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss']
})
export class HeroesComponent implements OnInit {

  heroes: Hero[];
  displayedColumns: string[] = ['firstName', 'lastName', 'actions']; 
  dataSource = new MatTableDataSource<Hero>() 
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private heroService: HeroService) { }

  ngOnInit() {
    this.getHeroes();   
    this.dataSource.paginator = this.paginator;
  }

  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => {
        this.heroes = heroes;      
        this.dataSource.data = this.heroes; 
      });
  }

  add(firstName: string, lastName: string): void {
    firstName = firstName.trim();
    lastName = lastName.trim();
    if (!firstName) { return }
    this.heroService.addHero({ firstName, lastName } as Hero)
      .subscribe(hero => {
          this.heroes.push(hero);
          this.dataSource.data = this.heroes; 
      });
  }

  delete(hero: Hero):void {    
    this.heroService.deleteHero(hero)
    .subscribe(()=> {
        this.heroes = this.heroes.filter(x=>x!= hero);
        this.dataSource.data = this.heroes; 
      }
    )
  }
} 

