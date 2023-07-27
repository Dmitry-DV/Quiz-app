import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth/auth.service';
import { TestService } from 'src/app/shared/services/test.service';
import { ActionTestType } from 'src/types/action-test.type';
import { DefaultResponseType } from 'src/types/default-response.type';
import { QuizType } from 'src/types/quiz.type';
import { UserResultType } from 'src/types/user-result.type';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss'],
})
export class TestComponent implements OnInit {
  quiz!: QuizType;
  timerSeconds: number = 59;
  currentQuestionIndex: number = 1;
  choseAnswerId: number | null = null;
  actionTestType = ActionTestType;
  readonly userResult: UserResultType[] = [];
  private interval: number = 0;

  constructor(
    private activatedRoute: ActivatedRoute,
    private testService: TestService,
    private authService: AuthService,
    private router: Router,
  ) {}

  get activeQuestion() {
    return this.quiz.questions[this.currentQuestionIndex - 1];
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      if (params['id']) {
        this.testService.getQuiz(params['id']).subscribe(result => {
          if ((result as DefaultResponseType).error) {
            throw new Error((result as DefaultResponseType).message);
          }
          this.quiz = result as QuizType;
          this.startQuiz();
        });
      }
    });
  }

  move(action: ActionTestType): void {
    const findCurrentResult = (): UserResultType | undefined => {
      return this.userResult.find(item => item.questionId === this.activeQuestion.id);
    };

    if (this.choseAnswerId) {
      const existingResult = findCurrentResult();
      if (existingResult) {
        existingResult.chosenAnswerId = this.choseAnswerId;
      } else {
        this.userResult.push({
          questionId: this.activeQuestion.id,
          chosenAnswerId: this.choseAnswerId,
        });
      }
    }

    if (action === ActionTestType.next || action === ActionTestType.pass) {
      if (this.currentQuestionIndex === this.quiz.questions.length) {
        clearInterval(this.interval);
        this.complete();
        return;
      }
      this.currentQuestionIndex++;
      this.choseAnswerId = null;
    } else {
      this.currentQuestionIndex--;
    }

    const currentResult = findCurrentResult();
    if (currentResult) {
      this.choseAnswerId = currentResult.chosenAnswerId;
    }
  }

  private startQuiz(): void {
    this.interval = window.setInterval(() => {
      this.timerSeconds--;
      if (this.timerSeconds === 0) {
        clearInterval(this.interval);
        this.complete();
      }
    }, 1000);
  }

  private complete(): void {
    const userInfo = this.authService.getUserInfo();
    if (userInfo) {
      this.testService.passQuiz(this.quiz.id, userInfo.userId, this.userResult).subscribe(result => {
        if (result) {
          if ((result as DefaultResponseType).error) {
            throw new Error((result as DefaultResponseType).message);
          }
          this.router.navigate(['/result'], { queryParams: { id: this.quiz.id } });
        }
      });
    }
  }
}
