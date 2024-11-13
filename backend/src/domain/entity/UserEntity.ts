class UserEntity {
    id: number;
    userName: string;
    accout: string;
    password: string;
    sort: number;
    isDeleted: number
    updateTime: Date;
    createTime: Date;

    constructor({
        id,
        userName,
        accout,
        password,
        sort,
        isDeleted,
        updateTime,
        createTime
    }: {
        id?: number
        userName?: string
        accout: string
        password: string
        sort?: number
        isDeleted?: number
        isStopped?: number
        updateTime?: Date
        createTime?: Date
    }) {
        this.id = id
        this.userName = userName
        this.accout = accout
        this.password = password
        this.sort = sort
        this.isDeleted = isDeleted
        this.updateTime = updateTime
        this.createTime = createTime
    }
}

export default UserEntity