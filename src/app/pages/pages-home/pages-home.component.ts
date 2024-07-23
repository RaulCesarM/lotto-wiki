import { Component, OnInit } from '@angular/core';
import { CorrelationsService } from 'src/app/services/correlations.service';

@Component({
  selector: 'app-pages-home',
  templateUrl: './pages-home.component.html',
  styleUrls: ['./pages-home.component.css']
})
export class PagesHomeComponent implements OnInit{

  constructor(  private correlationsService: CorrelationsService){}

  async ngOnInit() { 
    await this.correlationsService.loadData();   
  }

}
