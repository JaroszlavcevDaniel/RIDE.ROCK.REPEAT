import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { PlatformService } from '../core/services/platform-service';
import { Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, DOCUMENT } from '@angular/common';

export interface SeoData {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
}

@Injectable({
  providedIn: 'root'
})
export class SeoService {

  private defaultImage = 'https://riderockrepeat.com/images/ride_rock_repeat_logo.png';

  constructor(
    private meta: Meta,
    private title: Title,
    private platform: PlatformService,
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(DOCUMENT) private document: Document
  ) {}

updateTags(config: SeoData) {

  const image = config.image || this.defaultImage;
  const type = config.type || 'website';

  const url = config.url || (
    isPlatformBrowser(this.platformId)
      ? window.location.href
      : ''
  );

  this.title.setTitle(config.title);

  this.meta.updateTag({ name: 'description', content: config.description });

  if (config.keywords) {
    this.meta.updateTag({ name: 'keywords', content: config.keywords });
  }

  this.meta.updateTag({ property: 'og:title', content: config.title });
  this.meta.updateTag({ property: 'og:description', content: config.description });
  this.meta.updateTag({ property: 'og:image', content: image });
  this.meta.updateTag({ property: 'og:type', content: type });

  if (url) {
    this.meta.updateTag({ property: 'og:url', content: url });
    this.updateCanonical(url);
  }
}

  updateCanonical(url: string) {

  if (!isPlatformBrowser(this.platformId)) return;

  let link: HTMLLinkElement =
    this.document.querySelector("link[rel='canonical']") ||
    this.document.createElement('link');

  link.setAttribute('rel', 'canonical');
  link.setAttribute('href', url);

  this.document.head.appendChild(link);
}
}