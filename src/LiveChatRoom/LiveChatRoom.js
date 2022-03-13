import {React,useState} from 'react'
import Messages from '../Messages/Messages';
import ChatHeader from '../components/ChatHeader';
import Footer from '../components/Footer';
import SendMessage from '../components/SendMessage';
import Navbar from '../components/Navbar';
import Cookies from 'universal-cookie';
const ChatScreen = () => {
    const cookies = new Cookies();
    const user = cookies.get('user');
    const [emojiSectionHide,setEmojiSectionHide] = useState(true)
    const [replyMessage,setReplyMessage] = useState(null);
    const hideShowEmojiSection = (value) => {
        if(value){
            setEmojiSectionHide(value);
        }else{
            const toggle = !emojiSectionHide;
            setEmojiSectionHide(toggle);
        }
        
    } 
    const scrollToBottom = () => {
        const messagesEndRef = document.getElementById('lastEl');
        const wrapper = document.getElementById('messagesWrapper');
        wrapper.scrollTo({top:messagesEndRef.offsetTop,behviour:'smooth'});
    }
    const SetReply = (message,doc_id) => setReplyMessage({message,doc_id});
    const removeReply = () => setReplyMessage(null);
    return (
        <div>
        <Navbar title="FBM Chat Room"/>
        <div className="fbm__chat_room container">
            <div className="row justify-content-center">
                <div className="col-sm-12">
                    <div className="card border-0 p-2">
                        <div className="row">
                            <div className="col-sm-12">
                                <ChatHeader user={user} scrollToBottom={scrollToBottom} />
                            </div>
                            <div className={`col-sm-12 px-0 border-left border-right ${!emojiSectionHide ? 'emoji-open' : '' }`}>
                                <Messages addReply={SetReply} emojiOpen={emojiSectionHide} user={user} scrollToBottom={scrollToBottom} />
                            </div>
                            <div className="col-sm-12 px-0 border">
                                <SendMessage removereply={removeReply}   reply={replyMessage} emojiSectionHide={emojiSectionHide} hideShowEmojiToggle={hideShowEmojiSection} user={user}  scrollToBottom={scrollToBottom} />
                            </div>                          
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
        <Footer />
        </div>
    );
}

export default ChatScreen;