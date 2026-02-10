import { Component, OnInit } from '@angular/core';
import { Language, LanguageService } from '../../services/language-service';
import { map, Observable } from 'rxjs';
import { ContentService } from '../../services/content-service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Article } from '../../models/article-model';
import emailjs from 'emailjs-com';

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
    // console.log('CONTENT FROM SERVICE:', data);
  });
}

success = false;
sending = false;

onSubmit(): void {
  if (this.presentForm.invalid || this.sending) return;

  this.sending = true;

  emailjs.send(
        'service_nhs9ip5',
    'template_9b7dp1h',
    {
      yourName: this.presentForm.value.yourName,
      yourEmail: this.presentForm.value.yourEmail,
      yourMessage: this.presentForm.value.yourMessage,
    },
    'kjQe7FQOJlPovmcD4'
  ).then(() => {
    this.presentForm.reset();
    this.success = true;
    this.sending = false;

    setTimeout(() => {
      this.success = false;
    }, 3000);

  }).catch(() => {
    this.sending = false;
    alert('Hiba történt 😢');
  });
}

}
