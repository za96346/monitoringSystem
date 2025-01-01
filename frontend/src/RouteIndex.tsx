import React from 'react'
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate
} from 'react-router-dom'

// api
import User from 'api/User'
import Device from 'api/Device'

// page
import DataMonitor from "page/DataMonitor/Index"
import DeviceManage from "page/DeviceManage/Index"
import Entry from "page/Entry/Index"

import Layout from 'share/Layout'

// instance
const userApi = new User()
const deviceApi = new Device()

const RouteIndex = (): JSX.Element => {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<Layout />}>
                    <Route path='/dataMonitor' element={<DataMonitor deviceApi={deviceApi} />} />
                    <Route path='/deviceManage' element={<DeviceManage deviceApi={deviceApi} />} />
                    <Route path='/entry/login' element={<Entry userApi={userApi} />} />
                </Route>
            </Routes>
        </Router>
    )
}
export default RouteIndex
