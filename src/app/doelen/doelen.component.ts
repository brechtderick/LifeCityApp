import { Component, Input, OnInit } from '@angular/core';
import { DoelDataService } from '../doel-data.service';
import { Doel } from './doel.model';

@Component({
  selector: 'app-doelen',
  templateUrl: './doelen.component.html',
  styleUrls: ['./doelen.component.css']
})
export class DoelenComponent implements OnInit {

  @Input() public doel: Doel = new Doel('','','',new Date)

  constructor(private _doelDataService: DoelDataService) { }

  ngOnInit(): void {
  }

  deleteDoel(){
    this._doelDataService.deleteDoel(this.doel);
  }

}
