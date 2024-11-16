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

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top' as const,
        },
        title: {
            display: true,
            text: 'Chart.js Line Chart',
        },
    },
};

const Index = () => {
    const [devicesData, setDevicesData] = useState<ChartData<any>>({ labels: [], datasets: [] });
    const [inputMessage, setInputMessage] = useState('');
    const [socket, setSocket] = useState(null);

    const sendMessage = () => {
        if (socket && inputMessage) {
            socket.send(inputMessage); // 發送訊息給服務器
            setInputMessage(''); // 清空輸入框
        }
    };

    useEffect(() => {
        const token = localStorage.getItem("token")
        const deviceId = [1,2,3,4]
        const ws = new WebSocket(
            `wss://monitor.workapp.tw/backendSocket?token=${token}&deviceId=${deviceId.join(",")}`
        )
        setSocket(ws);

        // 當連線建立時
        ws.onopen = () => {
            console.log('Connected to WebSocket server');
        };

        // 當收到訊息時
        ws.onmessage = (event) => {
            const deviceData = JSON.parse(event.data) as Entity.DeviceData[];
            console.log('Message from server:', deviceData);

            const getTimeLabels = deviceData?.map((item) => {
                const date = new Date(`${item.createTime}`)
                return`${String(date.getMinutes()).padStart(2, '0')}:${String(date.getSeconds()).padStart(2, '0')}`;

            })
            const groupData = deviceData?.reduce((accr, item) => {
                Object.keys(item?.data || {}).forEach((key) => {
                    if (Object.keys(accr?.[key] || {})?.length === 0) {
                        accr[key] = {
                            label: key,
                            data: [],
                            borderColor: 'rgb(53, 162, 235)',
                            backgroundColor: 'rgba(53, 162, 235, 0.5)',
                        }
                    }
                    const measureKeysValue = item?.data?.[key] || 0
                    accr[key]?.data?.push(measureKeysValue)
                })

                return accr
            }, {})

            setDevicesData({
                labels: getTimeLabels,
                datasets: Object.values(groupData)
            });
        };

        // 當連線關閉時
        ws.onclose = () => {
            console.log('Disconnected from WebSocket server');
        };

        // 清理連線
        return () => {
            ws.close();
        };
    }, [])
    return <Line options={options} data={devicesData} />;
}

export default Index