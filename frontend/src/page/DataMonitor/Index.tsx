import React, { useEffect, useState } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ChartData,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { Divider, Form, Select, SelectProps } from 'antd';
import useDeviceData from './useDeviceData';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const options = ({ titleText }: { titleText: string }) => ({
    responsive: true,
    plugins: {
        legend: {
            position: 'top' as const,
        },
        title: {
            display: true,
            text: titleText,
        },
    },
})

const Index = ({ deviceApi }: { deviceApi: Api.Device }) => {
    const { startConnection, devicesData } = useDeviceData()
    const [devices, setDevices] = useState<SelectProps["options"]>([])
    const [selectedDevices, setSelectedDevices] = useState<number[]>([])

    useEffect(() => {
        // 請求裝置api
        deviceApi.get({}).then((v) => {
            setDevices(v?.map((item) => ({
                value: item.id,
                label: item.deviceName
            })) ?? [])
        })
    }, [])
    return (
        <>
            <Form>
                <Form.Item label="選擇裝置">
                    <Select
                        className='w-100'
                        options={devices}
                        mode="multiple"
                        onChange={(v) => {
                            setSelectedDevices(v)
                            startConnection(v)
                        }}
                    >
                    </Select>
                </Form.Item>
            </Form>

            <Divider />
            <div className='row'>
                {
                    selectedDevices.map((deviceId) => (
                        <div
                            key={deviceId}
                            className="col-lg-6 bg-white d-flex align-item-center justify-content-center"
                            style={{
                                borderRadius: "10px",
                                cursor: "pointer",
                                border: "0.5px solid #333"
                            }}
                        >
                            <Line
                                options={options({
                                    titleText: (
                                        devices?.find((d) => d?.value == deviceId)?.label
                                    ) as unknown as string ?? ""
                                })}
                                data={devicesData?.[deviceId] ?? {
                                    datasets: [],
                                }}
                            />
                        </div>
                    ))
                }
            </div>

        </>
    )
}

export default Index