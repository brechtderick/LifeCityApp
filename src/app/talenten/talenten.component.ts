import { Component, Input, OnInit } from '@angular/core';
import { TalentenDataService } from '../talenten-data.service';
import { Talenten } from './talenten.model';

@Component({
  selector: 'app-talenten',
  templateUrl: './talenten.component.html',
  styleUrls: ['./talenten.component.css']
})
export class TalentenComponent implements OnInit {

  @Input() public talent: Talenten = new Talenten('','');

  constructor(private _talentenDataService: TalentenDataService) { }

  ngOnInit(): void {
  }

  deleteTalent(){
    this._talentenDataService.deleteTalent(this.talent)
  }

}
