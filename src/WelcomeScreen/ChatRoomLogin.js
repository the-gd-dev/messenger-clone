import { useEffect, useState } from 'react';
import {React} from 'react'
import { useHistory } from "react-router-dom";
import db from '../firebase';
import firebase from 'firebase';
import Cookies from 'universal-cookie';
import randomstring from 'randomstring'; 
const ChatRoomLogin = () => {
    const cookies = new Cookies();
    const history = useHistory();
    const [userName,setUserName] = useState('');
    useEffect(() => {
        const user = cookies.get('user');
        if(user){
            history.push("/live-rooms"); 
        }
    }, [])
    const googleSignIn = () =>{
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth()
        .signInWithPopup(provider)
        .then((result) => {
            if (result.credential) {
                var credential = result.credential;
                var token = credential.accessToken;
            }
            var googleUser = result.user;
            const user = {
                id:randomstring.generate(),
                google_token:token,
                name:googleUser.displayName,
                email:googleUser.email,
                photoUrl:googleUser.photoURL,
                emailVerified:googleUser.emailVerified,
            }
            cookies.set('user',user);
            UserJoined(user);
            db.collection('users').add(user);
            history.push("/live-rooms");
        }).catch((error) => {
            console.log('firebase caught an error => ',error);
        });
    }
    const loginToChatRoom = () => {
        const user = {
            id:randomstring.generate(),
            name:userName,
            email:'',
            photoUrl:'',
            emailVerified:false,
        }
        cookies.set('user',user);
        UserJoined(user);
        //db.collection('users').add(user);
        history.push("/live-rooms");
    }
    const UserJoined = (user) => {
        db.collection('messages').add({
            text: user.name+' has joined the conversation.',
            image:'',
            type:'user-left',
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            user
        })
    }
    return (
        <div className="row justify-content-center">
            <div className="col-sm-12">
                    <header className="card shadow text-white bg-primary welcomescreen p-4">
                    <div className="w-100 text-right"><small>v1.3.2</small></div> 
                    <div className="row">
                        <div className="col-2 my-4">   
                            <img height="50" width="50" src="https://firebasestorage.googleapis.com/v0/b/facebook-messenger-clone-f3be2.appspot.com/o/assets%2Ffbmc_logo.png?alt=media&token=7d126449-7465-4f39-8860-e5ff69b0f43e" alt="" />
                        </div>
                        <div className="col-10 pt-2  my-4">
                            <h4>FBM Live Chat Room</h4>   
                        </div>  
                        <div className="col-12 mb-5">
                            <form className="form-inline" onSubmit={loginToChatRoom}>
                                <div className="form-group col-sm-8">
                                    <input type="text" value={userName} onChange={e => setUserName(e.target.value)} className="form-control w-100 py-4" placeholder="Username / Email Address" />
                                </div>
                                <div className="form-group col-sm-4">
                                    <button className="w-100 join-btn" >Join </button>
                                </div>
                                
                                <div className="col-12 google-sign-in-btn-wrap">
                                    
                                    <button type="button" className="btn btn-block btn-light btn-lg" onClick={googleSignIn}>
                                        <img  src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png" height="25" width="25" alt="" />
                                        &nbsp;&nbsp;&nbsp;SignIn with google
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                    </header>
                </div>
            </div>
    );
}

export default ChatRoomLogin;