import { LockOutlined, UserOutlined } from "@ant-design/icons"
import { Button, Form, Input } from "antd"
import * as React from "react"
import { useNavigate } from "react-router-dom"
import "./index.scss"

const Index = ({ userApi }: { userApi: Api.User }) => {
    const navigate = useNavigate()
    return (
            
            <Form
                onFinish={(v) => {
                    userApi.login(v).then(() => {
                        navigate("/dataMonitor")
                    })
                }}
                
                style={{
                    backgroundColor: "rgba(255,255,255,0.5)",
                    borderRadius: "10px",
                    padding: "15px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "400px",
                    height: "500px",
                    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.25)"
                }}
            >
                <h1>LOG IN</h1>
                
                <Form.Item className="" name="account">
                    <label>username</label>
                    <Input
                        // prefix={<UserOutlined />}
                        // placeholder="使用者帳號"
                        size="large"
                        name="account"
                        style={{ marginBottom: "5px", }}
                    />
                </Form.Item>
                
                <Form.Item className="" name="password">
                    <label>password</label>
                    <Input
                        // prefix={<LockOutlined />}
                        // placeholder="使用者密碼"
                        name="password"
                        type="password"
                        size="large"
                        style={{ marginBottom: "5px" }}
                    />
                </Form.Item>
                <Form.Item >
                    <Button htmlType="submit" className="glow-on-hover">
                        登入
                    </Button>
                    
                    
                </Form.Item>
                <div className="bar">
                    <div className="ball"></div>
                </div>
            </Form>
        
    )
}

export default Index
