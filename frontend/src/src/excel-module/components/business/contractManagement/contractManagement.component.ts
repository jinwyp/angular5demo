import {Component, OnInit} from '@angular/core'
import {FormBuilder, FormGroup, Validators} from '@angular/forms'


import {OrderService} from '../../../services/order.service'
import {HttpService} from '../../../../bs-form-module/services/http.service'


import { formErrorHandler, isMobilePhone } from '../../../../bs-form-module/validators/validator'

@Component({
    selector    : 'app-contract',
    templateUrl : './contractManagement.component.html',
    styleUrls   : ['./contractManagement.component.scss']
})
export class ContractManagementComponent implements OnInit {

    contractForm: FormGroup
    contractSearchForm: FormGroup
    ignoreDirty: boolean = false


    isShowForm: boolean = false
    isAddNew: boolean   = true

    currentOrderId: number
    contractList: any[] = []


    coalTypeList: any[] = []
    orderList: any[] = []
    orderListObject: any = {}
    orderTransactionList: any[] = []


    pagination: any = {
        pageSize : 20,
        pageNo   : 1,
        total    : 1
    }


    contractFormError: any              = {}
    contractFormValidationMessages: any = {
        'orderId' : {
            'required' : '请选择业务线!'
        },
        'orderTransactionId' : {
            'required' : '请选择业务线环节!'
        },
        'coalType' : {
            'required' : '请选择煤种!'
        },
        'quantity' : {
            'required' : '请填入数量!'
        },
        'unitPrice' : {
            'required' : '请填入单价!'
        }
    }


    trackByFn(index: any, item: any) {
        return item ? item.id : undefined
    }


    constructor(
        private fb: FormBuilder,
        private httpService: HttpService,
        private orderService: OrderService
    ) {

    }


    ngOnInit() {
        this.createContractForm()
        this.createContractSearchForm()
        this.getCoalTypeList()
        this.getOrderList()
        this.getContractList()
    }



    getCoalTypeList() {

        this.orderService.getDict('coalType', {}).subscribe(
            data => { this.coalTypeList = data},
            error => { this.httpService.errorHandler(error)}
        )
    }

    getOrderList() {

        this.orderService.getOrders({}).subscribe(
            data => {
                this.orderList = data

                this.orderList.forEach((order) => {
                    this.orderListObject[order.id] = order
                })
            },
            error => { this.httpService.errorHandler(error)}
        )
    }



    getContractList(event?: any) {

        let query: any = {
            pageSize : this.pagination.pageSize,
            pageNo   : this.pagination.pageNo
        }

        query = (<any>Object).assign(query, this.contractSearchForm.value)

        console.log(query)
        this.orderService.getDict('contracts', query).subscribe(
            data => { this.contractList = data},
            error => { this.httpService.errorHandler(error)}
        )
    }


    createContractSearchForm(): void {

        this.contractSearchForm = this.fb.group({
            'coalType' : [''],
            'quantity' : [''],
            'unitPrice' : [''],
        })
    }

    contractFormInputChange(formInputData: any) {
        this.contractFormError = formErrorHandler(formInputData, this.contractForm, this.contractFormValidationMessages)
    }


    createContractForm(): void {

        this.contractForm = this.fb.group({
            'orderId' : ['', [Validators.required]],
            'orderTransactionId' : ['', [Validators.required]],
            'coalType' : ['', [Validators.required]],
            'quantity' : ['', [Validators.required]],
            'unitPrice' : ['', [Validators.required]]
        })

        this.contractForm.valueChanges.subscribe(data => {
            this.ignoreDirty = false
            this.contractFormInputChange(data)
        })
    }


    contractFormSubmit() {

        if (this.contractForm.invalid) {
            this.contractFormInputChange(this.contractForm.value)
            this.ignoreDirty = true

            console.log('当前信息: ', this.contractForm, this.contractFormError)
            return
        }

        const postData = this.contractForm.value

        if (this.isAddNew) {

            if (this.contractList.length === 0) {
                postData.id = 1
            } else {
                const maxId = Math.max.apply(Math, this.contractList.map(list => list.id))
                postData.id = maxId + 1
            }


            this.orderService.addDict('contracts', postData).subscribe(
                data => {
                    console.log('保存成功: ', data)
                    this.httpService.successHandler(data)

                    this.getContractList()
                    this.isShowForm = false

                },
                error => {this.httpService.errorHandler(error)}
            )
        } else {
            postData.id = this.currentOrderId
            this.orderService.updateDict('contracts', postData).subscribe(
                data => {
                    console.log('修改成功: ', data)
                    this.httpService.successHandler(data)

                    this.getContractList()
                    this.isShowForm = false
                },
                error => {this.httpService.errorHandler(error)}
            )
        }

    }


    showForm(isAddNew: boolean = true, ship?: any) {

        this.orderTransactionList = []
        if (isAddNew) {
            this.isAddNew = true

            this.contractForm.patchValue({
                'orderId' : '',
                'orderTransactionId' : '',
                'coalType' : '',
                'quantity' : '',
                'unitPrice' : ''
            })

        } else {
            this.isAddNew = false
            this.currentOrderId = ship.id
            this.contractForm.patchValue(ship)
        }

        this.isShowForm = !this.isShowForm
    }


    deleteItem(ship: any) {

        this.orderService.deleteDict('contracts', ship).subscribe(
            data => {
                console.log('删除成功: ', data)
                this.httpService.successHandler(data)

                this.getContractList()
            },
            error => {
                this.httpService.errorHandler(error)
            }
        )
    }


    filterTransaction (event : any) {

        if (this.contractForm.value.orderId) {
            this.orderTransactionList = this.orderListObject[this.contractForm.value.orderId].transactionList
        }

    }

}
