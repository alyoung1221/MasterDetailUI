import { Component, OnInit, Input } from '@angular/core';
import {Friend} from "../friend";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  user: Friend = {
    id: 5,
    name: 'Samantha Jones',
    age: 20,
    description: "I am a 20 year who loves shopping and believe a pair of good shoes will take you places in life.",
    interests: ['Baking', 'Fashion', 'Shopping'],
    img: '../assets/images/female.jpg'
  };
  constructor(
  ) {}

  ngOnInit(): void {
  }
}
