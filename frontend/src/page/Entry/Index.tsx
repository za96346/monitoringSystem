import { LockOutlined, UserOutlined } from "@ant-design/icons"
import { Button, Form, Input } from "antd"
import * as React from "react"
import { useNavigate } from "react-router-dom"
// import "./index.scss"

const Index = ({ userApi }: { userApi: Api.User }) => {
    const navigate = useNavigate()
    return (
        <section>
            <div className="color"></div>
            <div className="color"></div>
            <div className="color"></div>
            <div className="box">
                <div className="square" style={{ "--i": "0" } as React.CSSProperties}></div>
                <div className="square" style={{ "--i": "1" } as React.CSSProperties}></div>
                <div className="square" style={{ "--i": "2" } as React.CSSProperties}></div>
                <div className="square" style={{ "--i": "3" } as React.CSSProperties}></div>
                <div className="square" style={{ "--i": "4" } as React.CSSProperties}></div>

                <div className="container">
                    <div className="form">
                        <h2>Login Form</h2>
                        <Form
                            onFinish={(v) => {
                                userApi.login(v).then(() => {
                                    navigate("/dataMonitor")
                                })
                            }}
                        >
                            <div className="inputBox">
                                <Form.Item name="account">
                                    <Input
                                        placeholder="Username"
                                        size="large"
                                        name="account"
                                    />
                                </Form.Item>
                            </div>

                            <div className="inputBox">
                                <Form.Item name="password">
                                    <Input
                                        placeholder="Password"
                                        name="password"
                                        type="password"
                                        size="large"
                                    />
                                </Form.Item>
                            </div>

                            
                                <Form.Item>
                                    <Button htmlType="submit"  className="glow-on-hover">登入</Button>
                                </Form.Item>
                            
                        </Form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Index