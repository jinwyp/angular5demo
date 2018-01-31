import {Component, OnInit} from '@angular/core'
import {FormBuilder, FormGroup, Validators} from '@angular/forms'


import { OrderService } from '../../../services/order.service'
import { HttpService } from '../../../../bs-form-module/services/http.service'



import { formErrorHandler, isMobilePhone, isMatched, checkFieldIsExist } from '../../../../bs-form-module/validators/validator'

@Component({
  selector    : 'app-document-daily-report',
  templateUrl : './documentDailyReport.component.html',
  styleUrls   : ['./documentDailyReport.component.scss']
})
export class DocumentDailyReportComponent implements OnInit {

  db : any

  orderForm: FormGroup
  orderSearchForm: FormGroup
  ignoreDirty: boolean = false


  isShowForm: boolean = false
  isAddNew: boolean   = true

  currentOrderId : number
  orderList: any[] = []


  pagination: any = {
    pageSize : 20,
    pageNo   : 1,
    total    : 1
  }




  orderFormError : any = {}
  orderFormValidationMessages: any = {
    'businessName'  : {
      'required'      : '请选择业务线!'
    },
    'shipName'  : {
      'required'      : '请选择船名!'
    },
    'shippingDate'  : {
      'required'      : '请填写发运日期!'
    },
    'contract'  : {
      'required'      : '请填写合同!'
    },
    'ladingBill'  : {
      'required'      : '请填写提单!'
    },


    'businessInvoice'  : {
      'required'      : '请填写商业发票!'
    },
    'upstreamInvoice'  : {
      'required'      : '请填写上游发票!'
    },
    'originalFactoryInvoice'  : {
      'required'      : '请填写原厂发票!'
    },

    'forMe'  : {
      'required'      : '请填写forMe!'
    },
    'loadingReport'  : {
      'required'      : '请填写装港报告!'
    },
    'unloadingReport'  : {
      'required'      : '请填写卸港报告!'
    },
    'customsDeclaration'  : {
      'required'      : '请填写报关单!'
    },
    'goodsRight'  : {
      'required'      : '请填写货权!'
    },

    'company'  : {
      'required'      : '请选择所属公司!'
    },
    'shipStatus'  : {
      'required'      : '请选择船舶状态!'
    }
  }



  businessNameList : any[] = []

  shipNameList : any[] = []


  fileOptions : any[] = [
    { id : 1, name : '不需要备案'},
    { id : 2, name : '无(暂缺文件)'},
    { id : 3, name : '缺下游文件'},
    { id : 4, name : '已备案'},
  ]


  companyList : any[] = [
    { id : 1, name : '华东公司'},
    { id : 2, name : '华南公司'},
    { id : 3, name : '华中公司'},
    { id : 4, name : '国际采购部-印尼公司'},
  ]

  shipStatusList : any[] = [
    { id : 1, name : '完船'},
    { id : 2, name : '未完'},
  ]

  trackByFn(index: any, item: any) {
    return item ? item.id : undefined
  }


  constructor(
    private fb: FormBuilder,
    private httpService: HttpService,
    private orderService: OrderService

  ) {

  }


  ngOnInit () {
    this.createOrderForm()
    this.createOrderSearchForm()
    this.getOrderList()
    this.getData()
  }


  createOrderSearchForm(): void {

    this.orderSearchForm = this.fb.group({
      'businessName'    : ['' ],
      'shipName'    : ['' ],
      'shippingDate'    : [null ],
      'contract'    : ['' ],
      'ladingBill'    : ['' ]
    } )
  }

  getData () {

    this.orderService.getBusinessNames().subscribe(
      data => {
        this.businessNameList = data
      },
      error => {this.httpService.errorHandler(error) }
    )

    this.orderService.getShipNames().subscribe(
      data => {
        this.shipNameList = data
      },
      error => {this.httpService.errorHandler(error) }
    )
  }


  getOrderList (event? : any) {

    let query : any = {
      pageSize: this.pagination.pageSize,
      pageNo: this.pagination.pageNo
    }

    query = (<any>Object).assign(query, this.orderSearchForm.value)

    console.log(query)
    this.orderService.getOrders(query).subscribe(
        data => {
            this.orderList = data
        },
        error => {this.httpService.errorHandler(error) }
    )
  }


  orderFormInputChange(formInputData : any) {
    this.orderFormError = formErrorHandler(formInputData, this.orderForm, this.orderFormValidationMessages)
  }



  createOrderForm(): void {

    this.orderForm = this.fb.group({
      'businessName'    : ['', [Validators.required ] ],
      'shipName'    : ['', [Validators.required ] ],
      'shippingDate'    : [null, [Validators.required ] ],
      'contract'    : ['', [Validators.required ] ],
      'ladingBill'    : ['', [Validators.required ] ],

      'businessInvoice'    : ['', [Validators.required ] ],
      'upstreamInvoice'    : ['', [Validators.required ] ],
      'originalFactoryInvoice'    : ['', [Validators.required ] ],

      'forMe'    : ['', [Validators.required ] ],
      'loadingReport'    : ['', [Validators.required ] ],
      'unloadingReport'    : ['', [Validators.required ] ],
      'customsDeclaration'    : ['', [Validators.required ] ],
      'goodsRight'    : ['', [Validators.required ] ],
      'finalStatement'    : ['', [Validators.required ] ],

      'company'    : ['', [Validators.required ] ],
      'shipStatus'    : ['', [Validators.required ] ]

    } )

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



    if (this.isAddNew) {

      if (this.orderList.length === 0) {
        postData.id = 1
      } else {
        const maxId = Math.max.apply(Math, this.orderList.map( order => order.id))
        postData.id = maxId + 1
      }


        this.orderService.addOrder(postData).subscribe(
            data => {
                console.log('保存成功: ', data)
                this.httpService.successHandler(data)

                this.getOrderList()
                this.isShowForm = false

            },
            error => {this.httpService.errorHandler(error) }
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
            error => {this.httpService.errorHandler(error) }
        )
    }

  }


  showForm(isAddNew : boolean = true, order?: any ) {

    if (isAddNew) {
      this.isAddNew = true

      this.orderForm.patchValue({
        'businessName'    : '',
        'shipName'    : '',
        'shippingDate'    : null,
        'contract'    : '',
        'ladingBill'    : '',

        'businessInvoice'    : '',
        'upstreamInvoice'    : '',
        'originalFactoryInvoice'    : '',

        'forMe'    : '',
        'loadingReport'    : '',
        'unloadingReport'    : '',
        'customsDeclaration'    : '',
        'goodsRight'    : '',
        'finalStatement'    : '',

        'company'    : '',
        'shipStatus'    : ''

      })

    } else {
      this.isAddNew = false

      this.currentOrderId = order.id
      this.orderForm.patchValue(order)

    }


    this.isShowForm = !this.isShowForm
  }



  deleteItem (order: any) {

    this.orderService.deleteOrder(order).subscribe(
      data => {
        console.log('删除成功: ', data)
        this.httpService.successHandler(data)

        this.getOrderList()
      },
      error => {this.httpService.errorHandler(error) }
    )
  }

}
