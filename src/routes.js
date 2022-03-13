import { BrowserRouter, Route, Switch } from "react-router-dom";
import React from 'react'
import WelcomeScreen from "./WelcomeScreen/WelcomeScreen";
import LiveChatRoom from "./LiveChatRoom/LiveChatRoom";
const Routes = (props) => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/live-rooms" component={LiveChatRoom} />
                <Route path="/" component={WelcomeScreen} />
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;