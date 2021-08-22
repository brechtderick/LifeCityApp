import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LevenslijnDataService } from '../levenslijn-data.service';
import { Levenslijn } from '../levenslijn/levenslijn.model';
import { AuthenticationService } from '../user/authentication.service';

@Component({
  selector: 'app-add-levenslijn',
  templateUrl: './add-levenslijn.component.html',
  styleUrls: ['./add-levenslijn.component.css']
})
export class AddLevenslijnComponent implements OnInit {
  public levenslijn: FormGroup
  public errorMessage: string = '';
  public confirmationMessage: string = '';

  @Output() public newLevenslijn = new EventEmitter<Levenslijn>();

  constructor(
    private fb: FormBuilder,
    private _levenslijnDataService: LevenslijnDataService,
    private _authenticationService: AuthenticationService,
  ) {
    this.levenslijn = this.fb.group({
      naam: ['',[Validators.required]],
      beschrijving: [''],
      datum: ['']
    })
   }

  ngOnInit(): void {
    this.levenslijn = this.fb.group({
      naam: ['',[Validators.required]],
      beschrijving: ['',[Validators.required]],
      datum: ['',[Validators.required]]
    })
  }

  addLevenslijn(levenslijnNaam: HTMLInputElement, levenslijnBeschrijving: HTMLInputElement, levenslijnDatum: HTMLInputElement)
  {
    const levenslijn = new Levenslijn(levenslijnNaam.value,this._authenticationService.user$.value,levenslijnBeschrijving.value,new Date(levenslijnDatum.value))
    this.newLevenslijn.emit(levenslijn);
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
    this._levenslijnDataService.addNewLevenslijn(new Levenslijn(this.levenslijn.value.naam,this._authenticationService.user$.value,this.levenslijn.value.beschrijving,this.levenslijn.value.datum))
  }

}
