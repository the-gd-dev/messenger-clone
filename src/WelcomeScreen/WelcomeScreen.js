import {React} from 'react'
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import ChatRoomLogin from './ChatRoomLogin';
import './WelcomeScreen.css';
const WelcomeScreen = (props) => {
    return (
        <div className="main-wrapper">
            <Navbar />
            <div className="container" id="welcome-page">
                <div className='row'>
                    <div className="col-sm-12">
                        <section className="introduction">
                            <div className='row'>
                                <div className="col-sm-12 col-lg-6 text-part">
                                    <div className="display-4 py-5">Facebook Messenger Clone</div>
                                    <p className="display-7">
                                        Designed and developed by <b  className="text-success">thecreator1407</b>.<br /> 
                                        Built proudly with  <b className="text-primary"><span className="fab fa-react"></span> ReactJS. </b><br /> 
                                        storage  support  <b className="text-warning"><img height="30" width="30" src="https://www.gstatic.com/mobilesdk/160503_mobilesdk/logo/2x/firebase_28dp.png" alt="" />  Firebase.</b>
                                    </p>
                                </div>
                                <div className="col-sm-12 col-lg-6 intro-image">
                                    <div className="p-5">
                                        <img alt="" src="https://firebasestorage.googleapis.com/v0/b/facebook-messenger-clone-f3be2.appspot.com/o/assets%2Ffbmc_logo.png?alt=media&token=7d126449-7465-4f39-8860-e5ff69b0f43e" />
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                    <div className="col-sm-12">
                        <section className="chat-rooms">
                            <div className='row'>
                                <div className="col-sm-12 col-lg-6 text-part">
                                    <div className="display-4 py-5">Chat Rooms</div>
                                    <p className="display-7">
                                        Join chat rooms where all people discuss their ideas about this app and how to improvise this app.
                                    </p>
                                </div>
                                <div className="col-sm-12 col-lg-6">
                                    <ChatRoomLogin  />
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default WelcomeScreen;