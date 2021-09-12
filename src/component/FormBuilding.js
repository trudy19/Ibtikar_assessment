import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from 'react-redux'

import countries from "../Layers/countriesList.json";

import {CreationbuildingAction} from "../Redux/Actions/BuildingActions";


export default function Frombuild (props)  {
    const redirect =props.location.search ? props.location.search.split('=')[1] : '/map';

    const [form, setForm] = useState({})
    const[activeuser,setactiveuser]=useState();


    const setField = (field, value) => {
        setForm({
            ...form,
            [field]: value
        })
    }

    const dispatch = useDispatch();

    const handleSubmit = (event) => {
        event.preventDefault();
        // localStorage.setItem('myData', JSON.stringify(form));
        dispatch(CreationbuildingAction(activeuser, form));
        props.history.push({
            pathname: "/map",
            myCustomProps: form,
        });

    };



    

  const temp = useSelector(state => state.buildings);
  const { BuildingList,success } = temp;


  /*
  useEffect(()=>{
    if(success)
{props.history.push(redirect);}
  
  },[success]);
*/


  useEffect(()=>{
    if(props.location.myCustomProps){
      console.log(props.location.myCustomProps) 
      setactiveuser(props.location.myCustomProps)
    }else{            props.history.push({            pathname: "/"})
}
 
    },[props.location.myCustomProps]);

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
                                id="buildingname"
                                type="text"
                                onInput={e => setField("buildingname", e.target.value)}


                            />

                        </div>
                    </div>
                    <div className="row">
                        <div className="tab_6 mob_24 flex_0_0_auto column">
                            <label htmlFor="country">Location</label>
                        </div>
                        <div className="column">
                            <select
                                id="country"
                                onChange={e => setField("country", e.target.value)}
                            >
                                <option value="">Select country</option>

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
                                href="./map"
                            >
                                Cancel
                            </button>
                            <button 
                                className="button primary-button semi-round-right"
                                type="submit"
                            >
                                Create
                            </button>
                        </div>

                    </div>

                </form>

            </div>
        </div>
    );
};

