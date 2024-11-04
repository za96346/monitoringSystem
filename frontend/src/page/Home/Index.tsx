import * as React from "react"
import { Input } from "antd"
import { Menu } from "antd";

const Index = () => {
    return (
        <div className="index">
            <div className="header">
                <div className="icon">image icon</div>
                <div className="searchbar">
                    <Input placeholder="搜尋商品..."/>
                </div>
            </div>
            <Menu />
        </div>
    )
}

export default Index
