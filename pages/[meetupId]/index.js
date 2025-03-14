import { MongoClient, ObjectId } from "mongodb";
import MeetUpDetail from "../../components/meetups/MeetUpDetail";

export default function MeetUpDetails(props){
    return(
        <MeetUpDetail image={props.meetUpData.image} title={props.meetUpData.title} address={props.meetUpData.address} description={props.meetUpData.description}/>
    )
}

export async function getStaticPaths() {
    const client = await MongoClient.connect('mongodb+srv://narendrapb1234:UPM5TJONDRxVtyWE@cluster0.frbpw.mongodb.net/meetups?retryWrites=true&w=majority&appName=Cluster0')
    
        const db = client.db()
    
        const meetupsCollection = db.collection('meetups');
        const meetups = await meetupsCollection.find({}, { _id:1 }).toArray()

        return {
            fallback:'blocking',
            paths:meetups.map(meetup=>({ params: {meetupId: meetup._id.toString()}}))
        }
}
export async function getStaticProps(context) {
    const meetUpId = context.params.meetupId
    const client = await MongoClient.connect('mongodb+srv://narendrapb1234:UPM5TJONDRxVtyWE@cluster0.frbpw.mongodb.net/meetups?retryWrites=true&w=majority&appName=Cluster0')
    
        const db = client.db()
    
        const meetupsCollection = db.collection('meetups');
        const selectedMeetup = await meetupsCollection.findOne({_id: new ObjectId(meetUpId)})
    
        client.close()
    return{
        props:{
            meetUpData:{
                id: selectedMeetup._id.toString(),
                title:selectedMeetup.title,
                address:selectedMeetup.address,
                image:selectedMeetup.image,
                description:selectedMeetup.description
            }
        }
    }
}