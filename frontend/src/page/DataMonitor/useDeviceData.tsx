import { ChartData } from "chart.js";
import React, { useEffect, useRef, useState } from "react";

interface useDeviceDataReturn {
    startConnection: (deviceId: number[]) => void
    devicesData: Record<number, ChartData<any>>
}

const useDeviceData = (): useDeviceDataReturn => {
    const ws = useRef<WebSocket>()
    const [devicesData, setDevicesData] = useState<Record<number, ChartData<any>>>({});
    const colorRef = useRef<Record<number, Record<number, string>>>({})

    function getRandom(min: number, max: number) {
        return Math.floor(Math.random() * max) + min;
    };

    const startConnection = (deviceId: number[]) => {
        if (ws.current) ws.current.close()
        if (deviceId?.length === 0) return
        const token = localStorage.getItem("token")
        ws.current = new WebSocket(
            `wss://monitor.workapp.tw/backendSocket?token=${token}&deviceId=${deviceId.join(",")}`
            // `ws://localhost:3002/backendSocket?token=${token}&deviceId=${deviceId.join(",")}`
        )

        // 當連線建立時
        ws.current.onopen = () => {
            console.log('Connected to WebSocket server');
        };

        // 當收到訊息時
        ws.current.onmessage = (event) => {
            const deviceData = JSON.parse(event.data) as Record<number, Entity.DeviceData[]>;
            console.log('Message from server:', deviceData);

            // 整理資料
            const okData = Object.keys(deviceData)?.reduce((prev, deviceId) => {
                const getTimeLabels = deviceData[deviceId]?.map((item) => {
                    const date = new Date(`${item.createTime}`)
                    return `${String(date.getMinutes()).padStart(2, '0')}:${String(date.getSeconds()).padStart(2, '0')}`;

                })
                const groupData = deviceData[deviceId]?.reduce((accr, item: Entity.DeviceData) => {
                    Object.keys(item?.data || {}).forEach((key) => {
                        if (Object.keys(accr?.[key] || {})?.length === 0) {
                            if (!colorRef.current?.[deviceId]) {
                                colorRef.current[deviceId] = {}
                            }
                            if (!colorRef.current[deviceId]?.[key]) {
                                colorRef.current[deviceId][key] = `rgb(${getRandom(0, 255)}, ${getRandom(0, 255)}, ${getRandom(0, 255)})`
                            }

                            accr[key] = {
                                label: key,
                                data: [],
                                borderColor: colorRef.current[deviceId][key],
                                backgroundColor: colorRef.current[deviceId][key],
                            }
                        }
                        const measureKeysValue = item?.data?.[key] || 0
                        accr[key]?.data?.push(measureKeysValue)
                    })

                    return accr
                }, {})

                return {
                    ...prev,
                    [deviceId]: {
                        labels: getTimeLabels,
                        datasets: Object.values(groupData)
                    }
                }
            }, {})

            setDevicesData(okData)
        };

        // 當連線關閉時
        ws.current.onclose = () => {
            console.log('Disconnected from WebSocket server');
        };
    }

    useEffect(() => {
        return () => {
            colorRef.current = {}
            if (ws.current) ws.current.close()
        }
    }, [])
    return {
        startConnection,
        devicesData
    }
}
export default useDeviceData