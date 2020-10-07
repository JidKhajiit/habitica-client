import React from 'react';
import { useSelector } from 'react-redux';
import { Alert } from 'reactstrap';
import './index.scss'


export default props => {
    const { alert: { isRender, message } } = useSelector(state => state.app)

    return (
        <Alert className="alert-message" color="danger" fade={true} isOpen={isRender}>
            {message}
        </Alert>
    )
}