import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChartsCorrelationsComponent } from './charts-module/charts-correlations/charts-correlations.component';
import { ChartsMapsComponent } from './charts-module/charts-maps/charts-maps.component';
import { ChartsMoonsComponent } from './charts-module/charts-moons/charts-moons.component';
import { ChartsRankingsComponent } from './charts-module/charts-rankings/charts-rankings.component';
import { PagesHomeComponent } from './pages-module/pages-home/pages-home.component';
import { ChartsOnionComponent } from './charts-module/charts-onion/charts-onion.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: PagesHomeComponent},
  { path: 'onion', component: ChartsOnionComponent},
  { path: 'lunations', component: ChartsMoonsComponent },
  { path: 'ranking', component: ChartsRankingsComponent},
  { path: 'maps', component: ChartsMapsComponent},
  { path: 'correl', component: ChartsCorrelationsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
