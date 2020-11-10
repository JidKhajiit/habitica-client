import React from 'react';
import { useSelector } from 'react-redux';
import { mdiAccountCowboyHat } from '@mdi/js';
import { mdiAccount } from '@mdi/js';
import Icon from '@mdi/react'


export default ({users}) => {
    const addIcons = () => {
        const usersWithIcons = [];
        users.forEach((user) => {
            console.log('user',user)
            const icon = user.role === 'headman' ?
                <Icon
                    path={mdiAccountCowboyHat}
                    title="Headman"
                    size={0.8}
                    color="black"
                /> : <Icon 
                    path={mdiAccount}
                    title="User"
                    size={0.8}
                    color="black"
                />
            const userWithIcon = <div key={user.userId}>{icon} {user.nickName}</div>
            if (user.role === 'headman') usersWithIcons.unshift(userWithIcon)
            else usersWithIcons.push(userWithIcon)
        })
        return usersWithIcons;
    }

    return (
        <>
            {addIcons()}
        </>
    )
}