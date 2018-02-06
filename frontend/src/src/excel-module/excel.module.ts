import {NgModule} from '@angular/core'
import {BrowserModule} from '@angular/platform-browser'
import {RouterModule, Routes} from '@angular/router'
import {HttpClientModule} from '@angular/common/http'
import {HttpClientInMemoryWebApiModule} from 'angular-in-memory-web-api'


import {NgbModule} from '@ng-bootstrap/ng-bootstrap'
import {BSFormModule} from '../bs-form-module/bs-form.module'


import {ArraySortPipe} from './pipes/arraySortPipe'

import {AdminHomeComponent} from './components/adminHome/adminHome.component'

import {DocumentDailyReportComponent} from './components/report/documentDailyReport/documentDailyReport.component'


import {ShipAgencyComponent} from './components/supplier/shipAgency/shipAgency.component'
import {ShipManagementComponent} from './components/supplier/shipManagement/shipManagement.component'
import {HarborManagementComponent} from './components/supplier/harborManagement/harborManagement.component'
import {TraderManagementComponent} from './components/supplier/traderManagement/traderManagement.component'


import {CoalTypeDictinaryComponent} from './components/dictionary/coalTypeDictionary/coalTypeDictionary.component'


import {DepartmentManagementComponent} from './components/cssuser/departmentManagement/departmentManagement.component'
import {TeamManagementComponent} from './components/cssuser/teamManagement/teamManagement.component'
import {UserManagementComponent} from './components/cssuser/userManagement/userManagement.component'


import {OrderListComponent} from './components/business/orderList/orderList.component'




import {OrderService} from './services/order.service'
import {InMemOrderDataService} from './services/orderMock'


const adminHomeRoutes: Routes = [
    {path : '', redirectTo : 'report1', pathMatch : 'full'},
    {path : 'supplier/shipAgency', component : ShipAgencyComponent},
    {path : 'supplier/ship', component : ShipManagementComponent},
    {path : 'supplier/harbor', component : HarborManagementComponent},
    {path : 'supplier/trader', component : TraderManagementComponent, data : {isCCSTrader : false}},
    {path : 'supplier/ccstrader', component : TraderManagementComponent, data : {isCCSTrader : true}},

    {path : 'ccs/department', component : DepartmentManagementComponent},
    {path : 'ccs/team', component : TeamManagementComponent},
    {path : 'ccs/user', component : UserManagementComponent},


    {path : 'dict/coaltype', component : CoalTypeDictinaryComponent},


    {path : 'business/line', component : OrderListComponent},

    {path : 'report/daily', component : DocumentDailyReportComponent},
    {path : '**', redirectTo : '/report1', pathMatch : 'full'}
]



@NgModule({
    declarations : [
        ArraySortPipe,

        AdminHomeComponent,

        ShipAgencyComponent,
        ShipManagementComponent,
        HarborManagementComponent,
        TraderManagementComponent,


        DepartmentManagementComponent,
        TeamManagementComponent,
        UserManagementComponent,


        CoalTypeDictinaryComponent,


        OrderListComponent,


        DocumentDailyReportComponent
    ],
    imports      : [
        BrowserModule,
        BSFormModule,
        HttpClientModule,

        // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
        // and returns simulated server responses.
        // Remove it when a real server is ready to receive requests.

        HttpClientInMemoryWebApiModule.forRoot(InMemOrderDataService),


        NgbModule.forRoot(),

        RouterModule.forRoot( adminHomeRoutes,
            { enableTracing: false } // <-- debugging purposes only
        )

    ],
    providers    : [OrderService],
    bootstrap    : [AdminHomeComponent]
})
export class ExcelModule {
}
