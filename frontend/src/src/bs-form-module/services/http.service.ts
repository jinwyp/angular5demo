
/**
 * Created by jin on 8/10/17.
 */
import { Injectable } from '@angular/core'
import {HttpErrorResponse} from '@angular/common/http'

import {NotificationService} from './notification.service'



const removeEmptyProperty = ( source : any) => {

    const sourceTemp = JSON.parse(JSON.stringify(source))

    function removeEmptyKeys (sourceObject : any) {
        if ( typeof sourceObject === 'object' && sourceObject && !Array.isArray(sourceObject)) {
            for (const prop in sourceObject) {
                if (sourceObject.hasOwnProperty(prop)) {

                    if ( typeof sourceObject[prop] === 'object' &&  sourceObject[prop] && !Array.isArray(sourceObject[prop])) {

                        if (Object.keys(sourceObject[prop]).length > 0 ) {
                            removeEmptyKeys (sourceObject[prop])
                        }

                        if (Object.keys(sourceObject[prop]).length === 0 ) {
                            // console.log('Property: ', prop, sourceObject[prop])
                            delete sourceObject[prop]
                        }

                    } else if ( Array.isArray(sourceObject[prop]) && sourceObject[prop].length === 0 ) {
                        delete sourceObject[prop]

                    } else if ( typeof sourceObject[prop] === 'number' && sourceObject[prop] === 0 ) {
                        delete sourceObject[prop]

                    } else if ( !sourceObject[prop] ) {
                        delete sourceObject[prop]
                    }
                }
            }
        }
    }

    removeEmptyKeys(sourceTemp)

    return sourceTemp
}




@Injectable()
class HttpService {

    constructor(
        private notificationService: NotificationService
    ) {
        // console.log(notificationService)
    }

    errorHandler (error: HttpErrorResponse) {

        if (error.error instanceof Error) {
            // A client-side or network error occurred. Handle it accordingly.
            console.log('Observable 发生前端错误!! ', error.error.message)
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            // console.log(`Observable 发生后端请求错误!! ${error.status}, body was: ${error.error}`)

            if (error && error.status === 401 ) {
                // window.location.href = '/web/login'
            } else {
                if (error && error.status === 400) {
                    console.log('Http 400 请求发生错误!! ', error.error || error.message)

                } else if (error && error.status === 404) {
                    console.log('Http 404 请求发生错误!! ', error.error || error.message)

                } else if (error && error.status === 500) {
                    console.log('Http 500 请求发生错误!! ', error.error || error.message)

                } else {
                    console.log('Http 请求发生错误!! ', error.error || error.message)
                }




                let title: string = '请求出现错误!'
                let messageError: string = ''
                let errorObject : any = {}

                if (error && error.error ) {

                    if (typeof error.error === 'string') {
                        errorObject = JSON.parse(error.error)
                    } else {
                        errorObject = error.error
                    }


                    if (errorObject && errorObject.success === false && errorObject.error) {

                        messageError = errorObject.error.message

                        if (error.url.indexOf('/api/user/login') !== -1) {
                            title = '登陆失败'
                            messageError = '用户名或密码错误!'
                        }
                    }


                } else {
                    messageError = error.message
                }




                this.notificationService.error( title,  messageError,
                    {
                        showProgressBar: false,
                        pauseOnHover: true,
                        clickToClose: true,
                        timeOut: 5000
                    }
                )
            }
        }
    }

    successHandler (data: any, message? : string) {
        this.notificationService.success(  message || '保存成功!', '提示: 点击后提示消失',
            {
                showProgressBar: false,
                pauseOnHover: true,
                clickToClose: true,
                timeOut: 3000
            }
        )
    }

    errorMessage (error: any, message? : string) {
        this.notificationService.error( message || '保存失败!', '提示: 点击后提示消失',
            {
                showProgressBar: false,
                pauseOnHover: true,
                clickToClose: true,
                timeOut: 5000
            }
        )
    }

}



export {HttpService, removeEmptyProperty}


