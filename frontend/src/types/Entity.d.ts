declare namespace Entity {
    interface User {
        id: number;
        userName: string;
        accout: string;
        password: string;
        sort: number;
        isDeleted: number
        updateTime: Date;
        createTime: Date;
    }
    interface Device {
        id: number;
        deviceName: string;
        sort: number
        isDeleted: number
        isStopped: number
        updateTime: Date;
        createTime: Date;
    }
    interface DeviceData {
        id: number;
        deviceId: number;
        data: Record<string, any>; // 目前定義any, 等有明確格式，在修改
        updateTime: Date;
        createTime: Date;
    }
}