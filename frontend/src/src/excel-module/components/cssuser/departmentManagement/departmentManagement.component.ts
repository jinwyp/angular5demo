import {Component, OnInit} from '@angular/core'
import {FormBuilder, FormGroup, Validators} from '@angular/forms'


import {OrderService} from '../../../services/order.service'
import {HttpService} from '../../../../bs-form-module/services/http.service'


import { formErrorHandler, isMobilePhone } from '../../../../bs-form-module/validators/validator'

@Component({
    selector    : 'app-department',
    templateUrl : './departmentManagement.component.html',
    styleUrls   : ['./departmentManagement.component.scss']
})
export class DepartmentManagementComponent implements OnInit {

    departmentForm: FormGroup
    departmentSearchForm: FormGroup
    ignoreDirty: boolean = false


    isShowForm: boolean = false
    isAddNew: boolean   = true

    currentOrderId: number
    departmentList: any[] = []


    pagination: any = {
        pageSize : 20,
        pageNo   : 1,
        total    : 1
    }


    departmentFormError: any              = {}
    departmentFormValidationMessages: any = {
        'name' : {
            'required' : '请填入部门名称!'
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
        this.createDepartmentForm()
        this.createDepartmentSearchForm()
        this.getDepartmentList()
    }





    getDepartmentList(event?: any) {

        let query: any = {
            pageSize : this.pagination.pageSize,
            pageNo   : this.pagination.pageNo
        }

        query = (<any>Object).assign(query, this.departmentSearchForm.value)

        console.log(query)
        this.orderService.getDict('departments', query).subscribe(
            data => { this.departmentList = data},
            error => { this.httpService.errorHandler(error)}
        )
    }


    createDepartmentSearchForm(): void {

        this.departmentSearchForm = this.fb.group({
            'name' : ['']
        })
    }

    departmentFormInputChange(formInputData: any) {
        this.departmentFormError = formErrorHandler(formInputData, this.departmentForm, this.departmentFormValidationMessages)
    }


    createDepartmentForm(): void {

        this.departmentForm = this.fb.group({
            'name' : ['', [Validators.required]]
        })

        this.departmentForm.valueChanges.subscribe(data => {
            this.ignoreDirty = false
            this.departmentFormInputChange(data)
        })
    }


    departmentFormSubmit() {

        if (this.departmentForm.invalid) {
            this.departmentFormInputChange(this.departmentForm.value)
            this.ignoreDirty = true

            console.log('当前信息: ', this.departmentForm, this.departmentFormError)
            return
        }

        const postData = this.departmentForm.value

        if (this.isAddNew) {

            if (this.departmentList.length === 0) {
                postData.id = 1
            } else {
                const maxId = Math.max.apply(Math, this.departmentList.map(list => list.id))
                postData.id = maxId + 1
            }


            this.orderService.addDict('departments', postData).subscribe(
                data => {
                    console.log('保存成功: ', data)
                    this.httpService.successHandler(data)

                    this.getDepartmentList()
                    this.isShowForm = false

                },
                error => {this.httpService.errorHandler(error)}
            )
        } else {
            postData.id = this.currentOrderId
            this.orderService.updateDict('departments', postData).subscribe(
                data => {
                    console.log('修改成功: ', data)
                    this.httpService.successHandler(data)

                    this.getDepartmentList()
                    this.isShowForm = false
                },
                error => {this.httpService.errorHandler(error)}
            )
        }

    }


    showForm(isAddNew: boolean = true, ship?: any) {

        if (isAddNew) {
            this.isAddNew = true

            this.departmentForm.patchValue({
                'name' : ''})

        } else {
            this.isAddNew = false
            this.currentOrderId = ship.id
            this.departmentForm.patchValue(ship)
        }

        this.isShowForm = !this.isShowForm
    }


    deleteItem(ship: any) {

        this.orderService.deleteDict('departments', ship).subscribe(
            data => {
                console.log('删除成功: ', data)
                this.httpService.successHandler(data)

                this.getDepartmentList()
            },
            error => {
                this.httpService.errorHandler(error)
            }
        )
    }

}
