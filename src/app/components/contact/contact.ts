import { Component, OnInit } from '@angular/core';
import { Language, LanguageService } from '../../services/language-service';
import { map, Observable } from 'rxjs';
import { ContentService } from '../../services/content-service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Article } from '../../models/article-model';

@Component({
  selector: 'app-contact',
  standalone: false,
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact implements OnInit {

  lang: Language = 'hu';

  presentForm: FormGroup;

  // EZ MÁR CSAK A NYELVHEZ TARTOZÓ RÉSZ
  content$!: Observable<any>;

  constructor(
    private fb: FormBuilder,
    private languageService: LanguageService,
    private contentService: ContentService
  ) {
    this.presentForm = this.fb.group({
      yourName: ['', Validators.required],
      yourEmail: ['', [Validators.required, Validators.email]],
      yourMessage: ['', Validators.required],
    });
  }

ngOnInit(): void {
  this.content$ = this.contentService.getContent();

  this.content$.subscribe(data => {
    console.log('CONTENT FROM SERVICE:', data);
  });
}

  onSubmit(): void {
    if (this.presentForm.valid) {
      alert('Your message sended to Ride.Rock.Repeat 🚀 Thank You!');
      this.presentForm.reset();
    }
  }
}
