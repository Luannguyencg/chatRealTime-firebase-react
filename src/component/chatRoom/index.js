import React from 'react'
import Sidebar from './Sidebar'
import ChatWindow from './ChatWindow'
import { Row, Col } from 'antd'
function ChatRoom() {
    return (
        <>
            <Row>
                <Col span={6}>
                    <Sidebar />
                </Col>
                <Col span={18}>
                    <ChatWindow />
                </Col>
            </Row>
        </>
    )
}

export default ChatRoom