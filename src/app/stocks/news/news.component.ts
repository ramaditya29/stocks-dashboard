import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {

  @Input() data;
  constructor() { }

  ngOnInit() {
  }

}
