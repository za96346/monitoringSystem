import * as React from 'react'
import * as ReactDOM from 'react-dom/client'

import { ConfigProvider } from 'antd'
import Locale from 'antd/es/locale/zh_TW'
import RouteIndex from 'RouteIndex'

import 'bootstrap/dist/css/bootstrap.min.css'
import stylees from './index.scss'

window.styles = stylees

const root = ReactDOM.createRoot(document.getElementById('root') as NonNullable<Element>)
root.render(
    <ConfigProvider locale={Locale}>
        <RouteIndex />
    </ConfigProvider>
)
