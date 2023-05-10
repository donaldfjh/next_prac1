import { MongoClient, ObjectId } from "mongodb";
import Head from "next/head";
import { useRouter } from "next/router";
import { Fragment } from "react";
import MeetupDetail from "../../components/meetups/MeetupDetail";

function detailPage(props){
    // const router = useRouter()
    // const newsId = router.query.newsId
    
    return( 
    <Fragment>
        <Head>

        <title>{props.meetupData.title}</title>
        <meta name='description' content={props.meetupData.description}/>
        </Head>
        <MeetupDetail 
    source = {props.meetupData.image}
    address = {props.meetupData.address}
    title = {props.meetupData.title}
    description = {props.meetupData.description}
    />
    </Fragment>
    
   
    )
}
export default detailPage;

export async function getStaticPaths(){
    const client = await MongoClient.connect('mongodb+srv://user_0:ffang2198@cluster0.1hgvdjv.mongodb.net/?retryWrites=true&w=majority')
        const db = client.db();

        const meetsupCollection = db.collection('meetups')
        // find give us access all the meetups
        //secound param here is {_id: 1} we choose all the _id,only return id no ohter
        const meetups = await meetsupCollection.find({}, {_id: 1}).toArray()
        client.close

    return{
        fallback:false ,
        paths:meetups.map(meetup=>({
            params:{meetupId:meetup._id.toString()}
        }))
        
        
        // [
        //     {
        //         params: {
        //             meetupId:'m1'
        //         }
        //     },
        //     {
        //         params: {
        //             meetupId:'m2'
        //         }
        //     }
        // ]
    }
}

export async function getStaticProps(context){
    //fetch data for single meetup
    // in the getStaticProps , there's an context parameter's which can visit 
    //this params key will be a object where identifier between the suqare breacket will be property, and the value will be actual value
    //that coded in URL , so here the params attribute is meetupId, because that is the identifier here in the square breacket 
    const meetupId = context.params.meetupId;
    console.log(meetupId)

    const client = await MongoClient.connect('mongodb+srv://user_0:ffang2198@cluster0.1hgvdjv.mongodb.net/?retryWrites=true&w=majority')
    const db = client.db();

    const meetsupCollection = db.collection('meetups')
    // find give us access all the meetups
    // findOne find one single document

    const selectedMeetup = await meetsupCollection.findOne({ 
        _id: new ObjectId(meetupId),
    });
   console.log(selectedMeetup)
    client.close()
    return {
        props:{
            meetupData: {
                id:selectedMeetup._id.toString(),
                title:selectedMeetup.title,
                image: selectedMeetup.image,
                description:selectedMeetup.description,
                address:selectedMeetup.address
            }
        }
    }
}