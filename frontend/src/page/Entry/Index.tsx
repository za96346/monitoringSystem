import { LockOutlined, UserOutlined } from "@ant-design/icons"
import { Button, Input } from "antd"
import * as React from "react"
import { useNavigate } from "react-router-dom"

const Index = () => {
    const navigate = useNavigate()
    return (
        <div style={{
            backgroundColor: "rgba(255,255,255,0.5)",
            borderRadius: "10px",
            padding: "15px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "400px",
            height: "600px"
        }}>
            <Input
                prefix={<UserOutlined />}
                placeholder="使用者帳號"
                size="large"
                style={{ marginBottom: "5px",  }}
            />
            <Input
                prefix={<LockOutlined />}
                placeholder="使用者密碼"
                size="large"
                style={{ marginBottom: "5px" }}
            />
            <Button
                onClick={() => {
                    navigate("/dataMonitor")
                }}
                >
                    登入
            </Button>
        </div>
    )
}

export default Index
