// import React from 'react';
// import logo from './logo.svg';
// import './App.css';
// import AdminApp from './admin-tutorial/admin';

// function App() {
//   return AdminApp;
//   // return ( Admin
//   //   // <div className="App">
//   //   //   <header className="App-header">
//   //   //     <img src={logo} className="App-logo" alt="logo" />
//   //   //     <p>
//   //   //       Edit <code>src/App.js</code> and save to reload.
//   //   //     </p>
//   //   //     <a
//   //   //       className="App-link"
//   //   //       href="https://reactjs.org"
//   //   //       target="_blank"
//   //   //       rel="noopener noreferrer"
//   //   //     >
//   //   //       Learn React
//   //   //     </a>
//   //   //   </header>
//   //   // </div>
//   // );
// }

// export default App;


import * as React from "react";
import { Admin, Resource, EditGuesser, fetchUtils } from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';
import { UserList } from './users';
import { PostList, PostEdit, PostCreate } from './posts';
import PostIcon from '@material-ui/icons/Book';
import UserIcon from '@material-ui/icons/Group';
import Dashboard from './Dashboard';
import authProvider from './authProvider';
import dataProvider from './dataProvider';
import {ActivityList, ActivityEdit, ActivityCreate} from './activities';

// const httpClient = (url, options = {}) => {
//     if (!options.headers) {
//         options.headers = new Headers({ Accept: 'application/json' });
//     }
//     // add your own headers here
//     options.headers.set('Content-Type', 'application/json');
//     return fetchUtils.fetchJson(url, options);
// }

// const dataProvider = simpleRestProvider("https://api.amosed.ro/api", httpClient);
// const dataProvider = jsonServerProvider('https://jsonplaceholder.typicode.com');
const App = () => (
      <Admin dashboard={Dashboard} authProvider={authProvider} dataProvider={dataProvider}>
          {/* <Resource name="posts" list={PostList} edit={PostEdit} create={PostCreate} icon={PostIcon} /> */}
          <Resource name="activities" list={ActivityList} edit={ActivityEdit} create={ActivityCreate} icon={PostIcon} />
          {/* <Resource name="users" list={UserList} icon={UserIcon} /> */}
      </Admin>
  );

export default App;