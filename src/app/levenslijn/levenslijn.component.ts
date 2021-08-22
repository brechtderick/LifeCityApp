import { Component, Input, OnInit } from '@angular/core';
import { LevenslijnDataService } from '../levenslijn-data.service';
import { Levenslijn } from './levenslijn.model';

@Component({
  selector: 'app-levenslijn',
  templateUrl: './levenslijn.component.html',
  styleUrls: ['./levenslijn.component.css']
})
export class LevenslijnComponent implements OnInit {

  @Input() public levenslijn: Levenslijn = new Levenslijn('','','',new Date)

  constructor(private _levenslijnDataService: LevenslijnDataService) { }

  ngOnInit(): void {
  }

  deleteLevenslijn(){
    this._levenslijnDataService.deleteLevenslijn(this.levenslijn);
  }

}
