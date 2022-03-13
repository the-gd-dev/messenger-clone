import {React, useState} from 'react'
import firebase from 'firebase';
import db from '../firebase';
import { Picker } from 'emoji-mart'
import randomstring from 'randomstring'; 
import './SendMessage.css'
const SendMessage = (props) => {
    const [uploadStatus,setUploadStatus] = useState(0);
    const [textMessage,setTextMessage] = useState('');
    const uploadFiles = (uploader) => {
        const file = uploader.files[0];
        const storage = firebase.storage()
        const uploadTask = storage.ref(`/images/${file.name}`).put(file)
        //initiates the firebase side uploading 
        uploadTask.on('state_changed', (snap) => {
            const percentUploaded = Math.round((snap.bytesTransferred / snap.totalBytes) * 100);
            setUploadStatus(percentUploaded); 
        }, (err) => {
            //catches the errors
            console.log(err)
        }, () => {
            storage
            .ref('images')
            .child(file.name)
            .getDownloadURL()
            .then(fireBaseUrl => {
                sendMessage({
                    image_url:fireBaseUrl,
                    type:'image',
                    text:'',
                    user:props.user
                });
                setUploadStatus(0); 
            })
        })
    }
    const onlyEmojis = (text) => {
        const ranges = [
            '\ud83c[\udf00-\udfff]', // U+1F300 to U+1F3FF
            '\ud83d[\udc00-\ude4f]', // U+1F400 to U+1F64F
            '\ud83d[\ude80-\udeff]', // U+1F680 to U+1F6FF
            ' ', // Also allow spaces
          ].join('|');
        return text.match(ranges);   
    }
    const sendTextMessage = (event) => {
        event.preventDefault();
        var reply = props.reply;
        if(reply !== null){
            const message = {
                type:reply.message.image !== '' ? 'image' : 'message',
                image:reply.message.image,
                text:reply.message.text,
            }
            sendMessage({
                text:textMessage,
                type:'reply',
                user:props.user,
                reply:message
            });
            return false;
        }else{
            if(textMessage.trim()){
                sendMessage({
                    text:textMessage,
                    type:'message',
                    user:props.user,
                }); 
            }
        }

    }
    const addEmojiToText = (emoji) => {
        const text = textMessage + emoji.native;
        setTextMessage(text);
    }
    const sendMessage = (data) => {
        db.collection('messages').add({
            message_id:randomstring.generate(),
            text:data.text ? data.text : '' ,
            image:data.image_url ? data.image_url : '' ,
            type:data.type ? data.type : 'message',
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            user:data.user,
            reply:data.reply ? data.reply : {}
        })
        props.hideShowEmojiToggle(true);
        props.removereply();
        setTextMessage('');
        props.scrollToBottom();
    }
    
    return (
        <div className="text-center" >
            {
                uploadStatus > 0  ? 
                <div className="col-12 image-progress">
                    Uploading Image
                    <div className="progress">
                        <div className="progress-bar progress-bar-striped" role="progressbar" style={{width:uploadStatus+'%'}} aria-valuenow="10" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                </div>
                : null
            }
            {
                props.reply !== null ? 
                <div className="col-12 text-left pl-5 pt-3">
                    {
                        props.reply.message.type === 'image' ?
                        <img height="100" width="100" className="img-thumbnail" src={props.reply.message.image} alt={props.reply.message.message_id} />
                        :<h6 className="msg_reply">{props.reply.message.text}</h6>
                    }
                   

                </div>
                : null
            }
            <div className="custom-setting" > 
                <div className={'emoji-section '+ (props.emojiSectionHide ? 'hidden' : 'show')} >
                    <Picker onSelect={addEmojiToText} style={{width:'100%'}}/>
                </div>
                <form className="d-flex px-2 pt-3" onSubmit={sendTextMessage} >
                    <div className="mr-1">
                        <input type="file" accept="image/*" onChange={e => uploadFiles(e.target)} className="d-none" id="attachfiles" />
                        <label className="btn btn-light ml-1" htmlFor="attachfiles"><span className="fa fa-paperclip"></span></label>
                    </div>
                    <div className="mr-1">
                        <button className={`btn ${!props.emojiSectionHide ? 'btn-primary ' : 'btn-light ' }`}  type="button" onClick={ () => props.hideShowEmojiToggle(false)}  > <span className="fa fa-smile"></span> </button>
                    </div>
                    <div className="w-100">
                        <input type="text" value={textMessage} onChange={e => setTextMessage(e.target.value)} placeholder="write a message ..."  className="form-control" aria-describedby="passwordHelpInline" />
                    </div>
                    <div>
                        <button className="btn btn-primary ml-1"><span className="fa fa-location-arrow"></span></button>
                    </div>
                </form>
                
            </div>
        </div>
    );
}

export default SendMessage;