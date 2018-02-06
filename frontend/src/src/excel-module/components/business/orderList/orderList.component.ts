import {Component, OnInit} from '@angular/core'
import {FormBuilder, FormGroup, Validators} from '@angular/forms'


import {OrderService} from '../../../services/order.service'
import {HttpService} from '../../../../bs-form-module/services/http.service'


import { formErrorHandler, isMobilePhone } from '../../../../bs-form-module/validators/validator'

@Component({
    selector    : 'app-order',
    templateUrl : './orderList.component.html',
    styleUrls   : ['./orderList.component.scss']
})
export class OrderListComponent implements OnInit {

    orderForm: FormGroup
    orderUpstreamCompanyForm: FormGroup
    orderSearchForm: FormGroup
    ignoreDirty: boolean = false
    ignoreDirty2: boolean = false


    isShowForm: boolean = false
    isAddNew: boolean   = true

    currentOrderId: number
    orderList: any[] = []
    departmentList: any[] = []
    teamList: any[] = []

    traderList: any[] = []
    traderListObject: any = {}
    CCSTraderList: any[] = []
    CCSAccountingList: any[] = []
    nonCCSTraderList: any[] = []
    traderListOptions: any[] = []


    upstreamBridgeCompany : any[] = []
    downstreamBridgeCompany : any[] = []
    transactionList : any[] = []
    companyList : any[] = []



    customerTypeList : any[] = [
        {id: 'TRADER', name: '贸易公司'},
        {id: 'CCSTRADER', name: 'CCS贸易公司'},
        {id: 'CCSACCOUNTING', name: 'CCS账务公司'},
        {id: 'OVERSELLING', name: '过量公司'},
        {id: 'CCSOVERSELLING', name: 'CCS过量公司'},
        {id: 'LC', name: '代开证公司'},
    ]



    pagination: any = {
        pageSize : 20,
        pageNo   : 1,
        total    : 1
    }


    orderFormError: any              = {}
    orderUpstreamCompanyFormError: any  = {}
    orderFormValidationMessages: any = {
        'name' : {
            'required' : '请填写业务线名称!'
        },
        'departmentId' : {
            'required' : '请选择事业部!'
        },
        'teamId' : {
            'required' : '请选择团队!'
        },
        'upstreamId' : {
            'required' : '请选择上游公司!'
        },
        'mainAccountingId' : {
            'required' : '请选择主账务公司!'
        },
        'downstreamId' : {
            'required' : '请选择下游公司!'
        },
        'terminalClientId' : {
            'required' : '请选择终端公司!'
        },

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
        this.createOrderForm()
        this.createUpstreamCompanyForm()

        this.createOrderSearchForm()

        this.getDepartmentList()
        this.getTeamList()

        this.getOrderList()
        this.getTraderList()
    }


