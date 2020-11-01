import * as React from "react";
import { Admin, Resource } from 'react-admin';
import { UserEdit, UserList } from './users';
import PostIcon from '@material-ui/icons/Book';
import UserIcon from '@material-ui/icons/Group';
import Dashboard from './Dashboard';
import authProvider from './authProvider';
import dataProvider from './dataProvider';
import { ActivityList, ActivityCreate } from './activities';
import { CardinalList } from './cardinal';
import ActivityEdit from './ActivityEdit';
import HowToRegIcon from '@material-ui/icons/HowToReg';
import UserChart from './usersChart';
import AssessmentIcon from '@material-ui/icons/Assessment';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import MonthlyActivityReport from "./monthlyActivityReport";
import StatsAndReports from "./statsAndReports";

// const dataProvider = jsonServerProvider('https://jsonplaceholder.typicode.com');
const App = () => (


    <Router>
        <Switch>
            <Route path={"/pdf/:month/:year"} component={MonthlyActivityReport}/>
            <Route path={"/"}>
                <Admin dashboard={Dashboard} authProvider={authProvider} dataProvider={dataProvider}>
                    <Resource name="activities" list={ActivityList} edit={ActivityEdit} create={ActivityCreate} icon={PostIcon} options={{ label: 'Activităţi' }} />
                    {/*<Resource name="registration" list={CardinalList} edit={ActivityEdit} create={ActivityCreate} icon={HowToRegIcon} options={{ label: 'Înscrieri' }} />*/}
                    <Resource name="users" edit={UserEdit} list={UserList} icon={UserIcon} options={{ label: 'Membri' }} />
                    <Resource name="stats" edit={UserEdit} list={StatsAndReports} icon={AssessmentIcon} options={{ label: 'Statistici și raportări' }} />
                    {/* <Resource name="users" edit={UserEdit} list={UserList} icon={UserIcon} options={{ label: 'Statistici' }} /> */}
                </Admin>
            </Route>
        </Switch>
    </Router>
);

export default App;