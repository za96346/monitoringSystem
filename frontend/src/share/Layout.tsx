import React, { useEffect, useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { Divider, Menu } from 'antd'
import pic from 'asserts/logo.png'
import Header from './Header'

const menuItem = [
    {
        key: "dataMonitor",
        label: "即時監控"
    },
    {
        key: "deviceManage",
        label: "裝置管理"
    },
    {
        key: "logout",
        label: "登出"
    },
]

const Layout = (): JSX.Element => {
    const location = useLocation()
    const navigate = useNavigate()
    const [isSidebarExpended, setSidebarExpended] = useState(true)

    if (location.pathname === '/entry/login') {
        return (
            <div translate='no' className='layout login'>
                <Outlet />
            </div>
        )
    }

    return (
        <div translate='no' className='layout'>
            <div
                style={{
                    left: isSidebarExpended
                        ? '0px'
                        : '-256px'
                }}
                className='menu'
            >
                <img src={pic} />
                <Divider />
                <Menu
                    onClick={(v) => {
                        if (v?.key === 'logout') {
                            navigate('entry/login')
                        } else {
                            navigate(v?.key)
                        }
                    }}
                    items={menuItem}
                />
            </div>
            <div
                className='main'
                style={isSidebarExpended ? {} : { width: '100%', left: 0 }}
            >
                <Header onMenuIconClick={() => { setSidebarExpended((v) => !v) }} />
                <div
                    className={'article'}
                    style={!isSidebarExpended
                        ? {
                            width: '100%',
                            left: 0
                        }
                        : {}}
                >
                    <Outlet />
                </div>
            </div>
        </div>
    )
}
export default Layout
