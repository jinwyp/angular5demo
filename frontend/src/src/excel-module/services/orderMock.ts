/**
 * Created by jin on 1/8/18.
 */


import { InMemoryDbService } from 'angular-in-memory-web-api'

export class InMemOrderDataService implements InMemoryDbService {

  createDb() {

    const businessNames : any[] = [
      { id : 1, name : 'REX-裕隆达-前海-国电镇江燃料'},
      { id : 2, name : 'tiger energy trading-CCS-重庆国经-前海-华能大连'},
      { id : 3, name : 'GMR-CCS-海昌'},
      { id : 4, name : '珠电-神华-和辉-前海-时代'},
      { id : 5, name : 'LSH-和辉-前海-时代'},
    ]


    const shipNames : any[] = [
      { id : 1, name : 'Mv. Panworld'},
      { id : 2, name : '考斯坦'},
      { id : 3, name : '麦当娜'},
      { id : 4, name : '友通2'},
      { id : 5, name : '莫斯'},
    ]



    let orders = []

    const ordersLocal = localStorage.getItem('orders')
    if (ordersLocal) {
      orders = JSON.parse(ordersLocal)
    }

    return {orders, businessNames, shipNames}
  }
}
