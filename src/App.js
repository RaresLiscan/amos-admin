import * as React from "react";
import { Admin, Resource } from 'react-admin';
import { UserEdit, UserList } from './general/users';
import PostIcon from '@material-ui/icons/Book';
import UserIcon from '@material-ui/icons/Group';
import Dashboard from './Dashboard';
import authProvider from './auth/authProvider';
import dataProvider from './dataProvider';
import { ActivityList, ActivityCreate } from './cardinal/activities';
import { CardinalList } from './cardinal/cardinal';
import ActivityEdit from './cardinal/ActivityEdit';
import AssessmentIcon from '@material-ui/icons/Assessment';
import simpleRestProvider from 'ra-data-simple-rest';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import MonthlyActivityReport from "./cardinal/monthlyActivityReport";
import StatsAndReports from "./cardinal/statsAndReports";
import dataProviderNode from "./dataProviderNode";

// const dataProvider = jsonServerProvider('https://jsonplaceholder.typicode.com');
const App = () => (

    <Router>
        <Switch>
            <Route path={"/pdf/:month/:year"} component={MonthlyActivityReport}/>
            <Route path={"/"}>
                <Admin dashboard={Dashboard}
                    dataProvider={dataProviderNode}
                    // authProvider={authProvider}
                >
                    <Resource name="projects" list={ActivityList} edit={ActivityEdit} create={ActivityCreate} icon={PostIcon} options={{ label: 'Activităţi' }} />
                    <Resource name="users" edit={UserEdit} list={UserList} icon={UserIcon} options={{ label: 'Membri' }} />
                    {/*<Resource name="stats" edit={UserEdit} list={StatsAndReports} icon={AssessmentIcon} options={{ label: 'Statistici și raportări' }} />*/}
                    {/*<Resource name="posts" list={PostList} edit={PostEdit} create={PostCreate} icon={PostIcon}/>*/}
                </Admin>
                {/*<Admin*/}
                {/*    // dashboard={Dashboard}*/}
                {/*// authProvider={authProvider}*/}
                {/*// dataProvider={dataProvider}*/}
                {/*dataProvider={simpleRestProvider('http://localhost:3000')}*/}
                {/*>*/}
                {/*    <Resource name="activities" list={ActivityList} edit={ActivityEdit} create={ActivityCreate} icon={PostIcon} options={{ label: 'Activităţi' }} />*/}
                {/*    /!*<Resource name="registration" list={CardinalList} edit={ActivityEdit} create={ActivityCreate} icon={HowToRegIcon} options={{ label: 'Înscrieri' }} />*!/*/}
                {/*    <Resource name="users" edit={UserEdit} list={UserList} icon={UserIcon} options={{ label: 'Membri' }} />*/}
                {/*    <Resource name="stats" edit={UserEdit} list={StatsAndReports} icon={AssessmentIcon} options={{ label: 'Statistici și raportări' }} />*/}
                {/*    /!* <Resource name="users" edit={UserEdit} list={UserList} icon={UserIcon} options={{ label: 'Statistici' }} /> *!/*/}
                {/*</Admin>*/}
            </Route>
        </Switch>
    </Router>
);

export default App;