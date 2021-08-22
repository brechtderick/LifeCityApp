import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { EmotieDataService } from '../emotie-data.service';
import { Emotieregulatie } from '../emotieregulatie/emotieregulatie.model';

@Component({
  selector: 'app-add-emotie',
  templateUrl: './add-emotie.component.html',
  styleUrls: ['./add-emotie.component.css']
})
export class AddEmotieComponent implements OnInit {
  public emotie: FormGroup 
  public errorMessage: string = '';
  public confirmationMessage: string = '';

@Output() public newEmotie = new EventEmitter<Emotieregulatie>();

  constructor(private fb: FormBuilder, private _emotieDataService: EmotieDataService) {
    this.emotie = this.fb.group({
      beschrijving: ['', [Validators.required, Validators.minLength(1)]],
      emoties: ['',Validators.required]
    })
   }

  ngOnInit(): void {
    this.emotie = this.fb.group({
      beschrijving: ['', [Validators.required, Validators.minLength(1)]],
      emoties: ['',Validators.required]
    })
  }

  addEmotie(emotieDescription: HTMLInputElement, emoties: HTMLInputElement): boolean {
    const emotie = new Emotieregulatie(emotieDescription.value,new Date, emoties.value);
    this.newEmotie.emit(emotie);
    return false;
  }

  createEmoties(): FormGroup {
    return this.fb.group({
      emoties:['',Validators.minLength(1)]
    })
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
    //this.newEmotie.emit(new Emotieregulatie(this.emotie.value.beschrijving,this.emotie.value.emoties))
    this._emotieDataService.addNewEmotie(new Emotieregulatie(this.emotie.value.beschrijving,new Date, this.emotie.value.emoties))
    
    
  }

  

}
