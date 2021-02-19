import { Component, OnInit, Input } from '@angular/core';
import { ResourceData } from '../../data/resource-data';

@Component({
  selector: 'app-carousel-card',
  templateUrl: './carousel-card.component.html',
  styleUrls: ['./carousel-card.component.css']
})
export class CarouselCardComponent implements OnInit {
  @Input() resource:ResourceData;
  name:string;
  url:string;
  img:string;

  constructor() { }

  ngOnInit() {
    this.name = this.resource["name"];
    this.img = this.resource["imageURL"];
    this.url = "/" + this.resource["category"] + "/" + this.resource["id"];
  }

}
