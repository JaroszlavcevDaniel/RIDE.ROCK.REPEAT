import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toMarkdownPipe',
  standalone: false
})
export class ToMarkdownPipePipe implements PipeTransform {
  transform(value: any): string {
    if (!value) return '';

    // Ha Promise
    if (value instanceof Promise) {
      console.warn('Promise detected, pipe only works with resolved strings.');
      return '';
    }

    // Ha Observable
    if (typeof value?.subscribe === 'function') {
      console.warn('Observable detected, use async pipe before this pipe.');
      return '';
    }

    // Ha már string
    let text = String(value);

    // Egyszerű Markdown "konverzió" (bővíthető)
    // pl. **bold**, *italic*, # heading, - list
    // Alap példák:
text = text
  .split(/\r?\n/)      // sorokra bontás (Windows + Unix kompatibilis)
  .map(line => {
    // if (line.startsWith(' ### ')) return '<h3>' + line.substring(4) + '</h3>';
line = line.replace(/\.##\s*(.*?)\s*##\./g, '<h2>$1</h2>');
    // if (line.startsWith(' #')) return '<h1>' + line.substring(2) + '</h1>';
    if (line.startsWith('- ')) return '<li>' + line.substring(2) + '</li>';
    // bold **text**
    line = line.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>');
    // italic *text*
    line = line.replace(/\.@\s*(.*?)\s*@\./g, '<i>$1</i>');
    return line;
  })
  .join('<br>');  // sorok összefűzése

    return text;
  }

}
