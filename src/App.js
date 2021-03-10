import "./styles.css";
import EngagementSummary from "./EngagementSummary";
import DashboardTemplate from "./Templates/Dashboard";
import { Redirect, Route, Switch } from "react-router";
import AssessmentsPage from './AssessmentsPage'

export default function App() {
  return (
    <div className="App">
      <DashboardTemplate>
        <Switch>
          <Route exact path="/" component={props => <Redirect to="/engagement" />} />
          <Route exact path="/engagement" component={EngagementSummary} />
          <Route exact path="/assessments" component={AssessmentsPage} />
        </Switch>
      </DashboardTemplate>
    </div>
  );
}
