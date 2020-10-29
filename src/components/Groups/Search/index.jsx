import React, { useState } from 'react';
import './index.scss'
import {
    Card,
    InputGroup,
    Input,
    InputGroupAddon,
    Button
} from 'reactstrap';
import { Search } from '@material-ui/icons';
import { useDispatch } from 'react-redux';
import { setSearchTextForGroups } from '../../../redux/actions/groupActionCreator';



export default ({ currentGroup }) => {
    const dispatch = useDispatch();
    const [inputValue, setInputValue] = useState('');

    const handleChange = (event) => {
        setInputValue(event.target.value);
    };

    const triggerSearch = (event) => {

        dispatch(setSearchTextForGroups(inputValue))
    }


    return (
        <Card body className="card_custom search purple-theme_back">
            <InputGroup className="">
                <Input
                    className="input-size"
                    value={inputValue}
                    autoComplete='off'
                    onChange={handleChange}
                    onKeyUp={(event) => event.key === "Enter" && triggerSearch()}
                    name="search"
                    placeholder='Search...'
                />
                <InputGroupAddon addonType="append">
                    <Button color="secondary" onClick={triggerSearch}><Search /></Button>
                </InputGroupAddon>
            </InputGroup>

        </Card>
    )
}