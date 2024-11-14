class DeviceDataEntity {
    id: number;
    deviceId: number;
    data: Record<string, any>; // 目前定義any, 等有明確格式，在修改
    updateTime: Date;
    createTime: Date;

    constructor({
        id,
        deviceId,
        data,
        updateTime,
        createTime
    }: {
        id: number
        deviceId: number
        data: Record<string, any>
        updateTime?: Date
        createTime?: Date
    }) {
        this.id = id
        this.deviceId = deviceId
        this.data = data
        this.updateTime = updateTime
        this.createTime = createTime
    }
}

export default DeviceDataEntity