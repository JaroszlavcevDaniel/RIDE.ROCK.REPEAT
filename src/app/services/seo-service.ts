import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

export interface SeoData {
  title: string;
  description: string;
  url?: string;
  imageUrl?: string;
}

@Injectable({
  providedIn: 'root',
})



export class SeoService {

  constructor(private titleService: Title, private metaService: Meta) {}

  /**
   * Frissíti az oldal SEO meta tageket
   */
  updateSeo(data: SeoData) {
    const url = data.url ?? window.location.href;

    // Title
    this.titleService.setTitle(data.title);

    // Description
    this.metaService.updateTag({ name: 'description', content: data.description });

    // Open Graph
    this.metaService.updateTag({ property: 'og:title', content: data.title });
    this.metaService.updateTag({ property: 'og:description', content: data.description });
    this.metaService.updateTag({ property: 'og:type', content: 'website' });
    this.metaService.updateTag({ property: 'og:url', content: url });
    if (data.imageUrl) {
      this.metaService.updateTag({ property: 'og:image', content: data.imageUrl });
    }

    // Twitter Card
    this.metaService.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.metaService.updateTag({ name: 'twitter:title', content: data.title });
    this.metaService.updateTag({ name: 'twitter:description', content: data.description });
    if (data.imageUrl) {
      this.metaService.updateTag({ name: 'twitter:image', content: data.imageUrl });
    }
  }
}
