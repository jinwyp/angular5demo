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

    harborForm: FormGroup
    harborSearchForm: FormGroup
    ignoreDirty: boolean = false


    isShowForm: boolean = false
    isAddNew: boolean   = true

    currentOrderId: number
    harborList: any[] = []


    pagination: any = {
        pageSize : 20,
        pageNo   : 1,
        total    : 1
    }


    harborFormError: any              = {}
    harborFormValidationMessages: any = {
        'name' : {
            'required' : '公司名称!'
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
        this.createHarborForm()
        this.createHarborSearchForm()
        this.getHarborList()
    }





    getHarborList(event?: any) {

        let query: any = {
            pageSize : this.pagination.pageSize,
            pageNo   : this.pagination.pageNo
        }

        query = (<any>Object).assign(query, this.harborSearchForm.value)

        console.log(query)
        this.orderService.getHarbors(query).subscribe(
            data => { this.harborList = data},
            error => { this.httpService.errorHandler(error)}
        )
    }


    createHarborSearchForm(): void {

        this.harborSearchForm = this.fb.group({
            'name' : ['']
        })
    }

    harborFormInputChange(formInputData: any) {
        this.harborFormError = formErrorHandler(formInputData, this.harborForm, this.harborFormValidationMessages)
    }


    createHarborForm(): void {

        this.harborForm = this.fb.group({
            'name' : ['', [Validators.required]]
        })

        this.harborForm.valueChanges.subscribe(data => {
            this.ignoreDirty = false
            this.harborFormInputChange(data)
        })
    }


    harborFormSubmit() {

        if (this.harborForm.invalid) {
            this.harborFormInputChange(this.harborForm.value)
            this.ignoreDirty = true

            console.log('当前信息: ', this.harborForm, this.harborFormError)
            return
        }

        const postData = this.harborForm.value

        if (this.isAddNew) {

            if (this.harborList.length === 0) {
                postData.id = 1
            } else {
                const maxId = Math.max.apply(Math, this.harborList.map(list => list.id))
                postData.id = maxId + 1
            }


            this.orderService.addHarbor(postData).subscribe(
                data => {
                    console.log('保存成功: ', data)
                    this.httpService.successHandler(data)

                    this.getHarborList()
                    this.isShowForm = false

                },
                error => {this.httpService.errorHandler(error)}
            )
        } else {
            postData.id = this.currentOrderId
            this.orderService.updateHarbor(postData).subscribe(
                data => {
                    console.log('修改成功: ', data)
                    this.httpService.successHandler(data)

                    this.getHarborList()
                    this.isShowForm = false
                },
                error => {this.httpService.errorHandler(error)}
            )
        }

    }


    showForm(isAddNew: boolean = true, ship?: any) {

        if (isAddNew) {
            this.isAddNew = true

            this.harborForm.patchValue({
                'name' : ''})

        } else {
            this.isAddNew = false
            this.currentOrderId = ship.id
            this.harborForm.patchValue(ship)
        }

        this.isShowForm = !this.isShowForm
    }


    deleteItem(ship: any) {

        this.orderService.deleteHarbor(ship).subscribe(
            data => {
                console.log('删除成功: ', data)
                this.httpService.successHandler(data)

                this.getHarborList()
            },
            error => {
                this.httpService.errorHandler(error)
            }
        )
    }

}
