import { Redirect } from "react-router-dom";
import {Route,Switch,BrowserRouter} from "react-router-dom";

import Login from "../container/login/login";
import Verification from "../container/login/verify";
import CreateAccount from "../container/login/createaccount";
import Editor from "../container/editor";
import Saved  from "../container/saved";

function Router () {
    return (
        <>
             <BrowserRouter>
                <Switch>
                    <Route path="/home"  component={Editor }/>
                    <Route path="/" exact>
                        <Redirect to="/home" />
                    </Route>
                    <Route path='/login' component = {Login} />
                    <Route path="/Verify" component={Verification} />
                    <Route path="/createaccount" component={CreateAccount}/>
                    <Route path="/saved" component={Saved} />
                </Switch>
            </BrowserRouter>
        </>
    )
}

export default Router

