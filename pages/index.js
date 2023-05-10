import { Fragment, useEffect, useState } from 'react';
import Layout from '../components/layout/Layout';
import MeetupList from '../components/meetups/MeetupList'
import { MongoClient } from 'mongodb';
import Head from 'next/head'

function HomePage(props){
    // const  [loadedMeetup,setLoadedMeetup] = useState([])
    
    // useEffect(()=>{
    //     //send a http request on fetch data 
    //     //set the setup that we fetch the meetup server as meetup for this component 
    //     setLoadedMeetup(DUMMY_MEETUP);

    // },[])

    return (
    <Fragment>
        <Head>
            <title>React MeetUp</title>
            {/* content here will show on the search engine  */}
            <meta name='description' content='High active React Meetup'/>
        </Head>
        <MeetupList meetups = {props.meetups}/>
    </Fragment>
    )
   
   
}

//never execute on the client side 
export async function getStaticProps(){
    //Fetch data from data API
    const client = await MongoClient.connect('mongodb+srv://user_0:ffang2198@cluster0.1hgvdjv.mongodb.net/?retryWrites=true&w=majority')
    const db = client.db();

    const meetsupCollection = db.collection('meetups')

    const meetups = await meetsupCollection.find().toArray()
    client.close()

    return {
        props:{
            meetups:meetups.map(meetup=>({
                title:meetup.title,
                address:meetup.address,
                image:meetup.image,
                id:meetup._id.toString()
            }))
        },
        revalidate: 10
    }
}

//this function will always on the server after deployment 
// export async function getServerSideProps(context){

//     const req = context.req;
//     const res = context.res;
    

//     return {
//         props:{
//             meetsup:DUMMY_MEETUP
//         },

//     }
// }
export default HomePage;