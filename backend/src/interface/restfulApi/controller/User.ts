/**
 * @todo step 2 
 * 新增 User controller, 可以參照Device.ts
 * 
 * 此類別的方法需有
 * async get(req: Request, res: Response): Promise<void>  取得使用者資料
 * async delete(req: Request, res: Response): Promise<void> 刪除使用者資料
 * async update(req: Request, res: Response): Promise<void> 更新使用者資料
 * async add(req: Request, res: Response): Promise<void> 新增使用者資料
*/
import { Request, Response } from 'express';
import UserEntity from '../../../domain/entity/UserEntity';
import { AppService } from 'types/AppService';
import BaseController from './BaseController'

class User extends BaseController{
    private userApp: AppService.UserApp

    constructor({userApp}: {userApp: AppService.UserApp}){
        super()
        this.userApp = userApp
    }

    async get(req: Request, res: Response): Promise<void>{
        const appResult = await this.userApp.get({})
        
        res.json({
            data: appResult,
            errorMessage: "",
            errorStatus: true,
        })
    }

    async delete(req: Request, res: Response): Promise<void>{
        const validateResult = this.hasBodyData<UserEntity>(req, res)
        if (!validateResult.isPass) return

        const appResult = await this.userApp.delete(validateResult.body)

        res.json({
            errorMessage: "",
            data: appResult
        })
    }
    
    async update(req: Request, res: Response): Promise<void>{
        const validateResult = this.hasBodyData<UserEntity>(req, res)
        if (!validateResult.isPass) return

        const appResult = await this.userApp.update(validateResult.body)

        res.json({
            errorMessage: "",
            data: appResult
        })
    }

    async add(req: Request, res: Response): Promise<void>{
        const validateResult = this.hasBodyData<UserEntity>(req, res)
        if (!validateResult.isPass) return

        console.log(validateResult.body)

        const appResult = await this.userApp.add(validateResult.body)

        res.json({
            errorMessage: "",
            data: appResult
        })
    }
}

export default User
