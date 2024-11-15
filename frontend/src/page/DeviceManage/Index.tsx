import { Divider, Table } from "antd"
import  React, { useEffect, useState } from "react"

const columns = [
    {
        dataIndex: 'deviceName',
        key: 'deviceName',
        title: '裝置名稱'
    },
]

const Index = ({ deviceApi }: { deviceApi: Api.Device }) => {
    const [deviceData, setDeviceData] = useState()

    useEffect(() => {
        deviceApi.get({}).then((v) => {
            console.log(v)
        })
    }, [])
    return (
        <>
            <button className="btn btn-primary">新增</button>
            <Divider />
            <Table
                columns={columns}
            />
        </>
    )
}

export default Index
