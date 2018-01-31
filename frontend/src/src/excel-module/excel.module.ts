import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { HttpClientModule } from '@angular/common/http'
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api'



import {NgbModule} from '@ng-bootstrap/ng-bootstrap'
import {BSFormModule} from '../bs-form-module/bs-form.module'


import { HomeComponent } from './components/home/home.component'

import { OrderService } from './services/order.service'
import { InMemOrderDataService } from './services/orderMock'

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    BrowserModule,
    BSFormModule,
    HttpClientModule,

    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.

    HttpClientInMemoryWebApiModule.forRoot(InMemOrderDataService),


    NgbModule.forRoot()
  ],
  providers: [OrderService],
  bootstrap: [HomeComponent]
})
export class ExcelModule { }
