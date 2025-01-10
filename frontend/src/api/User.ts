import apiAbstract from "./apiAbstract";

class User extends apiAbstract implements Api.User {
    /**
     * @ddescription 登入
    */
    async login(params: ApiParams.User["login"]): Promise<string> {
        return this.POST<string>({
            url: "/entry/login",
            data: params,
            title: "是否登入",
        }).then((token) => {
            localStorage.setItem("token", token)
            return token
        })
    }
}

export default User