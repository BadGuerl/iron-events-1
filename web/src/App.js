import { Route, BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
import Navbar from './components/nav/Navbar';
import Footer from './components/footer/Footer';
import Events from './screens/Events';
import EventForm from './components/events/EventForm';
import EventDetail from './components/events/EventDetail';
import Login from './screens/Login';
import Register from './screens/Register';
import AuthStore from './contexts/AuthStore';
import PrivateRoute from './guards/PrivateRoute';

function App() {
  return (
    <Router>
      <AuthStore>
        <Navbar />
        <div className="container pt-4 pb-5">
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            
            <PrivateRoute exact path="/events" component={Events} />
            <PrivateRoute exact path="/create-event" component={EventForm} />
            <PrivateRoute exact path="/events/:id" component={EventDetail} />
            
            <Redirect to="/events" />
          </Switch>
        </div>
        <Footer/>
      </AuthStore>
    </Router>
  );
}

export default App;
