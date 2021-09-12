import React, { useEffect, useState } from "react";
import './styles/reset.css';
import './styles/form.css';
import './styles/index.css';
import "./styles/App.css";
import CircularProgress from '@material-ui/core/CircularProgress';
import { useDispatch, useSelector, } from 'react-redux';
import MapContainer from './component/MapContainer'
import Frombuild from './component/FormBuilding'
import { BrowserRouter, Link, Route, Switch } from "react-router-dom"
import { deletebuilding, FetchbuildingAction } from "./Redux/Actions/BuildingActions";
import EditContainer from "./component/EditContainer";
import { FetchuserAction } from "./Redux/Actions/UserActions";
import Userpage from "./component/Userpage";


const App = (props) => {
    const [form, setForm] = useState({})
    const routeChange = () => {
    }
    const dispatch = useDispatch();

    const temp = useSelector(state => state.buildings);
    const { BuildingList, success, loading } = temp;
    const temp1 = useSelector(state => state.users);
    const { ClientList } = temp1;
    const temp2 = useSelector(state => state.deletebuild);
    const { deletee } = temp2;
    const [display, setDisplay] = useState(false)
    const [activeuser, setActiveUser] = useState()
    useEffect(() => {
        dispatch(FetchbuildingAction(activeuser));

        dispatch(FetchuserAction());
    }, [activeuser, deletee,]);

    const handleChange = (selectedOption) => {
        setActiveUser(selectedOption.target.value);
        setDisplay(true);
        console.log('Option selected:', selectedOption.target.value);

    }

    return (

        <BrowserRouter>
            <div className="user-list">
                <label for="user">
                    {<Link
                        to={{ pathname: "/map", myCustomProps: BuildingList ? BuildingList[0] : null }}>
                        <select id="user" onChange={handleChange}>
                            {activeuser == null && <option value="">Select user</option>}
                            {ClientList && ClientList.map((client, index) => {

                                return (
                                    <option value={client}>{client}

                                    </option>
                                )
                            })}
                        </select>
                    </Link>
                    }
                </label>
            </div>
            <div className="row">
                {display && <div className="column tab_6 mob_24 flex_0_0_auto">
                    <h4>Buildings</h4>
                    <div className="panel building-list equalHeight">
                        {BuildingList == null && BuildingList == undefined ? <div className="progress_bar"><CircularProgress/></div> : <div>{BuildingList.map((building, index) => {
                            return (
                                <div className="building-element">
                                    <Link to={
                                        {
                                            pathname: "/map",
                                            myCustomProps: building,
                                        }
                                    }>
                                        {building && <span>{building.buildingname}</span>}

                                    </Link>

                                    <div className="building-action">
                                        <Link to={
                                            {
                                                pathname: "/edit",
                                                myCustomProps: building,
                                                index: index,
                                                activeuser: activeuser

                                            }
                                        }>
                                            <span href={''}><i className='far fa-edit'></i></span>
                                        </Link>
                                        <Link to="./map">
                                            <span key={index} onClick={() => {
                                                console.log("button");

                                                dispatch(deletebuilding(activeuser, index))
                                            }}><i className='far fa-trash-alt'></i>
                                            </span>
                                        </Link>

                                    </div>
                                </div>
                            )
                        })}

                        </div>}
                        <div className="add-building">
                            <Link to={
                                {
                                    pathname: "/form",
                                    myCustomProps: activeuser,
                                }
                            }>
                                <a className="button primary-button add-building-link" href="./form"
                                    onClick={routeChange}>Add building</a>
                            </Link>
                        </div>
                    </div>
                </div>}
                <div className="column">
                    <Switch>
                        <Route exact path="/form" component={Frombuild} />
                        <Route path="/map" component={MapContainer} />
                        <Route path="/edit" component={EditContainer} />
                        <Route path="/user" component={Userpage} />

                    </Switch>
                </div>

            </div>
        </BrowserRouter>

    );
}
    ;

export default App;