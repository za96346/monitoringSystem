import React from 'react'
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate
} from 'react-router-dom'

// page
import DataMonitor from "page/DataMonitor/Index"
import DeviceManage from "page/DeviceManage/Index"
import Entry from "page/Entry/Index"

import Layout from 'share/Layout'

const RouteIndex = (): JSX.Element => {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<Layout />}>
                    <Route path='/dataMonitor' element={<DataMonitor />} />
                    <Route path='/deviceManage' element={<DeviceManage />} />
                    <Route path='/entry/login' element={<Entry />} />
                </Route>
            </Routes>
        </Router>
    )
}
export default RouteIndex
