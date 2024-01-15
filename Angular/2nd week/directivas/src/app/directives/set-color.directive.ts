import { Directive, HostBinding, HostListener, Input} from '@angular/core';

@Directive({
  selector: '[setColor]',
  standalone: true
})
export class SetColorDirective{
  @Input({alias: 'setColor', required: true})
  set color(color: string) {
    this.bgColor = color;
  }
  @HostBinding('style.backgroundColor') bgColor?: string;
  @HostBinding('style.color') textColor?: string;

  @HostListener('click')
  onClick() {
    this.textColor = this.textColor !== "white" ? "white" : "black";
  }
}
