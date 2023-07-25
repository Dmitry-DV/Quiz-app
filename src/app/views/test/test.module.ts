import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TestRoutingModule } from './test-routing.module';
import { TestComponent } from './test/test.component';
import { ResultComponent } from './result/result.component';
import { ChoiceComponent } from './choice/choice.component';

@NgModule({
  declarations: [ChoiceComponent, TestComponent, ResultComponent],
  imports: [CommonModule, TestRoutingModule],
})
export class TestModule {}
