import {Component, OnInit} from '@angular/core'
import {FormBuilder, FormGroup, Validators} from '@angular/forms'
import {ActivatedRoute} from '@angular/router'

import {OrderService} from '../../../services/order.service'
import {HttpService} from '../../../../bs-form-module/services/http.service'


import { formErrorHandler, isMobilePhone } from '../../../../bs-form-module/validators/validator'


@Component({
    selector    : 'app-trader',
    templateUrl : './traderManagement.component.html',
    styleUrls   : ['./traderManagement.component.scss']
})
export class TraderManagementComponent implements OnInit {

    traderForm: FormGroup
    traderSearchForm: FormGroup
    ignoreDirty: boolean = false


    isShowForm: boolean = false
    isAddNew: boolean   = true

    isCCSTrader: boolean   = false

    currentOrderId: number
    traderList: any[] = []

    traderTypeAllList: any[] = [
        {id : 'TRADER', name : '贸易商'},
        {id : 'MINE', name : '煤炭矿方'},
        {id : 'CCSTRADER', name : 'CCS贸易商'},
        {id : 'POWERPLANT', name : '电厂'},
    ]

    traderTypeList: any[] = [
        {id : 'TRADER', name : '贸易商'},
        {id : 'MINE', name : '煤炭矿方'},
        {id : 'POWERPLANT', name : '电厂'},
    ]

    pagination: any = {
        pageSize : 20,
        pageNo   : 1,
        total    : 1
    }


    traderFormError: any              = {}
    traderFormValidationMessages: any = {
        'name' : {
            'required' : '请填写公司名称!'
        },
        'traderType' : {
            'required' : '请选择贸易商类型!'
        }
    }


    trackByFn(index: any, item: any) {
        return item ? item.id : undefined
    }


    constructor(
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private httpService: HttpService,
        private orderService: OrderService
    ) {

    }


    ngOnInit() {
        this.route.data.subscribe( (data) => this.isCCSTrader = data.isCCSTrader)

        this.createTraderForm()
        this.createTraderSearchForm()
        this.getTraderList()
    }





    getTraderList(event?: any) {

        let query: any = {
            pageSize : this.pagination.pageSize,
            pageNo   : this.pagination.pageNo
        }

        query = (<any>Object).assign(query, this.traderSearchForm.value)

        console.log(query)


        if (this.isCCSTrader) {
            this.orderService.getCCSTraders(query).subscribe(
                data => { this.traderList = data},
                error => { this.httpService.errorHandler(error)}
            )
        } else {
            this.orderService.getTraders(query).subscribe(
                data => { this.traderList = data},
                error => { this.httpService.errorHandler(error)}
            )
        }
    }


    createTraderSearchForm(): void {

        this.traderSearchForm = this.fb.group({
            'name' : [''],
            'traderType' : ['']
        })
    }

    traderFormInputChange(formInputData: any) {
        this.traderFormError = formErrorHandler(formInputData, this.traderForm, this.traderFormValidationMessages)
    }


    createTraderForm(): void {

        if (this.isCCSTrader) {
            this.traderForm = this.fb.group({
                'name' : ['', [Validators.required]],
                'traderType' : ['CCSTRADER', [Validators.required]]
            })
        } else {
            this.traderForm = this.fb.group({
                'name' : ['', [Validators.required]],
                'traderType' : ['', [Validators.required]]
            })
        }


        this.traderForm.valueChanges.subscribe(data => {
            this.ignoreDirty = false
            this.traderFormInputChange(data)
        })
    }


    traderFormSubmit() {

        if (this.traderForm.invalid) {
            this.traderFormInputChange(this.traderForm.value)
            this.ignoreDirty = true

            console.log('当前信息: ', this.traderForm, this.traderFormError)
            return
        }

        const postData = this.traderForm.value

        if (this.isAddNew) {

            if (this.traderList.length === 0) {
                postData.id = 1
            } else {
                const maxId = Math.max.apply(Math, this.traderList.map(list => list.id))
                postData.id = maxId + 1
            }


            if (this.isCCSTrader) {
                this.orderService.addCCSTrader(postData).subscribe(
                    data => {
                        console.log('保存成功: ', data)
                        this.httpService.successHandler(data)

                        this.getTraderList()
                        this.isShowForm = false

                    },
                    error => {this.httpService.errorHandler(error)}
                )
            } else {
                this.orderService.addTrader(postData).subscribe(
                    data => {
                        console.log('保存成功: ', data)
                        this.httpService.successHandler(data)

                        this.getTraderList()
                        this.isShowForm = false

                    },
                    error => {this.httpService.errorHandler(error)}
                )
            }


        } else {
            postData.id = this.currentOrderId

            if (this.isCCSTrader) {
                this.orderService.updateCCSTrader(postData).subscribe(
                    data => {
                        console.log('修改成功: ', data)
                        this.httpService.successHandler(data)

                        this.getTraderList()
                        this.isShowForm = false
                    },
                    error => {this.httpService.errorHandler(error)}
                )
            } else {
                this.orderService.updateTrader(postData).subscribe(
                    data => {
                        console.log('修改成功: ', data)
                        this.httpService.successHandler(data)

                        this.getTraderList()
                        this.isShowForm = false
                    },
                    error => {this.httpService.errorHandler(error)}
                )
            }


        }

    }


    showForm(isAddNew: boolean = true, ship?: any) {

        if (isAddNew) {
            this.isAddNew = true

            this.traderForm.patchValue({
                'name' : ''})

        } else {
            this.isAddNew = false
            this.currentOrderId = ship.id
            this.traderForm.patchValue(ship)
        }

        this.isShowForm = !this.isShowForm
    }


    deleteItem(ship: any) {

        this.orderService.deleteTrader(ship).subscribe(
            data => {
                console.log('删除成功: ', data)
                this.httpService.successHandler(data)

                this.getTraderList()
            },
            error => {
                this.httpService.errorHandler(error)
            }
        )
    }

}
