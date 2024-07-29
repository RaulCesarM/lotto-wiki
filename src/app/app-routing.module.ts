import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CorrelationsComponent } from './charts-module/correlations/correlations.component';
import { ChartsMoonsComponent } from './charts-module/charts-moons/charts-moons.component';
import { ChartsRankingsComponent } from './charts-module/charts-rankings/charts-rankings.component';
import { ChartsOnionComponent } from './charts-module/charts-onion/charts-onion.component';


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'onion', component: ChartsOnionComponent},
  { path: 'lunations', component: ChartsMoonsComponent },
  { path: 'ranking', component: ChartsRankingsComponent},
  { path: 'correl', component: CorrelationsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
