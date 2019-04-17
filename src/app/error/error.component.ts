import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit {
  message: string = 'Symbol not found';
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
   
  }

}
