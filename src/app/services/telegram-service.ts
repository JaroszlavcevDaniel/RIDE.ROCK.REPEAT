import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TelegramService {
  constructor(private http: HttpClient) {}

  sendNotification(message: string): Observable<any> {
    // Helyettünk a Vercel szerver hívja a Telegram API-t
    return this.http.post('/api/sendCommentNotification', { message });
  }
}