import { Component, Input, OnInit } from '@angular/core';
import { HulpbronDataService } from '../hulpbron-data.service';
import { Hulpbronnen } from './hulpbronnen.model';

@Component({
  selector: 'app-hulpbronnen',
  templateUrl: './hulpbronnen.component.html',
  styleUrls: ['./hulpbronnen.component.css']
})
export class HulpbronnenComponent implements OnInit {

  @Input() public hulpbron: Hulpbronnen = new Hulpbronnen('','','')

  constructor(private _hulpbronDataService: HulpbronDataService) { }

  ngOnInit(): void {
  }

  deleteHulpbron(){
    this._hulpbronDataService.deleteHulpbron(this.hulpbron);
  }

}
