import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TelegramService {

  private token = 'BOT_TOKEN_IDE';
  private chatId = '1628407142';

  constructor(private http: HttpClient) {}

  sendNotification(message: string) {
    const url = `https://api.telegram.org/bot${this.token}/sendMessage`;

    return this.http.post(url, {
      chat_id: this.chatId,
      text: message,
      parse_mode: 'Markdown'
    }).subscribe({
      next: () => console.log('Telegram OK'),
      error: err => console.error('Telegram error', err)
    });
  }
}