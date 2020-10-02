import React from 'react'
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { NavItem, NavLink } from 'reactstrap';
import './index.scss'

const MyNavItem = ({
    id,
    href,
    className: userClassName = "",
    children,
    disabled = false
}) => {
    const history = useHistory();
    console.log(history)
    const activeHeaderTab = history.location.pathname;
    // const { activeHeaderTab } = useSelector(state => state.app);
    const isActive = activeHeaderTab.includes(href);

    const handleLinkClick = () => {
        history.push(href);
    }

    return (
        <NavItem id={id} className={userClassName}>
            <NavLink 
                disabled={disabled}
                active={isActive}
                href='#'
                onClick={handleLinkClick}
            >
                {children}
            </NavLink>
        </NavItem>
    )
}

export default MyNavItem