class UserEntity {
    id: number;
    userName: string;
    account: string;
    password: string;
    sort: number;
    isDeleted: number
    updateTime: Date;
    createTime: Date;

    constructor({
        id,
        userName,
        account,
        password,
        sort,
        isDeleted,
        updateTime,
        createTime
    }: {
        id?: number
        userName?: string
        account: string
        password: string
        sort?: number
        isDeleted?: number
        isStopped?: number
        updateTime?: Date
        createTime?: Date
    }) {
        this.id = id
        this.userName = userName
        this.account = account
        this.password = password
        this.sort = sort
        this.isDeleted = isDeleted
        this.updateTime = updateTime
        this.createTime = createTime
    }
}

export default UserEntity