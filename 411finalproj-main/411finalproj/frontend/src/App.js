import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SignUp from './pages/SignUp';
import Match from './pages/Match'; // Import the component for the another page route

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={SignUp} />
        <Route path="/get-match" component={Match} /> {/* Define the route for the another page */}
        {/* Add more routes as needed */}
      </Switch>
    </Router>
  );
}

export default App;