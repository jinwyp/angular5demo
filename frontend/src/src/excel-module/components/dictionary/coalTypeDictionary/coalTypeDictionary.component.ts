import {Component, OnInit} from '@angular/core'
import {FormBuilder, FormGroup, Validators} from '@angular/forms'


import {OrderService} from '../../../services/order.service'
import {HttpService} from '../../../../bs-form-module/services/http.service'


import { formErrorHandler, isMobilePhone } from '../../../../bs-form-module/validators/validator'

@Component({
    selector    : 'app-coaltype',
    templateUrl : './coalTypeDictionary.component.html',
    styleUrls   : ['./coalTypeDictionary.component.scss']
})
export class CoalTypeDictinaryComponent implements OnInit {

    coalTypeForm: FormGroup
    coalTypeSearchForm: FormGroup
    ignoreDirty: boolean = false


    isShowForm: boolean = false
    isAddNew: boolean   = true

    currentOrderId: number
    coalTypeList: any[] = []


    pagination: any = {
        pageSize : 20,
        pageNo   : 1,
        total    : 1
    }


    coalTypeFormError: any              = {}
    coalTypeFormValidationMessages: any = {
        'name' : {
            'required' : '煤种名称!'
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
        this.createCoalTypeForm()
        this.createCoalTypeSearchForm()
        this.getCoalTypeList()
    }





    getCoalTypeList(event?: any) {

        let query: any = {
            pageSize : this.pagination.pageSize,
            pageNo   : this.pagination.pageNo
        }

        query = (<any>Object).assign(query, this.coalTypeSearchForm.value)

        console.log(query)
        this.orderService.getDict('coalType', query).subscribe(
            data => { this.coalTypeList = data},
            error => { this.httpService.errorHandler(error)}
        )
    }


    createCoalTypeSearchForm(): void {

        this.coalTypeSearchForm = this.fb.group({
            'name' : ['']
        })
    }

    coalTypeFormInputChange(formInputData: any) {
        this.coalTypeFormError = formErrorHandler(formInputData, this.coalTypeForm, this.coalTypeFormValidationMessages)
    }


    createCoalTypeForm(): void {

        this.coalTypeForm = this.fb.group({
            'name' : ['', [Validators.required]]
        })

        this.coalTypeForm.valueChanges.subscribe(data => {
            this.ignoreDirty = false
            this.coalTypeFormInputChange(data)
        })
    }


    coalTypeFormSubmit() {

        if (this.coalTypeForm.invalid) {
            this.coalTypeFormInputChange(this.coalTypeForm.value)
            this.ignoreDirty = true

            console.log('当前信息: ', this.coalTypeForm, this.coalTypeFormError)
            return
        }

        const postData = this.coalTypeForm.value

        if (this.isAddNew) {

            if (this.coalTypeList.length === 0) {
                postData.id = 1
            } else {
                const maxId = Math.max.apply(Math, this.coalTypeList.map(list => list.id))
                postData.id = maxId + 1
            }


            this.orderService.addDict('coalType', postData).subscribe(
                data => {
                    console.log('保存成功: ', data)
                    this.httpService.successHandler(data)

                    this.getCoalTypeList()
                    this.isShowForm = false

                },
                error => {this.httpService.errorHandler(error)}
            )
        } else {
            postData.id = this.currentOrderId
            this.orderService.updateDict('coalType', postData).subscribe(
                data => {
                    console.log('修改成功: ', data)
                    this.httpService.successHandler(data)

                    this.getCoalTypeList()
                    this.isShowForm = false
                },
                error => {this.httpService.errorHandler(error)}
            )
        }

    }


    showForm(isAddNew: boolean = true, ship?: any) {

        if (isAddNew) {
            this.isAddNew = true

            this.coalTypeForm.patchValue({
                'name' : ''})

        } else {
            this.isAddNew = false
            this.currentOrderId = ship.id
            this.coalTypeForm.patchValue(ship)
        }

        this.isShowForm = !this.isShowForm
    }


    deleteItem(ship: any) {

        this.orderService.deleteDict('coalType', ship).subscribe(
            data => {
                console.log('删除成功: ', data)
                this.httpService.successHandler(data)

                this.getCoalTypeList()
            },
            error => {
                this.httpService.errorHandler(error)
            }
        )
    }

}
