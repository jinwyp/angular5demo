import {Component, OnInit} from '@angular/core'
import {FormBuilder, FormGroup, Validators} from '@angular/forms'


import {OrderService} from '../../../services/order.service'
import {HttpService} from '../../../../bs-form-module/services/http.service'


import { formErrorHandler, isMobilePhone } from '../../../../bs-form-module/validators/validator'

@Component({
    selector    : 'app-ship',
    templateUrl : './shipManagement.component.html',
    styleUrls   : ['./shipManagement.component.scss']
})
export class ShipManagementComponent implements OnInit {

    shipForm: FormGroup
    shipSearchForm: FormGroup
    ignoreDirty: boolean = false


    isShowForm: boolean = false
    isAddNew: boolean   = true

    currentOrderId: number
    shipList: any[] = []
    shipAgencyList: any[] = []


    pagination: any = {
        pageSize : 20,
        pageNo   : 1,
        total    : 1
    }


    shipFormError: any              = {}
    shipFormValidationMessages: any = {
        'name' : {
            'required' : '请填写船只中文名称!'
        },
        'shipName'     : {
            'required' : '请填写船只英文名称!'
        },
        'company' : {
            'required' : '请选择船只代理公司!'
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
        this.createShipForm()
        this.createShipSearchForm()
        this.getShipList()
        this.getShipAgencyList()
    }



    getShipAgencyList(event?: any) {

        let query: any = {
            pageSize : this.pagination.pageSize,
            pageNo   : this.pagination.pageNo
        }

        query = (<any>Object).assign(query, this.shipSearchForm.value)

        console.log(query)
        this.orderService.getShipAgencies(query).subscribe(
            data => { this.shipAgencyList = data},
            error => { this.httpService.errorHandler(error)}
        )
    }


    getShipList(event?: any) {

        let query: any = {
            pageSize : this.pagination.pageSize,
            pageNo   : this.pagination.pageNo
        }

        query = (<any>Object).assign(query, this.shipSearchForm.value)

        console.log(query)
        this.orderService.getShips(query).subscribe(
            data => { this.shipList = data},
            error => { this.httpService.errorHandler(error)}
        )
    }


    createShipSearchForm(): void {

        this.shipSearchForm = this.fb.group({
            'name' : [''],
            'englishName'     : [''],
            'company' : ['']
        })
    }

    shipFormInputChange(formInputData: any) {
        this.shipFormError = formErrorHandler(formInputData, this.shipForm, this.shipFormValidationMessages)
    }


    createShipForm(): void {

        this.shipForm = this.fb.group({
            'name' : ['', [Validators.required]],
            'englishName'     : ['', [Validators.required]],
            'company'   : ['', [Validators.required]]
        })

        this.shipForm.valueChanges.subscribe(data => {
            this.ignoreDirty = false
            this.shipFormInputChange(data)
        })
    }


    shipFormSubmit() {

        if (this.shipForm.invalid) {
            this.shipFormInputChange(this.shipForm.value)
            this.ignoreDirty = true

            console.log('当前信息: ', this.shipForm, this.shipFormError)
            return
        }

        const postData = this.shipForm.value

        if (this.isAddNew) {

            if (this.shipList.length === 0) {
                postData.id = 1
            } else {
                const maxId = Math.max.apply(Math, this.shipList.map(list => list.id))
                postData.id = maxId + 1
            }


            this.orderService.addShip(postData).subscribe(
                data => {
                    console.log('保存成功: ', data)
                    this.httpService.successHandler(data)

                    this.getShipList()
                    this.isShowForm = false

                },
                error => {this.httpService.errorHandler(error)}
            )
        } else {
            postData.id = this.currentOrderId
            this.orderService.updateShip(postData).subscribe(
                data => {
                    console.log('修改成功: ', data)
                    this.httpService.successHandler(data)

                    this.getShipList()
                    this.isShowForm = false
                },
                error => {this.httpService.errorHandler(error)}
            )
        }

    }


    showForm(isAddNew: boolean = true, ship?: any) {

        if (isAddNew) {
            this.isAddNew = true

            this.shipForm.patchValue({
                'name' : '',
                'englishName'     : '',
                'company' : ''

            })

        } else {
            this.isAddNew = false
            this.currentOrderId = ship.id
            this.shipForm.patchValue(ship)
        }

        this.isShowForm = !this.isShowForm
    }


    deleteItem(ship: any) {

        this.orderService.deleteShip(ship).subscribe(
            data => {
                console.log('删除成功: ', data)
                this.httpService.successHandler(data)

                this.getShipList()
            },
            error => {
                this.httpService.errorHandler(error)
            }
        )
    }

}
