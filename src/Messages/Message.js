import React, { forwardRef }  from 'react'
import ImageMessage from '../components/ImageMessage';
import './Message.css'; 
const Message = forwardRef((props,ref) => (
    props.message.type === 'message' || props.message.type === 'emojis_only' ?
    <div  ref={ref} className={`row ${ props.user.name === props.message.user.name ? 'sender' : 'not_sender'}`}>
        <h6>{props.message.user.name}</h6>
        <div className="col-12 px-0">
            {
                props.message.user.photoUrl != '' ?
                <img src={ props.message.user.photoUrl} alt={props.message.user.id} className="userPhoto"/>:
                <span className="fa fa-user-circle default-user"></span>
            }
            {
                props.user.name === props.message.user.name ?
                <div className="d-inline">
                    <button onClick={() => props.addreply(props.message,props.id)} className="btn btn-light text-info btn-sm mx-1"><span className="fa fa-reply"></span></button>
                    {
                     props.user.name === props.message.user.name ?
                        <button onClick={() => props.deleteMessage(props.message.message_id)} className="btn btn-light text-danger mx-1 btn-sm"><span className="fa fa-trash"></span></button>
                     :  null 
                    }
                </div> : null
            }
            <span className={props.message.type === 'emojis_only' ? "h4" : "msg_text"}>{props.message.text}</span>
            {
                props.user.name === props.message.user.name ?
                null :  
                <div className="d-inline">
                    <button onClick={() => props.addreply(props.message,props.id)} className="btn btn-light text-info btn-sm mx-1"><span className="fa fa-reply"></span></button>
                    {
                     props.user.name === props.message.user.name ?
                        <button onClick={() => props.deleteMessage(props.message.message_id)} className="btn btn-light text-danger mx-1 btn-sm"><span className="fa fa-trash"></span></button>
                     :  null 
                    }
                </div>
            }
            
        </div>
    </div>  : 
    props.message.type === 'image' ? 
    <div  ref={ref} className={`row ${ props.user.name === props.message.user.name  ? ' sender' : 'not_sender'}`}>
        <h6>{props.message.user.name}</h6>
        <div className={`w-100   ${ props.user.name === props.message.user.name  ? 'text-right' : 'text-left'}`} >
            {
                props.message.user.photoUrl != '' ?
                <img src={ props.message.user.photoUrl} alt={props.message.user.id} className="userPhoto"/>:
                <span className="fa fa-user-circle default-user"></span>
            }
            
            {
                props.user.name === props.message.user.name ?
                <div className="d-inline">
                    <button onClick={() => props.addreply(props.message,props.id)} className="btn btn-light text-info btn-sm mx-1"><span className="fa fa-reply"></span></button>
                    {
                     props.user.name === props.message.user.name ?
                        <button onClick={() => props.deleteMessage(props.message.message_id)} className="btn btn-light text-danger mx-1 btn-sm"><span className="fa fa-trash"></span></button>
                     :  null 
                    }
                </div> : null
            }
            <ImageMessage key={props.key}  image={ props.message.image} side={props.user.name === props.message.user.name }/>
            {
                props.user.name === props.message.user.name ?
                null :  
                <div className="d-inline">
                    <button onClick={() => props.addreply(props.message,props.id)} className="btn btn-light text-info btn-sm mx-1"><span className="fa fa-reply"></span></button>
                    {
                     props.user.name === props.message.user.name ?
                        <button onClick={() => props.deleteMessage(props.message.message_id)} className="btn btn-light text-danger mx-1 btn-sm"><span className="fa fa-trash"></span></button>
                     :  null 
                    }
                </div>
            }
        </div>
    </div>     
    :props.message.type === 'reply' ? 
    <div  ref={ref} className={`row ${ props.user.name === props.message.user.name  ? ' sender' : 'not_sender'}`}>
        <h6>{props.message.user.name}</h6>
        <div className={`w-100 ${ props.user.name === props.message.user.name  ? 'text-right' : 'text-left'}`} >
            <div className="w-100">
                {
                    props.message.reply.type === 'message' || props.message.reply.type === 'emojis_only' ?
                        <span className="reply">{props.message.reply.text}</span>
                    :
                    <span className="msg_reply-image"><img className="img-thumbnail" height="80" width="80" src={props.message.reply.image} alt={props.message.reply.message_id} /></span>
                   
                }
            </div>
            {
                props.user.name === props.message.user.name ?
                <div className="d-inline">
                    <button onClick={() => props.addreply(props.message,props.id)} className="btn btn-light text-info btn-sm mx-1"><span className="fa fa-reply"></span></button>
                    {
                     props.user.name === props.message.user.name ?
                        <button onClick={() => props.deleteMessage(props.message.message_id)} className="btn btn-light text-danger mx-1 btn-sm"><span className="fa fa-trash"></span></button>
                     :  null 
                    }
                </div> : null
            }
            
            <span className={props.message.type === 'emojis_only' ? "h4" : "msg_text"}>{props.message.text}</span>
            {
                props.user.name === props.message.user.name ?
                null :  
                <div className="d-inline">
                    <button onClick={() => props.addreply(props.message,props.id)} className="btn btn-light text-info btn-sm mx-1"><span className="fa fa-reply"></span></button>
                    {
                     props.user.name === props.message.user.name ?
                        <button onClick={() => props.deleteMessage(props.message.message_id)} className="btn btn-light text-danger mx-1 btn-sm"><span className="fa fa-trash"></span></button>
                     :  null 
                    }
                </div>
            }
        </div>
    </div>     
    :
    <p className="user-left">
        {props.message.text}
    </p> 
))
export default Message;

