import { Component, OnInit, Output, EventEmitter  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DoelDataService } from '../doel-data.service';
import { Doel } from '../doelen/doel.model';
import { AuthenticationService } from '../user/authentication.service';

@Component({
  selector: 'app-add-doel',
  templateUrl: './add-doel.component.html',
  styleUrls: ['./add-doel.component.css']
})
export class AddDoelComponent implements OnInit {
  public doel: FormGroup
  public errorMessage: string = '';
  public confirmationMessage: string='';

  @Output() public newDoel = new EventEmitter<Doel>();

  constructor(
    private fb: FormBuilder,
    private _doelDataService: DoelDataService,
    private _authenticationService: AuthenticationService,
  ) {
    this.doel = this.fb.group({
      naam: ['',[Validators.required]],
      beschrijving: [''],
      datum: ['']
    })
   }

  ngOnInit(): void {
    this.doel = this.fb.group({
      naam: ['',[Validators.required]],
      beschrijving: [''],
      datum: ['']
    })
  }

  addDoel(doelNaam: HTMLInputElement, doelBeschrijving: HTMLInputElement, doelDatum: HTMLInputElement)
  {
    const doel = new Doel(doelNaam.value,this._authenticationService.user$.value,doelBeschrijving.value,new Date(doelDatum.value))
    this.newDoel.emit(doel);
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
    this._doelDataService.addNewDoel(new Doel(this.doel.value.naam,this._authenticationService.user$.value,this.doel.value.beschrijving,this.doel.value.datum))
  }

}
