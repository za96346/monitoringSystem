
declare namespace ApiParams {
    interface User {
        login: {
            account: string
            password: string
        }
    }
    interface Device {
        get: {}
        update: {
            deviceName: string
            id: number
            sort: number
        }
        add: {
            deviceName: string
            sort: number
        }
        delete: {
            id: number
        }
    }
}
declare namespace Api {
    interface Response<T> {
        data: T
        errorMessage: string
    }

    interface User {
        async login(params: ApiParams.User["login"]): Promise<string>
    }

    interface Device {
        async get(params: ApiParams.Device["get"]): Promise<Entity.Device[]>
        async update(params: ApiParams.Device["update"]): Promise<Entity.Device>
        async add(params: ApiParams.Device["add"]): Promise<Entity.Device>
        async delete(params: ApiParams.Device["delete"]): Promise<boolean>
    }
}