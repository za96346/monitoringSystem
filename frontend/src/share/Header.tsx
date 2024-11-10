import { MenuOutlined, UserOutlined } from '@ant-design/icons'
import React from 'react'
import Dropdown from './Dropdown'
import { useNavigate } from 'react-router-dom'

const userDropdown = [
    // {
    //     key: 'selfData',
    //     label: '基本資料'
    // },
    {
        key: 'logout',
        label: '登出'
    }
]

const Header = ({ onMenuIconClick }: { onMenuIconClick: () => void }): JSX.Element => {
    const navigate = useNavigate()
    return (
        <div
            className={`
                header
                d-flex
                justify-content-between
                align-item-center
            `}
        >
            <MenuOutlined
                onClick={onMenuIconClick}
                style={{ fontSize: 20, cursor: 'pointer' }}
            />
            <Dropdown
                onSelect={(v: any) => {
                    console.log(v)
                    if (v === 'logout') {
                        navigate('/entry/login')
                        return
                    }
                    navigate(v)
                }}
                menu={userDropdown}
            >
                <UserOutlined
                    style={{ fontSize: 20, cursor: 'pointer' }}
                />
            </Dropdown>
        </div>
    )
}
export default Header
