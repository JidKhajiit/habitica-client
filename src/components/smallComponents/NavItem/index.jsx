import React from 'react'
import { useHistory } from 'react-router-dom';
import { NavItem, NavLink } from 'reactstrap';
import './index.scss'

const MyNavItem = ({
    id,
    href,
    className: userClassName = "",
    children,
    disabled = false,
    style
}) => {
    const history = useHistory();
    const activeHeaderTab = history.location.pathname;
    const isActive = activeHeaderTab.includes(href);

    const handleLinkClick = () => {
        history.push(href);
    }

    return (
        <NavItem id={id} className={userClassName} >
            <NavLink 
                disabled={disabled}
                active={isActive}
                href='#'
                onClick={handleLinkClick}
                style={style}
            >
                {children}
            </NavLink>
        </NavItem>
    )
}

export default MyNavItem