    getDepartmentList() {

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

    getTraderList() {
        this.orderService.getTraders({}).subscribe(
            data => {
                this.traderList = data

                this.traderList.slice().forEach( company => {

                    this.traderListObject[company.id] = company


                    if (company.traderType === 'CCSTRADER') {
                        this.CCSTraderList.push(company)
                    }

                    if (company.traderType === 'CCSACCOUNTING') {
                        this.CCSAccountingList.push(company)
                    }

                    if (company.traderType !== 'CCSTRADER' && company.traderType !== 'CCSACCOUNTING') {
                        this.nonCCSTraderList.push(company)
                    }
                })

            },
            error => { this.httpService.errorHandler(error)}
        )
    }


    getOrderList(event?: any) {

        let query: any = {
            pageSize : this.pagination.pageSize,
            pageNo   : this.pagination.pageNo
        }

        query = (<any>Object).assign(query, this.orderSearchForm.value)

        console.log(query)
        this.orderService.getOrders(query).subscribe(
            data => { this.orderList = data},
            error => { this.httpService.errorHandler(error)}
        )
    }


    createOrderSearchForm(): void {

        this.orderSearchForm = this.fb.group({
            'name' : ['']
        })
    }


    orderFormInputChange(formInputData: any) {
        this.orderFormError = formErrorHandler(formInputData, this.orderForm, this.orderFormValidationMessages)
    }
    createOrderForm(): void {

        this.orderForm = this.fb.group({
            'departmentId' : ['', [Validators.required]],
            'teamId' : ['', [Validators.required]],
            'name' : ['', []],
            'upstreamId' : ['', [Validators.required]],
            'mainAccountingId' : ['', [Validators.required]],
            'downstreamId' : ['', [Validators.required]],
            'terminalClientId' : ['', []]
        })

        this.orderForm.valueChanges.subscribe(data => {
            this.ignoreDirty = false
            this.orderFormInputChange(data)
        })
    }


    orderFormSubmit() {

        if (this.orderForm.invalid) {
            this.orderFormInputChange(this.orderForm.value)
            this.ignoreDirty = true

            console.log('当前信息: ', this.orderForm, this.orderFormError)
            return
        }

        const postData = this.orderForm.value
        postData.upstreamBridge = this.upstreamBridgeCompany
        postData.downBridge = this.downstreamBridgeCompany
        postData.companyList = this.companyList
        postData.transactionList = this.transactionList

        if (this.isAddNew) {

            if (this.orderList.length === 0) {
                postData.id = 1
            } else {
                const maxId = Math.max.apply(Math, this.orderList.map(list => list.id))
                postData.id = maxId + 1
            }



            this.orderService.addOrder(postData).subscribe(
                data => {
                    console.log('保存成功: ', data)
                    this.httpService.successHandler(data)

                    this.getOrderList()
                    this.isShowForm = false

                },
                error => {this.httpService.errorHandler(error)}
            )
        } else {
            postData.id = this.currentOrderId

            this.orderService.updateOrder(postData).subscribe(
                data => {
                    console.log('修改成功: ', data)
                    this.httpService.successHandler(data)

                    this.getOrderList()
                    this.isShowForm = false
                },
                error => {this.httpService.errorHandler(error)}
            )
        }
    }


    showForm(isAddNew: boolean = true, order?: any) {

        if (isAddNew) {
            this.isAddNew = true

            this.orderForm.patchValue({
                'name' : ''
            })

        } else {
            this.isAddNew = false
            this.currentOrderId = order.id

            if (Array.isArray(order.upstreamBridge) )  {
                this.upstreamBridgeCompany = order.upstreamBridge
            }
            if (Array.isArray(order.downBridge) )  {
                this.downstreamBridgeCompany = order.downBridge
            }

            this.orderForm.patchValue(order)
        }

        this.isShowForm = !this.isShowForm
    }


    deleteItem(order: any) {

        this.orderService.deleteOrder(order).subscribe(
            data => {
                console.log('删除成功: ', data)
                this.httpService.successHandler(data)

                this.getOrderList()
            },
            error => {
                this.httpService.errorHandler(error)
            }
        )
    }


    orderUpstreamCompanyFormInputChange(formInputData : any) {
        this.orderUpstreamCompanyFormError = formErrorHandler(formInputData, this.orderUpstreamCompanyForm, this.orderFormValidationMessages)
    }
    createUpstreamCompanyForm(): void {

        this.orderUpstreamCompanyForm = this.fb.group({
            'customerType'    : ['', [Validators.required ] ],
            'companyId'    : ['', [Validators.required ] ]
        } )

        this.orderUpstreamCompanyForm.valueChanges.subscribe(data => {
            this.ignoreDirty2 = false
            this.orderUpstreamCompanyFormInputChange(data)
        })
    }


    filterCompanyList (event : any) {

        this.traderListOptions = []

        if (this.orderUpstreamCompanyForm.value.customerType === 'TRADER'
            || this.orderUpstreamCompanyForm.value.customerType === 'OVERSELLING'
            || this.orderUpstreamCompanyForm.value.customerType === 'LC'
        ) {
            this.traderListOptions = this.nonCCSTraderList.slice()
        }


        if (this.orderUpstreamCompanyForm.value.customerType === 'CCSTRADER' || this.orderUpstreamCompanyForm.value.customerType === 'CCSOVERSELLING') {

            this.traderListOptions = this.CCSTraderList.slice()
        }

        if (this.orderUpstreamCompanyForm.value.customerType === 'CCSACCOUNTING' ) {

            this.traderListOptions = this.CCSAccountingList.slice()
        }

    }


    createBridgeCompany (type: string) {

        if (this.orderUpstreamCompanyForm.invalid) {
            this.orderUpstreamCompanyFormInputChange(this.orderUpstreamCompanyForm.value)
            this.ignoreDirty2 = true

            return
        }

        if (this.orderUpstreamCompanyForm.value.customerType === -1 || this.orderUpstreamCompanyForm.value.companyId === -1 ) {

            if (this.orderUpstreamCompanyForm.value.customerType === -1) {
                this.orderUpstreamCompanyFormError['customerType'] = '请选择客户类型!'
            }

            if (this.orderUpstreamCompanyForm.value.companyId === -1) {
                this.orderUpstreamCompanyFormError['companyId'] = '请选择公司!'
            }

            // console.log(this.orderOtherPartyFormError)
            this.ignoreDirty2 = true
            return
        }

        const newCompany : any = {
            'customerType'    : this.orderUpstreamCompanyForm.value.customerType,
            'companyId'    : this.orderUpstreamCompanyForm.value.companyId,
            'position' : 10
        }

        if (type === 'upstream') {
            if (this.upstreamBridgeCompany.length > 0) {
                const maxId = Math.max.apply(Math, this.upstreamBridgeCompany.map(list => list.position))
                newCompany.position = maxId + 10
            }
            this.upstreamBridgeCompany.push(newCompany)

        } else {
            if (this.downstreamBridgeCompany.length > 0) {
                const maxId = Math.max.apply(Math, this.downstreamBridgeCompany.map(list => list.position))
                newCompany.position = maxId + 10
            }
            this.downstreamBridgeCompany.push(newCompany)
        }


        this.orderUpstreamCompanyForm.reset({
            'customerType'    : '',
            'companyId'    : ''
        })

        this.lineName()
    }


    changeBridgeCompanyPosition (direction : string, type: string, item: any) {

        if (type === 'upstream') {
            const currentIndex = this.upstreamBridgeCompany.indexOf(item)
            const currentItem = {
                'customerType'    : item.customerType,
                'companyId'    : item.companyId,
                'position' : item.position
            }

            let tempIndex : number = -1
            if (direction === 'up') {
                tempIndex = currentIndex - 1
            } else {
                tempIndex = currentIndex + 1
            }

            const tempItem = {
                'customerType'    : this.upstreamBridgeCompany[tempIndex].customerType,
                'companyId'    : this.upstreamBridgeCompany[tempIndex].companyId,
                'position' : this.upstreamBridgeCompany[tempIndex].position
            }

            this.upstreamBridgeCompany[currentIndex] = {
                'customerType'    : tempItem.customerType,
                'companyId'    : tempItem.companyId,
                'position' : currentItem.position
            }

            this.upstreamBridgeCompany[tempIndex] = {
                'customerType'    : currentItem.customerType,
                'companyId'    : currentItem.companyId,
                'position' : tempItem.position
            }

        } else {
            const currentIndex = this.downstreamBridgeCompany.indexOf(item)
            const currentItem = {
                'customerType'    : item.customerType,
                'companyId'    : item.companyId,
                'position' : item.position
            }

            let tempIndex : number = -1
            if (direction === 'up') {
                tempIndex = currentIndex - 1
            } else {
                tempIndex = currentIndex + 1
            }

            const tempItem = {
                'customerType'    : this.downstreamBridgeCompany[tempIndex].customerType,
                'companyId'    : this.downstreamBridgeCompany[tempIndex].companyId,
                'position' : this.downstreamBridgeCompany[tempIndex].position
            }

            this.downstreamBridgeCompany[currentIndex] = {
                'customerType'    : tempItem.customerType,
                'companyId'    : tempItem.companyId,
                'position' : currentItem.position
            }

            this.downstreamBridgeCompany[tempIndex] = {
                'customerType'    : currentItem.customerType,
                'companyId'    : currentItem.companyId,
                'position' : tempItem.position
            }
        }

        this.lineName()
    }

    delBridgeCompany (type: string, item: any) {

        if (type === 'upstream') {
            const index = this.upstreamBridgeCompany.indexOf(item)
            this.upstreamBridgeCompany.splice(index, 1)
        } else {
            const index = this.downstreamBridgeCompany.indexOf(item)
            this.downstreamBridgeCompany.splice(index, 1)
        }

        this.lineName()
    }




    lineName() {
        this.companyList = []
        this.transactionList = []

        if (this.orderForm.value.upstreamId && this.orderForm.value.mainAccountingId && this.orderForm.value.downstreamId ) {

            this.companyList.push({companyId : this.orderForm.value.upstreamId, companyName : this.traderListObject[this.orderForm.value.upstreamId].name, customerType: 'upstream'})

            this.upstreamBridgeCompany.forEach( company => {
                this.companyList.push({companyId : company.companyId, companyName : this.traderListObject[company.companyId].name, customerType: company.customerType})
            })

            this.companyList.push({companyId : this.orderForm.value.mainAccountingId, companyName : this.traderListObject[this.orderForm.value.mainAccountingId].name, customerType: 'mainAccounting'})

            this.downstreamBridgeCompany.forEach( company => {
                this.companyList.push({companyId : company.companyId, companyName : this.traderListObject[company.companyId].name, customerType: company.customerType})
            })

            this.companyList.push({companyId : this.orderForm.value.downstreamId, companyName : this.traderListObject[this.orderForm.value.downstreamId].name, customerType: 'downstream'})


            if (this.orderForm.value.terminalClientId) {
                this.companyList.push({companyId : this.orderForm.value.terminalClientId, companyName : this.traderListObject[this.orderForm.value.terminalClientId].name, customerType: 'terminalClient'})
            }

            const lineName = this.companyList.map(company => company.companyName).join(' - ')
            this.orderForm.patchValue({name : lineName})

            this.companyList.reduce( (prev, current, index) => {

                this.transactionList.push({
                    id : index,
                    sourceCompanyId : prev.companyId,
                    sourceCompanyName : prev.companyName,
                    targetCompanyId : current.companyId,
                    targetCompanyName : current.companyName,
                    transactionName : prev.companyName + ' => ' + current.companyName,
                    name : prev.companyName + ' => ' + current.companyName
                })
                return current

            })

        }

    }



}
