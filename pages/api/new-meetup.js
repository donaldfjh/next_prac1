//api/new-meetup
import {MongoClient} from 'mongodb'

async function handler(req,res){
    //request object contain the data of the request
    //response object will sending back response 
    //req.method help us find what kinds of request send , whether it is post, or get 
    if(req.method === "POST"){
        //like body is the data in the field 
        const data = req.body;

        const client = await MongoClient.connect('mongodb+srv://user_0:ffang2198@cluster0.1hgvdjv.mongodb.net/?retryWrites=true&w=majority')
        const db = client.db();

        const meetsupCollection = db.collection('meetups')


        //insert one new document into this collection
        //the document at the end is a obejct, so we can insert JS object
       const result = await meetsupCollection.insertOne(data)

       console.log(result)

       client.close();

       res.status(201).json({message:'Meetup inserted'})
    
    }

}

export default handler
