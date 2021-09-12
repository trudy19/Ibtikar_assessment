import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
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

