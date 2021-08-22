import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TalentenDataService } from '../talenten-data.service';
import { Talenten } from '../talenten/talenten.model';
import { AuthenticationService } from '../user/authentication.service';

@Component({
  selector: 'app-add-talent',
  templateUrl: './add-talent.component.html',
  styleUrls: ['./add-talent.component.css']
})
export class AddTalentComponent implements OnInit {
  public talent: FormGroup
  public errorMessage: string = '';
  public confirmationMessage: string = '';

  @Output() public newTalent = new EventEmitter<Talenten>();

  constructor(
    private fb: FormBuilder, 
    private _talentenDataSercie: TalentenDataService,
    private _authenticationService: AuthenticationService,) {
    this.talent = this.fb.group({
      naam: ['', [Validators.required]]
    })
   }

  ngOnInit(): void {
    this.talent = this.fb.group({
      naam: ['', [Validators.required]]
    })
  }

  addTalent(talentNaam: HTMLInputElement): boolean {
    const talent = new Talenten(talentNaam.value,this._authenticationService.user$.value)
    this.newTalent.emit(talent);
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
    this._talentenDataSercie.addNewTalent(new Talenten(this.talent.value.naam,this._authenticationService.user$.value))
  }

}
