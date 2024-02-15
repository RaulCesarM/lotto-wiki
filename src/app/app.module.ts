import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CommonModule } from '@angular/common';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { NavToolbarComponent } from './nav-modules/nav-toolbar/nav-toolbar.component';
import { NavSidenavComponent } from './nav-modules/nav-sidenav/nav-sidenav.component';
import { NavFooterComponent } from './nav-modules/nav-footer/nav-footer.component';
import { ChartsRankingsComponent } from './charts-module/charts-rankings/charts-rankings.component';
import { ChartsMoonsComponent } from './charts-module/charts-moons/charts-moons.component';
import { ChartsMapsComponent } from './charts-module/charts-maps/charts-maps.component';
import { ChartsCorrelationsComponent } from './charts-module/charts-correlations/charts-correlations.component';
import { DataCorrelationsRepositoryComponent } from './data-module/data-correlations-repository/data-correlations-repository.component';
import { DataMoonsRepositoryComponent } from './data-module/data-moons-repository/data-moons-repository.component';
import { DataMapsRepositoryComponent } from './data-module/data-maps-repository/data-maps-repository.component';
import { DataRankingsRepositoryComponent } from './data-module/data-rankings-repository/data-rankings-repository.component';
import { DataFormulasRepositoryComponent } from './data-module/data-formulas-repository/data-formulas-repository.component';

import { FormsModule } from '@angular/forms';
import { ExplanationRankingsComponent } from './explanations-module/explanation-rankings/explanation-rankings.component';
import { ExplanationCorrelationsComponent } from './explanations-module/explanation-correlations/explanation-correlations.component';
import { PagesHomeComponent } from './pages-module/pages-home/pages-home.component';
import { PagesFormulaComponent } from './pages-module/pages-formula/pages-formula.component';
import { ConfigurationsChartsRankingsComponent } from './configurations-module/configurations-charts-rankings/configurations-charts-rankings.component';


@NgModule({
  declarations: [
    AppComponent,
    NavToolbarComponent,
    NavSidenavComponent,
    NavFooterComponent,
    ChartsRankingsComponent,
    ChartsMoonsComponent,
    ChartsMapsComponent,
    ChartsCorrelationsComponent,
    DataCorrelationsRepositoryComponent,
    DataMoonsRepositoryComponent,
    DataMapsRepositoryComponent,
    DataRankingsRepositoryComponent,
    DataFormulasRepositoryComponent,
    ExplanationRankingsComponent,
    ExplanationCorrelationsComponent,
    PagesHomeComponent,
    PagesFormulaComponent,
    ConfigurationsChartsRankingsComponent  
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,  
    MatListModule,
    FormsModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    



  ],
  providers: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
