import * as React from "react";
import { List, Datagrid, TextField, EmailField, UrlField, NumberField, Edit, TextInput, NumberInput,
SimpleForm } from 'react-admin';
import MyUrlField from './myurlfield';

export const UserTitle = ({ record }) => {
    return <span>{record ? `"${record.title}"` : ''}</span>;
};

export const UserList = props => (
    <List {...props}>
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <TextField source="name" label="Nume" />
            {/* <TextField source="username" /> */}
            <EmailField source="email" />
            {/* <TextField source="address.street" /> */}
            <TextField source="activity_time" label="Ore de activitate" />
        </Datagrid>
    </List>
);

export const UserEdit = props => (
    <Edit title={<UserTitle />} {...props}>
        <SimpleForm>
            {/* <TextInput disabled source="id" />
            <ReferenceInput source="userId" reference="users">
                <SelectInput optionText="name" />
            </ReferenceInput> */}
            <TextInput disabled source="id" />
            <TextInput source="name" label="Nume" />
            <TextInput source="email"  />
            <NumberInput source="activity_time" label="Timp la activitati" />
            <NumberInput source="work_time" label="Timp de voluntariat" />
            {/* <TextInput multiline source="body" /> */}
        </SimpleForm>
    </Edit>
)