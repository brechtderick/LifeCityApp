import { Component, OnInit, Input } from '@angular/core';
import { EmotieDataService } from '../emotie-data.service';
import { Emotieregulatie } from './emotieregulatie.model';

@Component({
  selector: 'app-emotieregulatie',
  templateUrl: './emotieregulatie.component.html',
  styleUrls: ['./emotieregulatie.component.css']
})
export class EmotieregulatieComponent implements OnInit {

  @Input() public emotie: Emotieregulatie = new Emotieregulatie('',new Date(),'');

  constructor(private _emotieDataService: EmotieDataService) {
    
   }

  ngOnInit(): void {
  }

  deleteEmotie() {
    this._emotieDataService.deleteEmotie(this.emotie);
  }

}
