import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApiService } from './api.service';
import { AgmCoreModule } from '@agm/core';
import { HttpClientModule } from "@angular/common/http";

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { MapComponent } from './map/map.component';
import { TriviaComponent } from './trivia/trivia.component';
import { RecapComponent } from './recap/recap.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'map', component: MapComponent },
  { path: 'trivia', component: TriviaComponent },
  { path: 'recap', component: RecapComponent },
]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MapComponent,
    TriviaComponent,
    RecapComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(
      appRoutes
    ),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCT2v5Owh6TcjngP2fO2Gbis9ihAYYObYQ'
    }),
    HttpClientModule
  ],
  providers: [
    ApiService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
