import {Route, Switch} from 'react-router-dom'
import Home from './components/Home'
import Login from './components/Login'
import Jobs from './components/Jobs'
import JobItemsDetails from './components/JobItemsDetails'
import ProtectedRoute from './components/ProtectedRoute'
import NotFound from './components/NotFound'

import './App.css'

const App = () => (
  <>
    <Switch>
      <Route exact path="/login" component={Login} />
      <ProtectedRoute exact path="/" component={Home} />
      <ProtectedRoute exact path="/jobs" component={Jobs} />
      <ProtectedRoute exact path="/jobs/:id" component={JobItemsDetails} />
      <Route component={NotFound} />
    </Switch>
  </>
)

export default App
