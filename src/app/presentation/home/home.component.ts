import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserType } from 'src/app/domain/models/user-type.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  birthdate!: string;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  confirmBirthdate(): void {
    let type: UserType = UserType.KID;
    const ageDifMs = Date.now() - new Date(this.birthdate).getTime();
    const ageDate = new Date(ageDifMs);
    const age = Math.abs(ageDate.getUTCFullYear() - 1970);

    if (age >= 18) {
      type = UserType.ADULT;
    }

    localStorage.setItem("userType", type.toString());

    this.router.navigate(["/movies"]);
  }
}
