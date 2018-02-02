import {Component, OnInit} from '@angular/core'
import {FormBuilder, FormGroup, Validators} from '@angular/forms'


import {OrderService} from '../../../services/order.service'
import {HttpService} from '../../../../bs-form-module/services/http.service'


import { formErrorHandler, isMobilePhone } from '../../../../bs-form-module/validators/validator'

@Component({
    selector    : 'app-user',
    templateUrl : './userManagement.component.html',
    styleUrls   : ['./userManagement.component.scss']
})
export class UserManagementComponent implements OnInit {

    userForm: FormGroup
    userSearchForm: FormGroup
    ignoreDirty: boolean = false


    isShowForm: boolean = false
    isAddNew: boolean   = true

    currentOrderId: number
    userList: any[] = []
    departmentList: any[] = []
    teamList: any[] = []


    pagination: any = {
        pageSize : 20,
        pageNo   : 1,
        total    : 1
    }


    userFormError: any              = {}
    userFormValidationMessages: any = {
        'name' : {
            'required' : '请填写姓名!'
        },
        'phone' : {
            'required' : '请填写手机!',
            'mobilePhone' : '请填写手机!'
        },
        'departmentId' : {
            'required' : '请选择部门!'
        },
        'teamId' : {
            'required' : '请选择团队!'
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
        this.createUserForm()
        this.createUserSearchForm()
        this.getUserList()
        this.getDepartmentList()
        this.getTeamList()
    }


    getDepartmentList(event?: any) {

        this.orderService.getDict('departments', {}).subscribe(
            data => { this.departmentList = data},
            error => { this.httpService.errorHandler(error)}
        )
    }


    getTeamList(event?: any) {

        this.orderService.getDict('teams', {}).subscribe(
            data => { this.teamList = data},
            error => { this.httpService.errorHandler(error)}
        )
    }



    getUserList(event?: any) {

        let query: any = {
            pageSize : this.pagination.pageSize,
            pageNo   : this.pagination.pageNo
        }

        query = (<any>Object).assign(query, this.userSearchForm.value)

        console.log(query)
        this.orderService.getDict('users', query).subscribe(
            data => { this.userList = data},
            error => { this.httpService.errorHandler(error)}
        )
    }


    createUserSearchForm(): void {

        this.userSearchForm = this.fb.group({
            'name' : [''],
            'phone' : [''],
            'teamId' : [''],
            'departmentId' : ['']
        })
    }

    userFormInputChange(formInputData: any) {
        this.userFormError = formErrorHandler(formInputData, this.userForm, this.userFormValidationMessages)
    }


    createUserForm(): void {

        this.userForm = this.fb.group({
            'name' : ['', [Validators.required]],
            'phone' : ['', [Validators.required, isMobilePhone()]],
            'teamId' : ['', [Validators.required]],
            'departmentId' : ['', [Validators.required]],
        })

        this.userForm.valueChanges.subscribe(data => {
            this.ignoreDirty = false
            this.userFormInputChange(data)
        })
    }


    userFormSubmit() {

        if (this.userForm.invalid) {
            this.userFormInputChange(this.userForm.value)
            this.ignoreDirty = true

            console.log('当前信息: ', this.userForm, this.userFormError)
            return
        }

        const postData = this.userForm.value

        if (this.isAddNew) {

            if (this.userList.length === 0) {
                postData.id = 1
            } else {
                const maxId = Math.max.apply(Math, this.userList.map(list => list.id))
                postData.id = maxId + 1
            }


            this.orderService.addDict('users', postData).subscribe(
                data => {
                    console.log('保存成功: ', data)
                    this.httpService.successHandler(data)

                    this.getUserList()
                    this.isShowForm = false

                },
                error => {this.httpService.errorHandler(error)}
            )
        } else {
            postData.id = this.currentOrderId
            this.orderService.updateDict('users', postData).subscribe(
                data => {
                    console.log('修改成功: ', data)
                    this.httpService.successHandler(data)

                    this.getUserList()
                    this.isShowForm = false
                },
                error => {this.httpService.errorHandler(error)}
            )
        }

    }


    showForm(isAddNew: boolean = true, ship?: any) {

        if (isAddNew) {
            this.isAddNew = true

            this.userForm.patchValue({
                'name' : '',
                'phone' : '',
                'teamId' : '',
                'departmentId' : ''
            })

        } else {
            this.isAddNew = false
            this.currentOrderId = ship.id
            this.userForm.patchValue(ship)
        }

        this.isShowForm = !this.isShowForm
    }


    deleteItem(ship: any) {

        this.orderService.deleteDict('users', ship).subscribe(
            data => {
                console.log('删除成功: ', data)
                this.httpService.successHandler(data)

                this.getUserList()
            },
            error => {
                this.httpService.errorHandler(error)
            }
        )
    }

}
