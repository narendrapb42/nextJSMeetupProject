import { MongoClient } from 'mongodb'
import MeetupList from '../components/meetups/MeetupList'

const DUMMY_MEATUPS = [
    {
        id:'m1',
        title:'A first Meetup',
        image:'',
        address:'Some address 5, 1221323 Some city',
        description:'Some meetup'
    },
    {
        id:'m2',
        title:'A second Meetup',
        image:'',
        address:'Some address 5, 1221323 Some city',
        description:'Some meetup'
    },
    {
        id:'m3',
        title:'A third Meetup',
        image:'',
        address:'Some address 5, 1221323 Some city',
        description:'Some meetup'
    }
]
function HomePage(props){
    return(
        <>
            <MeetupList meetups={props.meetups}/>
        </>
    )
}

export async function getStaticProps() {
    const client = await MongoClient.connect('mongodb+srv://narendrapb1234:UPM5TJONDRxVtyWE@cluster0.frbpw.mongodb.net/meetups?retryWrites=true&w=majority&appName=Cluster0')

    const db = client.db()

    const meetupsCollection = db.collection('meetups');
    const meetups = await meetupsCollection.find().toArray()

    client.close()

    return {
        props:{
            meetups:meetups.map((m)=>({
                title:m.title,
                address:m.address,
                image:m.image,
                id:m._id.toString()
            }))
        },
        revalidate:1
    }
}
export default HomePage