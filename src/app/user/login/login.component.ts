import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public user: FormGroup | undefined;
  public errorMessage: string = '';

  constructor(private authService: AuthenticationService,
    private router: Router,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.user = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if(this.user){
      this.authService.login(this.user.value.username, 
        this.user.value.password).subscribe(val => {
  if (val) {
    if (this.authService.redirectUrl) {
      this.router.navigateByUrl(this.authService.redirectUrl);
      this.authService.redirectUrl = '';
    } else {
      this.router.navigate(['/emoties']);
    }
  }
}, err => this.errorMessage = err.json().message);
    }
   
  }

}
