import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/core/auth/auth.service';
import { TestService } from 'src/app/shared/services/test.service';
import { DefaultResponseType } from 'src/types/default-response.type';
import { PassTestResponseType } from 'src/types/pass-test-response.type';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss'],
})
export class ResultComponent implements OnInit {
  result: string = '';

  constructor(
    private testService: TestService,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    const userInfo = this.authService.getUserInfo();
    if (userInfo) {
      this.activatedRoute.queryParams.subscribe(params => {
        if (params['id']) {
          this.testService.getResult(params['id'], userInfo.userId).subscribe(result => {
            if (result) {
              if ((result as DefaultResponseType).error) {
                throw new Error((result as DefaultResponseType).message);
              }
              this.result = (result as PassTestResponseType).score + '/' + (result as PassTestResponseType).total;
            }
          });
        }
      });
    }
  }
}
