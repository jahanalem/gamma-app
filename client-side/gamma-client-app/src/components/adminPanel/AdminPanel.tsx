import React from 'react';
import { Admin, Resource, ListGuesser } from 'react-admin';
import simpleRestProvider from 'ra-data-simple-rest';


const dataProvider = simpleRestProvider('http://localhost:3000/api');

const AdminPanel = () => (
    <Admin dataProvider={dataProvider}>
        {/* <Resource name="users" list={ListGuesser} /> */}
        <Resource name="posts" list={ListGuesser} />
    </Admin>
);

export default AdminPanel;