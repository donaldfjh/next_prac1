import { Fragment } from "react";
import classes from './MeetupDetail.module.css';
function MeetupDetail(props){
    console.log(props)
    return(
    <section className={classes.detail}>
        <img src = {props.source} alt = 'A First MeetUp'/>
        <h1>{props.title}</h1>
        <address>{props.address}</address>
        <p>{props.description}</p>
    </section>
    )
}

export default MeetupDetail;