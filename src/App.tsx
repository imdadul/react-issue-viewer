import * as React from "react";
import "antd/dist/antd.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import IssueViewer from "./components/IssueViewer";
import { IssueDetails } from "./components/IssueDetails";
export interface IssueRouteParam {
  issueId: string;
}
const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/issues">
          <IssueViewer />
        </Route>
        <Route path="/issues/:issueId">
          <IssueDetails />
        </Route>
        <Route path="*">
          <Redirect to="/issues" />
        </Route>
      </Switch>
    </Router>
  );
};
export default App;
