import { LockOutlined, UserOutlined } from "@ant-design/icons"
import { Button, Form, Input } from "antd"
import * as React from "react"
import { useNavigate } from "react-router-dom"

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
                height: "500px"
            }}
        >
            <Form.Item className="col-12" name="account">
                <Input
                    prefix={<UserOutlined />}
                    placeholder="使用者帳號"
                    size="large"
                    name="account"
                    style={{ marginBottom: "5px",  }}
                />
            </Form.Item>
            <Form.Item className="col-12" name="password">
                <Input
                    prefix={<LockOutlined />}
                    placeholder="使用者密碼"
                    name="password"
                    size="large"
                    style={{ marginBottom: "5px" }}
                />
            </Form.Item>
            <Form.Item >
                <Button htmlType="submit">
                        登入
                </Button>
            </Form.Item>
        </Form>
    )
}

export default Index
