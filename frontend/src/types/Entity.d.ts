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
}