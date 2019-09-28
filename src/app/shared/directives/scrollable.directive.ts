import { Directive, HostListener, EventEmitter, Output, ElementRef } from '@angular/core';

@Directive({
  selector: '[appScrollable]'
})
export class ScrollableDirective {

  @Output() scrollPosition = new EventEmitter();

  constructor(public el: ElementRef) { }

  @HostListener('window:scroll', ['$event'])
  onScroll($event) {
    try {
      const scrollPosition = (document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.offsetHeight;
      const pageHeight = document.documentElement.scrollHeight;

      // emit bottom event
      if (Math.ceil(scrollPosition) >= pageHeight) {
        this.scrollPosition.emit('bottom');
      }

    } catch (err) { }
  }
}
