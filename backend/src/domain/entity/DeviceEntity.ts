class DeviceEntity {
    id: number;
    deviceName: string;
    sort: number
    isDeleted: number
    isStopped: number
    updateTime: Date;
    createTime: Date;

    constructor({
        id,
        deviceName,
        sort,
        isDeleted,
        isStopped,
        updateTime,
        createTime
    }: {
        id: number
        deviceName: string
        sort: number
        isDeleted: number
        isStopped: number
        updateTime: Date
        createTime: Date
    }) {
        this.id = id
        this.deviceName = deviceName
        this.sort = sort
        this.isDeleted = isDeleted
        this.isStopped = isStopped
        this.updateTime = updateTime
        this.createTime = createTime
    }
}

export default DeviceEntity