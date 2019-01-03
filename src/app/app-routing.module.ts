import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResolverService } from './common/resolver';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserComponent } from './user/user.component';
import { UserDetailComponent} from './user-detail/user-detail.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  {
    path: "heroes",
    loadChildren: "../app/hero/hero.module#HeroModule"
  },  
  { path: 'hero/:id', component: HeroDetailComponent },
  { 
    path: 'users', 
    component: UserComponent,
    resolve:  { users: ResolverService }  
  },
  { path: 'user', component: UserDetailComponent },
  { path: 'user/:id', component: UserDetailComponent }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
