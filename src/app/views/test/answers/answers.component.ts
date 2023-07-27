import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth/auth.service';
import { TestService } from 'src/app/shared/services/test.service';
import { AnswerQuizType } from 'src/types/answer-quiz-type.response';
import { DefaultResponseType } from 'src/types/default-response.type';
import { UserInfoType } from 'src/types/user-info.type';

@Component({
  selector: 'app-answers',
  templateUrl: './answers.component.html',
  styleUrls: ['./answers.component.scss'],
})
export class AnswersComponent implements OnInit {
  userInfo: UserInfoType | null = null;
  testId: string = '';
  quizAnswers!: AnswerQuizType;

  constructor(
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private testService: TestService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.userInfo = this.authService.getUserInfo();

    if (this.userInfo && this.userInfo.userId) {
      this.activatedRoute.queryParams.subscribe(params => {
        if (params['id']) {
          this.testId = params['id'];
          this.testService.getDetailedResult(this.testId, this.userInfo!.userId).subscribe(result => {
            if (result) {
              if ((result as DefaultResponseType).error) {
                throw new Error((result as DefaultResponseType).message);
              }
              this.quizAnswers = result as AnswerQuizType;
            }
          });
        }
      });
    }
  }

  backResult() {
    this.router.navigate(['/result'], { queryParams: { id: this.testId } });
  }
}
