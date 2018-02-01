import { NgModule} from '@angular/core'
import { CommonModule } from '@angular/common'
import { HttpClientModule } from '@angular/common/http'
import { FormsModule, ReactiveFormsModule} from '@angular/forms'
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';


import { NgbDatepickerModule } from './components/ngb-datepicker/datepicker.module'



import { UiSwitchComponent } from './components/ui-switch/ui-switch.component'
import { SwitchComponent } from './components/switch/switch.component'
import { TextInputComponent } from './components/text-input/text-input.component'
import { SelectDropdownComponent } from './components/selectDropdown/selectDropdown.component'
import { MultiSelectComponent } from './components/multiSelect/multiSelect.component'
import { RadioComponent } from './components/radio/radio.component'
import { DatePickerComponent } from './components/datepicker/datepicker.component'
import { AddressDropdownComponent } from './components/addressDropdown/addressDropdown.component'
import { CheckboxComponent } from './components/checkbox/checkbox.component'


import { SimpleNotificationsComponent } from './components/simple-notifications/simple-notifications.component'
import { SimpleNotificationComponent } from './components/simple-notification/simple-notification.component'



import {ForbiddenValidatorDirective} from './validators/custom-validator'



import {FilterArrayPipe} from './pipes/filterArray/filterArray.pipe'
import {FindKeyPipe} from './pipes/findKey/findKey.pipe'
import {MaxPipe} from './pipes/max/max.pipe'


import {HttpService} from './services/http.service'
import {NotificationService} from './services/notification.service'


@NgModule({
    declarations : [
        FilterArrayPipe,
        FindKeyPipe,
        MaxPipe,

        UiSwitchComponent,
        SwitchComponent,
        TextInputComponent,
        SelectDropdownComponent,
        MultiSelectComponent,
        RadioComponent,
        DatePickerComponent,
        AddressDropdownComponent,
        CheckboxComponent,

        ForbiddenValidatorDirective,

      SimpleNotificationComponent,
      SimpleNotificationsComponent
    ],
    imports      : [
        CommonModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,

        NgbDatepickerModule.forRoot()
    ],
    providers    : [
        HttpService,
      NotificationService
    ],
    exports:      [
        CommonModule,
        ReactiveFormsModule,
        HttpClientModule,

        NgbDatepickerModule,


        FilterArrayPipe,
        FindKeyPipe,

        TextInputComponent,
        UiSwitchComponent,
        SwitchComponent,
        SelectDropdownComponent,
        MultiSelectComponent,
        RadioComponent,
        DatePickerComponent,
        AddressDropdownComponent,
        CheckboxComponent,

      SimpleNotificationsComponent
    ],
    bootstrap    : []
})
export class BSFormModule {}
