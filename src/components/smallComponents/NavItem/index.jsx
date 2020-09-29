import React from 'react'
import { useSelector } from 'react-redux';
import { NavItem, NavLink } from 'reactstrap';
import './index.scss'

const MyNavItem = ({
    id,
    href,
    className: userClassName = "",
    children,
    disabled = false
}) => {
    const { activeHeaderTab } = useSelector(state => state.app);
    const isActive = href === activeHeaderTab ? true : false;
    const isHref = isActive ? '#' : href;
    return (
        <NavItem id={id} className={userClassName}>
            <NavLink 
                disabled={disabled}
                active={isActive}
                href={isHref}
            >
                {children}
            </NavLink>
        </NavItem>
    )
}

export default MyNavItem