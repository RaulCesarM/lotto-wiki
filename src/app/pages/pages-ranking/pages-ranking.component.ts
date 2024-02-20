import { Component, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-pages-ranking',
  templateUrl: './pages-ranking.component.html',
  styleUrls: ['./pages-ranking.component.css']
})
export class PagesRankingComponent implements OnInit{

  @Output() dataSource: number[] = [10, 20, 30, 40, 50]; // Exemplo de dados

  constructor() { }

  ngOnInit(): void {
  }
}
