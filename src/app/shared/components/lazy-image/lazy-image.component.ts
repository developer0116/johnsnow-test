import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-lazy-image',
  templateUrl: './lazy-image.component.html',
  styleUrls: ['./lazy-image.component.scss']
})
export class LazyImageComponent implements OnInit {
  @Input() defaultSrc = 'assets/placeholder.jpg';
  @Input() src = 'https://images.unsplash.com/photo-1443890923422-7819ed4101c0?fm=jpg';
  constructor() { }

  ngOnInit() {
  }

}
