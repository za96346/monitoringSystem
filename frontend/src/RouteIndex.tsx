import React from 'react'
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate
} from 'react-router-dom'

// page
import Home from "page/Home/Index"
import Entry from "page/Entry/Index"

const RouteIndex = (): JSX.Element => {
    return (
        <Router>
            <Routes>
                <Route path='/home' element={<Home />} />
                <Route path='/entry' element={<Entry />} />
            </Routes>
        </Router>
    )
}
export default RouteIndex
