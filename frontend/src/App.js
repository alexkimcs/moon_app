import React, { useState } from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css'

import Login from './components/Login'
import SignUp from './components/Signup'
import Dashboard from './components/Dashboard'


function App() {

  return (
    <div className="App">
      

      <BrowserRouter>
        <Route forceRefresh={true}>
          <Switch>
            <Route path="/" exact component={ Login }/>
            <Route path="/signup" exact component={ SignUp }> 
            </Route>
            <Route path="/dashboard" exact component={ Dashboard }/>
            <Route path="/" render={() => <div>404 not found</div>}/>

          </Switch>
        </Route>
      </BrowserRouter>
  
    </div>
  );
}

export default App;


/* <BrowserRouter>
<Route forceRefresh={true}>
  <Switch>
    <Route path="/" exact component={ Login }/>
    <Route path="/signup" exact component={ SignUp }/>
    <Route path="/dashboard" exact component={ Dashboard }/>
    <Route path="/crypto" exact component={ Crypto }/>
    <Route path="/" render={() => <div>404 not found</div>}/>
  </Switch>
</Route>
</BrowserRouter> */