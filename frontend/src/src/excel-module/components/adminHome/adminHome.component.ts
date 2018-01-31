import {Component, OnInit} from '@angular/core'
import { FormBuilder, FormGroup, Validators} from '@angular/forms'

import { HttpService } from '../../../bs-form-module/services/http.service'





@Component({
  selector: 'app-admin-home',
  templateUrl: './adminHome.component.html',
  styleUrls: ['./adminHome.component.css']
})
export class AdminHomeComponent implements OnInit {

    currentUser : any

    isLeftMenuCollapsed : boolean = false
    currentMenu : number = 2
    currentSubMenu : number = 21

    currentMouseOverMenu : number = 0

    menuList : any [] = [
        true,
        true,
        true,
        true,
        true,
        true
    ]


    constructor(
        private httpService: HttpService
    ) {
    }



    ngOnInit(): void {
    }


    toggleLeftMenu () {
        this.isLeftMenuCollapsed = !this.isLeftMenuCollapsed
    }


    clickMenu (event: any, menu : number) {
        event.preventDefault()
        this.currentMenu = Number(menu)
        this.menuList[this.currentMenu] = !this.menuList[this.currentMenu]
    }

    clickSubMenu (menu : number) {
        this.currentMenu = Number(menu.toString().substr(0, 1))
        this.currentSubMenu = Number(menu)
    }

    mouseEnterMenu (event: any, menu : number) {

        if (this.isLeftMenuCollapsed) {
            this.currentMouseOverMenu = Number(menu)
        }
    }

    mouseLeaveMenu () {

        if (this.isLeftMenuCollapsed) {
            this.currentMouseOverMenu = 0
        }
    }


    // getCurrentUserInfo () {
    //     this.userService.getSessionUserInfoHttp().subscribe(
    //         data => {
    //             this.currentUser = data.data
    //
    //             this.userService.sendUserInfoMessage(data.data)
    //
    //             // console.log('当前登陆的用户信息: ', data)
    //         },
    //         error => {this.httpService.errorHandler(error) }
    //     )
    // }
    //
    // logout () {
    //     this.userService.logout().subscribe(
    //         data => {
    //             console.log('退出登陆成功: ', data)
    //             saveAccessToken('')
    //
    //             setTimeout(function() {
    //                 window.location.href = '/web/login'
    //             }, 500)
    //
    //         },
    //         error => {this.httpService.errorHandler(error) }
    //     )
    // }

}
