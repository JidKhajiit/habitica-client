import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Nav, NavItem, NavLink } from 'reactstrap';


export default props => {
    const dispatch = useDispatch();
    const [inputValues, setInputValues] = useState({

    })




    return (
        <>
            <Nav tabs>
                <NavItem>
                    <NavLink href="#">Home</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="#" active>Groups</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="#">Another Link</NavLink>
                </NavItem>

            </Nav>
        </>
    )
}