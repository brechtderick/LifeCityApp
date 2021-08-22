import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.css']
})
export class AvatarComponent implements OnInit {

  username: string;

  constructor() {
    this.username = 'brecht'
   }

  ngOnInit(): void {
  }

}