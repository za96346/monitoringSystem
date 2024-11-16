import { Divider, Table } from "antd"
import  React, { useEffect, useMemo, useState } from "react"
import ModalEdit from "./component/ModalEdit"
import ButtonAction from './method/ButtonAction'
import { modalType } from "static"

const columns = [
    {
        dataIndex: 'deviceName',
        key: 'deviceName',
        title: '裝置名稱'
    },
    {
        dataIndex: 'isStopped',
        key: 'isStopped',
        title: '啟用'
    },
    {
        dataIndex: 'sort',
        key: 'sort',
        title: '排序'
    },
    {
        dataIndex: 'action',
        key: 'action',
        title: '更多'
    },
]

const Index = ({ deviceApi }: { deviceApi: Api.Device }) => {
    const [devices, setDevices] = useState<Entity.Device[]>([])

    const reload = (v) => {
        setDevices(v)
    }

    const dataSource = useMemo(() => devices.map((device) => {
        const isThisDeviceActivated = device.isStopped === 0
        return {
            ...device,
            key: device.id,
            action: (
                <>
                    <button
                        onClick={() => {
                            ButtonAction({
                                type: modalType.edit,
                                value: device,
                                deviceApi,
                                reload
                            })
                        }}
                        className="btn btn-primary"
                    >
                        編輯
                    </button>
                    <button
                        onClick={() => {
                            ButtonAction({
                                type: modalType.delete,
                                value: device,
                                deviceApi,
                                reload
                            })
                        }}
                        className="btn btn-danger"
                    >
                        刪除
                    </button>
                </>
            ),
            isStopped: (
                <span className={isThisDeviceActivated ? "text-success" : "text-danger"}>
                    {isThisDeviceActivated ? '是' : '否'}
                </span>
            )
        }
    }), [devices])

    useEffect(() => {
        deviceApi.get({}).then((v) => reload(v))
    }, [])

    return (
        <>
            <ModalEdit />
            <button
                onClick={() => {
                    ButtonAction({
                        type: modalType.add,
                        deviceApi,
                        reload
                    })
                }}
                className="btn btn-primary"
            >
                新增
            </button>
            <Divider />
            <Table
                dataSource={dataSource}
                columns={columns}
            />
        </>
    )
}

export default Index
