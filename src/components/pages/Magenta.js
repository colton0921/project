import React, { useState, useEffect } from 'react';
import {useRequestDevice} from 'react-web-bluetooth';
import LoadMagenta from '../LoadMagenta';
import MagentaDemo from '../MagentaDemo';
import Spinner from '../../util/Spinner';
import '../../App.css';


const Magenta = () => {
    const [loaded, setLoaded] = useState(false);
    const [fetched, setFetched] = useState(false);
    const {onClick , device} = useRequestDevice({
        acceptAllDevices : true
    });

    const onClickHandler = (e)=> {
        e.preventDefault();
        onClick();
        setFetched(true);
    }

    useEffect(()=> {
        LoadMagenta(()=> {
            setLoaded(true)
        });
    });

    useEffect(()=> {
        console.log("This is the device")
        console.log(device);
    }, [setFetched]);


    return (
        <div className="demo">
            {loaded ? <MagentaDemo /> : <Spinner message="Loading Model" />}
            {!device && <button onClick={onClick}>Connect</button>}
            {device ? <span>{device.name}</span> : <span>Not fetch</span>}
        </div>
    );
};

export default Magenta;