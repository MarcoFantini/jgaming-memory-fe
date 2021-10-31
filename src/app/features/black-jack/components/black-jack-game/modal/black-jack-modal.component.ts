import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-blackjack-modal',
  templateUrl: './black-jack-modal.component.html',
  styleUrls: ['./black-jack-modal.component.scss']
})
export class BlackJackModalComponent implements OnInit {
  @ViewChild('bjModal', {static: false}) bjModal: ElementRef;

  isShow = false;
  text: string;

  constructor() {
  }

  ngOnInit() {
  }

  fitParent(parent: ElementRef) {
    if (this.bjModal !== undefined) {
      const computedParent = window.getComputedStyle(parent.nativeElement);
      if (this.bjModal.nativeElement.offsetHeight !== parent.nativeElement.offsetHeight) {
        const parentHeight = computedParent.getPropertyValue('height');
        let parentPaddingTop = Number(computedParent.getPropertyValue('padding-top').slice(0, -2));
        parentPaddingTop += 1;
        this.bjModal.nativeElement.style.height = parentHeight;
        this.bjModal.nativeElement.style.top = -parentPaddingTop + 'px';
      }
      if (this.bjModal.nativeElement.offsetWidth !== parent.nativeElement.offsetWidth) {
        const parentWidth = computedParent.getPropertyValue('width');
        let parentPaddingLeft = Number(computedParent.getPropertyValue('padding-left').slice(0, -2));
        parentPaddingLeft += 1;
        this.bjModal.nativeElement.style.width = parentWidth;
        this.bjModal.nativeElement.style.left = -parentPaddingLeft + 'px';
      }
    }
  }

  show(text: string) {
    this.text = text;
    this.isShow = true;
    setTimeout(() => {
      this.isShow = false;
    }, 3000);
  }

}
