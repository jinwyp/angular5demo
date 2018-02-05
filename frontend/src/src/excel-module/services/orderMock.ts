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
            {id : 14, name : '德勤88', englishName : '', company : ''},
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




        let harbors: any[] = [
            {id : 1, name : 'TANJUNG BARA,INDONESIA', englishName : 'TANJUNG BARA,INDONESIA', company : ''},
            {id : 2, name : 'TANJUNG PEMANCINGAN, INDONESIA', englishName : 'TANJUNG PEMANCINGAN, INDONESIA', company : ''},
            {id : 3, name : 'SEMIRARA, PHILIPINES', englishName : 'SEMIRARA, PHILIPINES', company : ''},
            {id : 4, name : 'MUARA SATUI,INDONESIA', englishName : 'MUARA SATUI,INDONESIA', company : ''},
            {id : 5, name : 'SAMARINDA,INDONESIA', englishName : 'SAMARINDA,INDONESIA', company : ''},
            {id : 6, name : 'ABBOT POINT,AUSTRALIA', englishName : 'ABBOT POINT,AUSTRALIA', company : ''},
            {id : 7, name : 'BUNATI, INDONESIA', englishName : 'BUNATI, INDONESIA', company : ''},
            {id : 8, name : 'ASAM ASAM, INDONESIA', englishName : 'ASAM ASAM, INDONESIA', company : ''},
            {id : 9, name : 'Muara Banyuasin, Indonesia', englishName : 'Muara Banyuasin, Indonesia', company : ''},
            {id : 10, name : 'Muara Berau, INDONESIA', englishName : 'Muara Berau, INDONESIA', company : ''},
            {id : 11, name : 'Taboneo, Indonesia', englishName : 'Taboneo, Indonesia', company : ''},
            {id : 12, name : 'Tanjung Buyut,Indonesia', englishName : 'Tanjung Buyut,Indonesia', company : ''},
            {id : 13, name : '京唐港', englishName : '', company : ''},
            {id : 14, name : '黄骅港', englishName : '', company : ''},
            {id : 15, name : '济源站', englishName : '', company : ''},
            {id : 16, name : '甲方指定', englishName : '', company : ''},
            {id : 17, name : '曹妃甸', englishName : '', company : ''},
            {id : 18, name : '盈利港', englishName : '', company : ''}
        ]

        const harborsLocal = localStorage.getItem('harbors')
        if (harborsLocal) {
            harbors = JSON.parse(harborsLocal)
        }




        let traders: any[] = [
            {id : 1, name : 'KPC', traderType : 'TRADER', company : ''},
            {id : 2, name : 'Jhonlin', traderType : 'TRADER', company : ''},
            {id : 3, name : 'SEMIRARA', traderType : 'TRADER', company : ''},
            {id : 4, name : '巴彦', traderType : 'TRADER', company : ''},
            {id : 5, name : '中石化', traderType : 'TRADER', company : ''},
            {id : 6, name : '河北物流', traderType : 'TRADER', company : ''},
            {id : 7, name : '青岛中兖', traderType : 'TRADER', company : ''},
            {id : 8, name : '金光', traderType : 'TRADER', company : ''},
            {id : 9, name : 'SSDK', traderType : 'TRADER', company : ''},
            {id : 10, name : '广州珠电', traderType : 'TRADER', company : ''},
            {id : 11, name : '渤港物贸', traderType : 'TRADER', company : ''},
            {id : 12, name : 'JL', traderType : 'TRADER', company : ''},
            {id : 13, name : 'PCN', traderType : 'TRADER', company : ''},
            {id : 14, name : 'MAC', traderType : 'TRADER', company : ''},
            {id : 15, name : 'AJE', traderType : 'TRADER', company : ''},
            {id : 16, name : 'BMB', traderType : 'TRADER', company : ''},
            {id : 17, name : 'TER', traderType : 'TRADER', company : ''},
            {id : 18, name : '广州发展', traderType : 'TRADER', company : ''},
            {id : 19, name : '神华', traderType : 'TRADER', company : ''},
            {id : 20, name : '蒙华', traderType : 'TRADER', company : ''},
            {id : 21, name : '岳阳港源', traderType : 'TRADER', company : ''},
            {id : 41, name : '华能海南', traderType : 'POWERPLANT', company : ''},
            {id : 42, name : '华能金陵', traderType : 'POWERPLANT', company : ''},

        ]

        const tradersLocal = localStorage.getItem('traders')
        if (tradersLocal) {
            traders = JSON.parse(tradersLocal)
        }




        let ccs: any[] = [
            {id : 1, name : '开发公司', traderType : 'CCSTRADER', company : '', },
            {id : 2, name : '印尼公司', traderType : 'CCSTRADER', company : ''},
            {id : 3, name : '华南公司', traderType : 'CCSTRADER', company : ''},
            {id : 4, name : '华南公司', traderType : 'CCSTRADER', company : ''},

            {id : 21, name : '江苏晋和电力燃料有限公司', shortName: '晋和', traderType : 'CCSACCOUNTING', company : '', },
            {id : 22, name : '那曲瑞昌煤炭运销有限公司', shortName: '那曲', traderType : 'CCSACCOUNTING', company : '', },
            {id : 23, name : '郑州嘉瑞供应链管理有限公司 ', shortName: '嘉瑞', traderType : 'CCSACCOUNTING', company : '', },
            {id : 24, name : '山西瑞茂通供应链有限公司', shortName: '山瑞', traderType : 'CCSACCOUNTING', company : '', },
            {id : 25, name : '宁夏瑞茂通供应链管理有限公司	 ', shortName: '宁夏瑞茂通', traderType : 'CCSACCOUNTING', company : '', },
            {id : 26, name : '宁夏华运昌煤炭运销有限公司', shortName: '华运昌', traderType : 'CCSACCOUNTING', company : '', },
            {id : 27, name : '宁夏腾瑞达电力燃料有限公司', shortName: '腾瑞达', traderType : 'CCSACCOUNTING', company : '', },
            {id : 28, name : '陕西秦瑞丰煤炭运销有限公司', shortName: '秦瑞丰', traderType : 'CCSACCOUNTING', company : '', },
            {id : 29, name : '陕西吕通贸易有限公司', shortName: '吕通', traderType : 'CCSACCOUNTING', company : '', },
            {id : 30, name : '新疆瑞茂通供应链管理有限公司', shortName: '新疆瑞茂通', traderType : 'CCSACCOUNTING', company : '', },
            {id : 31, name : '浙江瑞茂通供应链管理有限公司', shortName: '浙江瑞茂通', traderType : 'CCSACCOUNTING', company : '', },
            {id : 32, name : '浙江和辉电力燃料有限公司', shortName: '和辉', traderType : 'CCSACCOUNTING', company : '', },
            {id : 33, name : '江苏丰泰物资贸易有限公司', shortName: '丰泰', traderType : 'CCSACCOUNTING', company : '', },
            {id : 34, name : '宣威瑞茂通商贸有限公司', shortName: '宣威瑞茂通', traderType : 'CCSACCOUNTING', company : '', },
            {id : 35, name : '江西瑞茂通供应链管理有限公司', shortName: '江西瑞茂通', traderType : 'CCSACCOUNTING', company : '', },
            {id : 36, name : '上海瑞易供应链管理有限公司', shortName: '上海瑞易', traderType : 'CCSACCOUNTING', company : '', },
            {id : 37, name : '深圳前海瑞茂通供应链平台服务有限公司 ', shortName: '前海瑞茂通', traderType : 'CCSACCOUNTING', company : '', },
            {id : 38, name : '乌海市嘉运和商贸有限公司', shortName: '乌海嘉运和', traderType : 'CCSACCOUNTING', company : '', },
            {id : 39, name : '河南腾瑞能源产业开发有限公司', shortName: '河南腾瑞', traderType : 'CCSACCOUNTING', company : '', },
        ]

        const ccsLocal = localStorage.getItem('ccs')
        if (ccsLocal) {
            ccs = JSON.parse(ccsLocal)
        }











        let coalType: any[] = [
            {id : 1, name : '印尼煤'},
            {id : 2, name : '菲律宾煤'},
            {id : 3, name : '澳洲煤'},
            {id : 4, name : '内贸煤'},
            {id : 5, name : '山西优混'}
        ]

        const coalTypeLocal = localStorage.getItem('coaltype')
        if (coalTypeLocal) {
            coalType = JSON.parse(coalTypeLocal)
        }






        let departments = [
            {id : 1, name : '金融产品事业部'},
            {id : 2, name : '国内煤炭事业部'}

        ]

        const departmentsLocal = localStorage.getItem('departments')
        if (departmentsLocal) {
            departments = JSON.parse(departmentsLocal)
        }


        let teams = [
            {id : 1, name : '赵善文团队'},
            {id : 2, name : '张培栓团队'},
            {id : 3, name : '魏靖团队'},
            {id : 4, name : '卢昆团队'},
            {id : 5, name : '赵善文团队'},
            {id : 6, name : '赵悝团队'},
            {id : 7, name : '余东升团队'},
            {id : 8, name : '孔光明团队'},
            {id : 9, name : '张超超团队'},
            {id : 10, name : '宁夏自营分公司'},
            {id : 11, name : '钢材金融分公司'},
            {id : 12, name : '赵孟晓团队'},
            {id : 13, name : '陈璐团队'},
            {id : 14, name : '杨邓团队'},
            {id : 15, name : '田雪冬团队'},
            {id : 16, name : '冷链团队'}
        ]

        const teamsLocal = localStorage.getItem('teams')
        if (teamsLocal) {
            teams = JSON.parse(teamsLocal)
        }

        let users = []

        const usersLocal = localStorage.getItem('users')
        if (usersLocal) {
            users = JSON.parse(usersLocal)
        }



        let orders = []

        const ordersLocal = localStorage.getItem('orders')
        if (ordersLocal) {
            orders = JSON.parse(ordersLocal)
        }





        return {departments, teams, users, orders, shipAgencies, ships, harbors, traders, ccs, coalType, businessNames}
    }
}
