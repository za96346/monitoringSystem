import apiAbstract from "./apiAbstract";

class Device extends apiAbstract implements Api.Device {
    async get(params: ApiParams.Device["get"]): Promise<Entity.Device[]> {
        return await this.GET({
            data: params,
            url: "/device"
        })
    }
    async update(params: ApiParams.Device["update"]): Promise<Entity.Device> {
        return await this.POST({
            data: params,
            url: "/device"
        })
    }
    async add(params: ApiParams.Device["add"]): Promise<Entity.Device> {
        return await this.PUT({
            data: params,
            url: "/device"
        })
    }
    async delete(params: ApiParams.Device["delete"]): Promise<boolean> {
        return await this.DELETE({
            data: params,
            url: "/device"
        })
    }
}

export default Device