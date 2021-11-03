import './App.css';
import Crud from './components/Crud';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomePage from './pages/HomePage';
import Error404Page from './pages/Error404Page';
import DetallePage from './pages/DetallePage';
function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/detalles/:id" component={DetallePage} />
          <Route path="*" component={Error404Page} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
