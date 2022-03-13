import {React,useEffect,useState} from 'react'
import db from '../firebase';
import Message from '../Messages/Message';
import FlipMove from 'react-flip-move';
import './Messages.css';
import { confirmAlert } from 'react-confirm-alert'; 
const Messages = ({user,scrollToBottom,addReply}) => {
    const [messages,setMessages] = useState([]);
    const vanishMsg = (message_id) => {
        var messages = db.collection('messages').where('message_id','==',message_id);
        messages.get().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                doc.ref.delete();
            });
        });
    }
    const deleteMessage = (message_id) => {
        confirmAlert({
            title: '',
            message: 'Are you sure want to delete this?',
            buttons: [
              {
                label: 'Yes',
                onClick: () => vanishMsg(message_id)
              },
              {
                label: 'No',
                onClick: () =>  console.log("aSdfasdfas")
              }
            ]
        });
    }
    useEffect(() => {
        db.collection('messages')
        .orderBy('timestamp')
        .onSnapshot(snapshot => {
            setMessages(snapshot.docs.map(doc => (
                    {id:doc.id, message:doc.data()}
                ))
            );
        })
    }, []);
    useEffect(scrollToBottom, [messages]);
    return (
        <div className={`messages__fbmc`}  id="messagesWrapper" >
            <FlipMove>
                {
                    messages.map(({id,message}) => (
                        <Message addreply={addReply} deleteMessage={deleteMessage} id={id} key={id} message={message} user={user} />
                    ))
                }   
               <div id="lastEl"></div> 
            </FlipMove>
        </div>
    );
}

export default Messages;