import React, { createContext, useMemo, useContext, useState } from 'react'
import { useFirestore } from '../hooks/useFirestore'
import { AuthContext } from './AuthProvider'
export const AppContext = createContext()
function AppProvider({ children }) {

    const [isAddRoomVisible, setIsAddRoomVisible] = useState(false)
    const [selectedRoomId, setSelectedRoomId] = useState('')
    const [isInviteMemberVisible, setIsInviteMemberVisible] = useState(false)

    const { uid } = useContext(AuthContext)

    //useMemo
    const roomsCondition = useMemo(() => {
        return {
            fieldName: "members",
            operator: "array-contains",
            compareValue: uid
        }
    }, [uid])

    const rooms = useFirestore('rooms', roomsCondition)
    const selectedRoom = useMemo(() => {
        return rooms.find(room => room.id === selectedRoomId) || {}
    }, [rooms, selectedRoomId])

    //useMemo
    const usersCondition = useMemo(() => {
        return {
            fieldName: "uid",
            operator: "in",
            compareValue: selectedRoom.members
        }
    }, [selectedRoom.members])
    const members = useFirestore('users', usersCondition)

    console.log(members)
    return (
        <AppContext.Provider
            value={{
                members,
                rooms,
                isAddRoomVisible,
                setIsAddRoomVisible,
                selectedRoomId,
                setSelectedRoomId,
                selectedRoom,
                isInviteMemberVisible,
                setIsInviteMemberVisible
            }}
        >
            {children}
        </AppContext.Provider>
    )
}

export default AppProvider