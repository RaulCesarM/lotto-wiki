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
import { FormsModule } from '@angular/forms';
import { ChartsOnionComponent } from './charts-module/charts-onion/charts-onion.component';
import { ExplanationCorrelationsComponent } from './components/explanations/explanation-correlations/explanation-correlations.component';
import { ExplanationRankingsComponent } from './components/explanations/explanation-rankings/explanation-rankings.component';
import { PagesHomeComponent } from './pages/pages-home/pages-home.component';



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
    ChartsOnionComponent,
    ExplanationCorrelationsComponent,
    ExplanationRankingsComponent,
    PagesHomeComponent,

    
    
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
