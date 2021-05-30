import * as React from "react";
import { List, Datagrid, TextField, EmailField, TextInput, NumberInput, Edit,
SimpleForm } from 'react-admin';

export const UserTitle = ({ record }) => {
    return <span>{record ? `"${record.name}"` : 'Editeaza utilizatorul'}</span>;
};

export const UserList = props => (
    <List {...props}>
        <Datagrid rowClick="edit">
            <TextField source="index" label={"Nr. Crt."} />
            <TextField source="name" label="Nume" />
            <EmailField source="email" />
            <TextField source="activity_time" label="Ore de activitate" />
            <TextField source={"work_time"} label={"Ore de voluntariat"} />
        </Datagrid>
    </List>
);

export const UserEdit = props => (
    <Edit title={<UserTitle />} {...props}>
        <SimpleForm>
            <TextInput disabled source="id" />
            <TextInput source="name" label="Nume" disabled />
            <TextInput source="email" disabled />
            <NumberInput source="activity_time" label="Ore la activitati (minute)" />
            <NumberInput source="work_time" label="Timp de voluntariat (minute)" />
        </SimpleForm>
    </Edit>
)