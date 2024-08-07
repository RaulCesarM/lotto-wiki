import { Component, OnInit } from '@angular/core';
import { CorrelationPlaces } from 'src/app/models/correlationPlaces';
import { CorrelationsService } from 'src/app/services/correlations.service';

@Component({
  selector: 'app-charts-onion',
  templateUrl: './charts-onion.component.html',
  styleUrls: ['./charts-onion.component.css']
})
export class ChartsOnionComponent implements OnInit {  

  placesRanking:  CorrelationPlaces = new CorrelationPlaces();

  constructor(private correlationsService: CorrelationsService) {}
  ngOnInit(): void {
    this.setBall(1)   
  }
  async setBall(place: number): Promise<void> { 
      this.placesRanking = await this.correlationsService.getPlacesData(place);
      console.log(this.placesRanking)
  }
}