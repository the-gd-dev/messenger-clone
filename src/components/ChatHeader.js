import React from 'react'
import db from '../firebase'
import './ChatHeader.css'
import firebase from 'firebase'
import { useHistory } from 'react-router'
import Cookies from 'universal-cookie'

const ChatHeader = ({user}) => {
    const cookies = new Cookies();
    const history = useHistory();
    const leaveChatRoom = () => {
        db.collection('messages').add({
            text: `${user.name} has left the conversation.`,
            image:'',
            type:'user-left',
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            user:{
                name:user.name ? user.name : 'John Doe'
            }
        })
        cookies.remove('user');
        history.push("/");
    }
    return (
        <div className="row" id="chat-header">
            <div className="col-3 col-md-1 pr-0">
                {
                    user.photoUrl != '' ?
                    <img src={user.photoUrl} alt={user.id} className="user-image"/>:
                    <span className="fa fa-user-circle default-user"></span>
                }
            </div>
            <div className="col-9 col-md-7 pl-0">
                <h4 className='username ml-1'> {user.name} </h4>
            </div>
            <div className="col-12 col-md-4 text-right">
                <button className="btn btn-info leave-room" onClick={leaveChatRoom}>Leave Chat Room</button>
            </div>
        </div>
    );
}

export default ChatHeader;