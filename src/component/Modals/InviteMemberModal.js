import React, { useEffect, useState, useContext, useMemo } from 'react'
import { Form, Modal, Select, Spin, Avatar } from 'antd'
import { AppContext } from '../../context/AppProvider'
import { AuthContext } from '../../context/AuthProvider'
import { debounce } from 'lodash'
import { collection, getDocs, query, where, orderBy, limit, doc, updateDoc } from "firebase/firestore";
import { db } from '../fireBase/config'

function DebounceSelect({ fetchOptions, debounceTimeout = 300, ...props }) {
    const [fetching, setFetching] = useState(false)
    const [options, setOptions] = useState([])

    const debounceFetcher = useMemo(() => {
        const loadOptions = (value) => {
            setOptions([])
            setFetching(true)


            fetchOptions(value, props.curMembers).then(newOptions => {
                setOptions(newOptions)
                setFetching(false)
            })
        }
        return debounce(loadOptions, debounceTimeout)
    }, [debounceTimeout, fetchOptions])
    useEffect(() => {
        return () => {
            // clear when unmount
            setOptions([]);
        };
    }, []);
    return (
        <Select
            labelInValue
            filterOption={false}
            onSearch={debounceFetcher}
            notFoundContent={fetching ? <Spin size='small' /> : null}
            {...props}
        >
            {
                options && options.length > 0 &&
                options.map(opt => {
                    return (
                        <Select.Option key={opt.value} value={opt.value} title={opt.lable}>
                            <Avatar size="small" src={opt.photoURL}>
                                {opt.photoURL ? '' : opt.label.charAt(0).toUpperCase()}
                            </Avatar>
                            <span style={{ marginLeft: 10 }}>{opt.label}</span>
                        </Select.Option>
                    )
                })

            }
        </Select>
    )
}
async function fetchUserList(search, curMembers) {


    const q = query(collection(db, "users"),
        orderBy("displayName"),
        where("keywords", "array-contains", search),
        limit(20)
    )
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map(doc => ({
        label: doc.data().displayName,
        value: doc.data().uid,
        photoURL: doc.data().photoURL
    })).filter((opt) => !curMembers.includes(opt.value));

}


function InviteMemberModal() {
    const { uid } = useContext(AuthContext)
    const { isInviteMemberVisible, setIsInviteMemberVisible, selectedRoomId, selectedRoom } = useContext(AppContext)
    const [form] = Form.useForm()

    const [value, setValue] = useState()

    const handleOk = async () => {

        const roomRef = doc(db, "rooms", selectedRoomId);
        await updateDoc(roomRef, {
            members: [...selectedRoom.members, ...value.map(val => val.value)]
        });
        //reset form values after
        form.resetFields()
        setIsInviteMemberVisible(false)
    }
    const handleCancel = () => {
        setIsInviteMemberVisible(false)
        //reset form values after
        form.resetFields()
    }
    console.log(value)
    return (
        <div>
            <Modal
                title="invite more members"
                visible={isInviteMemberVisible}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <Form form={form} layout="vertical">
                    <DebounceSelect
                        mode="multiple"
                        label="tên các thành viên"
                        value={value}
                        placeholder="Member name"
                        fetchOptions={fetchUserList}
                        onChange={newValue => setValue(newValue)}
                        style={{ width: '100%' }}
                        curMembers={selectedRoom.members}
                    />
                </Form>
            </Modal>
        </div>
    )
}

export default InviteMemberModal