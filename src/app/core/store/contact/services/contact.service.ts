import {Injectable} from '@angular/core';
import {Contact} from '../model/contact.model';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../../environments/environment';
import {Observable} from 'rxjs';
import {AckJSON} from '../../../model/ack.model';

@Injectable({providedIn: 'root'})
export class ContactService {
  readonly testBaseURL: string = `${environment.apiUrl}/contact`;

  constructor(
    private http: HttpClient
  ) { }

  sendMail(contact: Contact): Observable<AckJSON> {
    console.log('send-mail contact service');
    return this.http.post<AckJSON>(`${this.testBaseURL}`, Contact.toJSON(contact));
  }
}
