import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoltComponent } from './shared/layolt/layolt.component';
import { HeaderComponent } from './shared/layolt/header/header.component';
import { FooterComponent } from './shared/layolt/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    LayoltComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
