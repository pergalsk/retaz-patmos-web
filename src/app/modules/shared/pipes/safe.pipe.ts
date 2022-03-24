import { Pipe, PipeTransform } from '@angular/core';
import {
  DomSanitizer,
  SafeHtml,
  SafeResourceUrl,
  SafeScript,
  SafeStyle,
  SafeUrl,
} from '@angular/platform-browser';

type Sanitized = SafeHtml | SafeStyle | SafeScript | SafeUrl | SafeResourceUrl;

@Pipe({
  name: 'safe',
})
export class SafePipe implements PipeTransform {
  constructor(private domSanitizer: DomSanitizer) {}

  transform(str: string, type: string): Sanitized {
    switch (type) {
      case 'style':
        return this.domSanitizer.bypassSecurityTrustStyle(str);
      case 'script':
        return this.domSanitizer.bypassSecurityTrustScript(str);
      case 'url':
        return this.domSanitizer.bypassSecurityTrustUrl(str);
      case 'resourceUrl':
        return this.domSanitizer.bypassSecurityTrustResourceUrl(str);
      case 'html':
      default:
        return this.domSanitizer.bypassSecurityTrustHtml(str);
    }
  }
}
