import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HulpbronDataService } from '../hulpbron-data.service';
import { Hulpbronnen } from '../hulpbronnen/hulpbronnen.model';

import { AuthenticationService } from '../user/authentication.service';

@Component({
  selector: 'app-add-hulpbron',
  templateUrl: './add-hulpbron.component.html',
  styleUrls: ['./add-hulpbron.component.css']
})
export class AddHulpbronComponent implements OnInit {
  public hulpbron: FormGroup
  public errorMessage: string = '';
  public confirmationMessage: string = '';

  @Output() public newHulpbron = new EventEmitter<Hulpbronnen>();

  constructor(
    private fb: FormBuilder,
    private _hulpbronnenDataService: HulpbronDataService,
    private _authenticationService: AuthenticationService,
  ) {
    this.hulpbron = this.fb.group({
      naam: ['',[Validators.required]],
      beschrijving: ['']
    })
   }

  ngOnInit(): void {
    this.hulpbron = this.fb.group({
      naam: ['',[Validators.required]],
      beschrijving: ['',[Validators.required]]
    })
  }

  addHulpbron(hulpbronNaam: HTMLInputElement, hulpbronBeschrijving: HTMLInputElement): boolean {
    const hulpbron = new Hulpbronnen(hulpbronNaam.value,this._authenticationService.user$.value,hulpbronBeschrijving.value);
    this.newHulpbron.emit(hulpbron);
    return false;
  }

  getErrorMessage(errors: any): string {
    if(errors.required){
      return 'is required';
    } else if (errors.minlength) {
      return `needs at least ${errors.minlength.requiredLength} 
        characters (got ${errors.minlength.actualLength})`;
    }else{
      return '';
    }
  }

  onSubmit(){
    this._hulpbronnenDataService.addNewHulpbron(new Hulpbronnen(this.hulpbron.value.naam,this._authenticationService.user$.value,this.hulpbron.value.beschrijving))
  }

}
