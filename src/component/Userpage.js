import React, { useState, useEffect } from "react";

import FormGroup from '@material-ui/core/FormGroup';
import { useDispatch, useSelector } from 'react-redux'

import countries from "../Layers/countriesList.json";

import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import { useHistory } from "react-router-dom";

import Button from '@material-ui/core/Button';
import { FetchBuilding } from "../Redux/Reducers/BuildingReducers";
import { CreationbuildingAction, FetchbuildingAction } from "../Redux/Actions/BuildingActions";
import { CreationuserAction } from "../Redux/Actions/UserActions";





export default function Userpage(props) {
    const redirect = props.location.search ? props.location.search.split('=')[1] : '/map';

    const [username, setusername] = useState()



    const dispatch = useDispatch();

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(CreationuserAction(username));
    };

    const temp = useSelector(state => state.buildings);
    const { BuildingList, success } = temp;

    useEffect(() => {
        if (success) { props.history.push(redirect); }

    }, [success]);


    return (
        <div>

            <form onSubmit={handleSubmit}>

                <FormControl >
                    <TextField
                        onInput={e => setusername(e.target.value)}
                    />

                </FormControl>

                <Button
                    type="submit"
                >
                    Create
                </Button>

                <Button
                    href="./"
                >
                    Annuler
                </Button>

            </form>

        </div>
    );
};

