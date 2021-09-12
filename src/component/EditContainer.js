import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import countries from "../Layers/countriesList.json";
import { EditbuildingAction } from "../Redux/Actions/BuildingActions";

export default function EditContainer(props) {
    const [form, setForm] = useState({})
    const [activebuilding, setActivebuilding] = useState();
    const [index, setIndex] = useState({})
    const setField = (field, value) => {
        setForm({
            ...form,
            [field]: value
        })
    }
    const annuler = (event) => {
        props.history.push({
            pathname: "/map",
            myCustomProps: BuildingList[0],
        });

    };

    const dispatch = useDispatch();
    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(EditbuildingAction(props.location.activeuser, index, form));

        props.history.push({
            pathname: "/map",
            myCustomProps: form,
        });

    };
    const [success1, setsuc] = useState(false);
    const temp = useSelector(state => state.buildings);
    const { BuildingList, success } = temp;

    useEffect(() => {
        if (props.location.myCustomProps) {
            console.log(props.location.myCustomProps)
            setActivebuilding(props.location.myCustomProps)
            setIndex(props.location.index)
            console.log(props.location.index)
        } else {
            props.history.push({ pathname: "/" })
        }

    }, [props.location.index]);

    return (
        <div><h4>Add/Edit Building</h4>
            <div className="panel building-form equalHeight">


                <form onSubmit={handleSubmit}>

                    <div className="row">
                        <div className="tab_6 mob_24 flex_0_0_auto column">
                            <label htmlFor="buildingname">Name</label>
                        </div>
                        <div className="column">
                            <input
                                required
                                id="buildingname"
                                type="text"
                                onInput={e => setField("buildingname", e.target.value)}
                                Value={props.location.myCustomProps ? props.location.myCustomProps.buildingname : ""}

                            />

                        </div>
                    </div>
                    <div className="row">
                        <div className="tab_6 mob_24 flex_0_0_auto column">
                            <label htmlFor="country">Location</label>
                        </div>
                        <div className="column">
                            <select required
                                id="country"
                                onChange={e => setField("country", e.target.value)}
                            >
                                <option Value={props.location.myCustomProps ? props.location.myCustomProps.buildingname : ""}
                                >{props.location.myCustomProps ? JSON.parse(props.location.myCustomProps.country).name : ""}</option>

                                {
                                    countries.map((country) => {
                                        return (
                                            <option key={country.id}
                                                value={JSON.stringify(country)}>{country.name}</option>)
                                    })
                                }

                            </select>
                        </div>
                    </div>
                    <div className="row">
                        <div className="buttons-building-form">
                            <button
                                className="button cancel-button semi-round-left"
                                onClick={()=>annuler()}
                            >
                                Cancel
                            </button>
                            <button
                                className="button primary-button semi-round-right"
                                type="submit"
                            >
                                Edit
                            </button>
                        </div>

                    </div>


                </form>

            </div>
        </div>
    );
};

