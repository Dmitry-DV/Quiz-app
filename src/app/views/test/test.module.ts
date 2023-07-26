import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TestRoutingModule } from './test-routing.module';
import { TestComponent } from './test/test.component';
import { ResultComponent } from './result/result.component';
import { ChoiceComponent } from './choice/choice.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [ChoiceComponent, TestComponent, ResultComponent],
  imports: [CommonModule, FormsModule, TestRoutingModule],
})
export class TestModule {}
