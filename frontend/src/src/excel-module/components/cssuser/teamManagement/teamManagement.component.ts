import {Component, OnInit} from '@angular/core'
import {FormBuilder, FormGroup, Validators} from '@angular/forms'


import {OrderService} from '../../../services/order.service'
import {HttpService} from '../../../../bs-form-module/services/http.service'


import { formErrorHandler, isMobilePhone } from '../../../../bs-form-module/validators/validator'

@Component({
    selector    : 'app-team',
    templateUrl : './teamManagement.component.html',
    styleUrls   : ['./teamManagement.component.scss']
})
export class TeamManagementComponent implements OnInit {

    teamForm: FormGroup
    teamSearchForm: FormGroup
    ignoreDirty: boolean = false



    isShowForm: boolean = false
    isAddNew: boolean   = true

    currentOrderId: number
    teamList: any[] = []


    pagination: any = {
        pageSize : 20,
        pageNo   : 1,
        total    : 1
    }


    teamFormError: any              = {}
    teamFormValidationMessages: any = {
        'name' : {
            'required' : '请填写业务团队名称!'
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
        this.createTeamForm()
        this.createTeamSearchForm()
        this.getTeamList()
    }





    getTeamList(event?: any) {

        let query: any = {
            pageSize : this.pagination.pageSize,
            pageNo   : this.pagination.pageNo
        }

        query = (<any>Object).assign(query, this.teamSearchForm.value)

        console.log(query)
        this.orderService.getDict('teams', query).subscribe(
            data => { this.teamList = data},
            error => { this.httpService.errorHandler(error)}
        )
    }


    createTeamSearchForm(): void {

        this.teamSearchForm = this.fb.group({
            'name' : ['']
        })
    }

    teamFormInputChange(formInputData: any) {
        this.teamFormError = formErrorHandler(formInputData, this.teamForm, this.teamFormValidationMessages)
    }


    createTeamForm(): void {

        this.teamForm = this.fb.group({
            'name' : ['', [Validators.required]]
        })

        this.teamForm.valueChanges.subscribe(data => {
            this.ignoreDirty = false
            this.teamFormInputChange(data)
        })
    }


    teamFormSubmit() {

        if (this.teamForm.invalid) {
            this.teamFormInputChange(this.teamForm.value)
            this.ignoreDirty = true

            console.log('当前信息: ', this.teamForm, this.teamFormError)
            return
        }

        const postData = this.teamForm.value

        if (this.isAddNew) {

            if (this.teamList.length === 0) {
                postData.id = 1
            } else {
                const maxId = Math.max.apply(Math, this.teamList.map(list => list.id))
                postData.id = maxId + 1
            }


            this.orderService.addDict('teams', postData).subscribe(
                data => {
                    console.log('保存成功: ', data)
                    this.httpService.successHandler(data)

                    this.getTeamList()
                    this.isShowForm = false

                },
                error => {this.httpService.errorHandler(error)}
            )
        } else {
            postData.id = this.currentOrderId
            this.orderService.updateDict('teams', postData).subscribe(
                data => {
                    console.log('修改成功: ', data)
                    this.httpService.successHandler(data)

                    this.getTeamList()
                    this.isShowForm = false
                },
                error => {this.httpService.errorHandler(error)}
            )
        }

    }


    showForm(isAddNew: boolean = true, ship?: any) {

        if (isAddNew) {
            this.isAddNew = true

            this.teamForm.patchValue({
                'name' : ''
            })

        } else {
            this.isAddNew = false
            this.currentOrderId = ship.id
            this.teamForm.patchValue(ship)
        }

        this.isShowForm = !this.isShowForm
    }


    deleteItem(ship: any) {

        this.orderService.deleteDict('teams', ship).subscribe(
            data => {
                console.log('删除成功: ', data)
                this.httpService.successHandler(data)

                this.getTeamList()
            },
            error => {
                this.httpService.errorHandler(error)
            }
        )
    }

}
