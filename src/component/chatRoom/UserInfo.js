import React, { useEffect, useContext } from 'react'
import { Button, Typography, Avatar } from 'antd'
import styled from 'styled-components'
import { signOut } from "firebase/auth";
import { auth } from '../fireBase/config';
import { AuthContext } from '../../context/AuthProvider'
const WrapperStyled = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 12px 16px;
    align-items: center;
    border-bottom: 1px solid rgba(82, 38, 83);

    .userInfo{
        display: flex;
        align-items: center;
    
    }
    .username{
        color: white;
        margin-left: 5px;
    }
`;
function UserInfo() {


    const {
        displayName,
        email,
        uid,
        photoURL
    } = useContext(AuthContext)

    const handleSignout = () => {
        signOut(auth)
    }
    return (
        <WrapperStyled>
            <div className="userInfo">
                <Avatar src={photoURL}>{photoURL ? '' : displayName?.charAt(0).toUpperCase()}</Avatar>
                <Typography.Text className="username">{displayName}</Typography.Text>
            </div>
            <Button ghost onClick={handleSignout}>Đăng xuất</Button>
        </WrapperStyled>
    )
}

export default UserInfo