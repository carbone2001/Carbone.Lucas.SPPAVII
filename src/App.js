import './App.css';
import Crud from './components/Crud';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route path="/" component={Crud} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
