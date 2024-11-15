import apiAbstract from "./apiAbstract";

class User extends apiAbstract implements Api.User {
    /**
     * @ddescription 登入
    */
    async login(params: ApiParams.User["login"]): Promise<boolean> {
        return this.POST<boolean>({
            url: "/entry/login",
            data: params
        })
    }
}

export default User