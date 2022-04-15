import React, { useState, useContext } from 'react'
import { Form, Modal, Input } from 'antd'
import { AppContext } from '../../context/AppProvider'
import { AuthContext } from '../../context/AuthProvider'
import { addDocument } from '../fireBase/service'
function AddRoomModal() {
    const { uid } = useContext(AuthContext)
    const { isAddRoomVisible, setIsAddRoomVisible } = useContext(AppContext)
    const [form] = Form.useForm()


    const handleOk = () => {
        console.log({ formdata: form.getFieldValue() })
        addDocument("rooms", uid, { ...form.getFieldValue(), members: [uid] })

        //reset form values after
        form.resetFields()
        setIsAddRoomVisible(false)
    }
    const handleCancel = () => {
        setIsAddRoomVisible(false)
        //reset form values after
        form.resetFields()
    }
    return (
        <div>
            <Modal
                title="Add Room"
                visible={isAddRoomVisible}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <Form form={form} layout="vertical">
                    <Form.Item label="Room name" name="name">
                        <Input placeholder="Enter room name" />
                    </Form.Item>
                    <Form.Item label="Description" name="description">
                        <Input.TextArea placeholder="Enter description" />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}

export default AddRoomModal