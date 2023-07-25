import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { DefaultResponseType } from 'src/types/default-response.type';
import { QuizListType } from 'src/types/quiz-list.type';
import { TestResultType } from 'src/types/test-result.type';

@Injectable({
  providedIn: 'root',
})
export class TestService {
  constructor(private http: HttpClient) {}

  getTests(): Observable<QuizListType[]> {
    return this.http.get<QuizListType[]>(environment.apiHost + 'tests', {});
  }

  getUserResult(userId: number): Observable<DefaultResponseType | TestResultType[]> {
    return this.http.get<DefaultResponseType | TestResultType[]>(environment.apiHost + 'tests/results?userId=' + userId);
  }
}
