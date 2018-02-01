/**
 * Created by jin on 1/8/18.
 */


import {InMemoryDbService} from 'angular-in-memory-web-api'

export class InMemOrderDataService implements InMemoryDbService {

    createDb() {

        const businessNames: any[] = [
            {id : 1, name : 'REX-裕隆达-前海-国电镇江燃料'},
            {id : 2, name : 'tiger energy trading-CCS-重庆国经-前海-华能大连'},
            {id : 3, name : 'GMR-CCS-海昌'},
            {id : 4, name : '珠电-神华-和辉-前海-时代'},
            {id : 5, name : 'LSH-和辉-前海-时代'},
        ]







        let ships: any[] = [
            {id : 1, name : '银杏', englishName : 'MV.ROSCO GINKGO', company : ''},
            {id : 2, name : '海洋之星', englishName : 'MV. NPS OCEAN STAR', company : ''},
            {id : 3, name : '凯旋11', englishName : 'MV. KAI XUAN 11', company : ''},
            {id : 4, name : '安妮', englishName : 'MV.ANNY PETRAKIS', company : ''},
            {id : 5, name : '鲁比', englishName : 'MV K.RUBY', company : ''},
            {id : 6, name : '风秀海', englishName : 'MV.FENG XIU HAI', company : ''},
            {id : 7, name : '马尼拉', englishName : 'MV.TW MANILA', company : ''},
            {id : 8, name : '盛荣海', englishName : '', company : ''},
            {id : 9, name : '莫妮卡', englishName : 'MV. RHL MONICA', company : ''},
            {id : 10, name : '南京', englishName : 'MV. CP NANJING', company : ''},
            {id : 11, name : '台荣', englishName : 'MV TAI PRIZE', company : ''},
            {id : 12, name : '宏凯', englishName : 'MV.HONG KAI', company : ''},
            {id : 13, name : '明州36', englishName : '', company : ''},
            {id : 14, name : '德勤88', englishName : '/', company : ''},
            {id : 15, name : '高速', englishName : 'MV.HIGH SPEED', company : ''},
            {id : 16, name : '海狮', englishName : 'MV.NINGBO SEA LION', company : ''},
            {id : 17, name : '埃托利亚', englishName : 'MV.AETOLIA', company : ''},
            {id : 18, name : '珍珠', englishName : 'MV AKIJ PEARL', company : ''},
            {id : 19, name : '樱花轮', englishName : 'MV NM SAKURA', company : ''},
            {id : 20, name : '星河海', englishName : 'MV XING HE HAI', company : ''},
            {id : 21, name : '国强8', englishName : 'MV GUO QIANG 8', company : ''},
            {id : 22, name : '伊万吉丽娅', englishName : 'MV EVANGELIA M', company : ''},
            {id : 23, name : '艾娃', englishName : 'MV AVRA I', company : ''},
            {id : 24, name : '拉瑞玛', englishName : 'MV CONTI LARIMAR', company : ''},
        ]

        const shipsLocal = localStorage.getItem('ships')

        if (shipsLocal) {
            ships = JSON.parse(shipsLocal)
        }




        let shipAgencies = []

        const shipAgenciesLocal = localStorage.getItem('shipAgencies')

        if (shipAgenciesLocal) {
            shipAgencies = JSON.parse(shipAgenciesLocal)
        }




        let orders = []

        const ordersLocal = localStorage.getItem('orders')

        if (ordersLocal) {
            orders = JSON.parse(ordersLocal)
        }





        return {orders, shipAgencies, ships, businessNames}
    }
}
