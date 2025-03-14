import { MongoClient } from "mongodb"


async function handler(req,res){

    
    if(req.method === 'POST'){
        const data = req.body
        const client = await MongoClient.connect('mongodb+srv://narendrapb1234:UPM5TJONDRxVtyWE@cluster0.frbpw.mongodb.net/meetups?retryWrites=true&w=majority&appName=Cluster0')

        const db = client.db()

        const meetupsCollection = db.collection('meetups')
        const result = await meetupsCollection.insertOne(data)

        console.log(result);

        client.close()
        res.status(201).send({msg:'Inserted Meetup!'})
        

    }
}

export default handler