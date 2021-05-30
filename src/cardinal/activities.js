import * as React from "react";
import {
    List, Datagrid, TextField, TextInput, SimpleForm, Create, DateField, NumberInput, Filter
} from 'react-admin';
import { Tabs, Tab } from '@material-ui/core';


export const ActivityTitle = ({ record }) => {
    return <span>{record ? `"${record.title}"` : ''}</span>;
};

const ActivityFilter = (props) => (
    <Filter {...props}>
        <TextInput label="Search" source="name" alwaysOn />
    </Filter>
);


export const ActivityList = props => {
    return (
        // <List filters={<ActivityFilter />} {...props}>
        <List filters={<ActivityFilter />} {...props}>
            <Datagrid rowClick="edit">
                <TextField source="id" />
                <TextField source="name" label="Nume activitate" />
                <DateField source="date" locales="ro-RO" label="Data" />
                <TextField source="time" label="Durata" />
                {/*<TextField source="contact" label="Organizator" />*/}
            </Datagrid>
        </List>
    )
};

export const ActivityEditor = () => (

    <Tabs
        variant="fullWidth"
        centered
    >
        <Tab key={"details"} label="Detalii activitate" value={"details"} />
        <Tab key={"participants"} label="Participanţi" value={"participants"} />
    </Tabs>
);

const isCorrectFormat = (dateString) => {
    //Checking for correct date format using a regex
    const regex = /[0-9]{4}-[0-9]{2}-[0-3][0-9] [0-9]{2}:[0-9]{2}:[0-9]{2}/;
    return regex.test(dateString);
}

const createFormValidation = (values) => {
    const errors = {};
    if (!values.name) {
        errors.name = "Numele activitatii e obligatoriu!";
    }
    if (!values.description) {
        errors.description = "Descrierea este obligatorie"
    }
    if (!values.date) {
        errors.date = "Activitatea este obligatorie";
    }
    if (!isCorrectFormat(values.date)) {
        errors.date = "Formatarea datei este incorecta. Data trebuie sa fie in formatul YYYY-MM-DD HH:mm:ss";
    }
    if (!values.time) {
        errors.duration = "Durata activitatii e obligatoriu!";
    }
    if (!values.contact) {
        errors.organizer = "Organizatorul activitatii e obligatoriu!";
    }
    return errors;
}

export const ActivityCreate = props => (
    <Create {...props}>
        <SimpleForm validate={createFormValidation}>
            <TextInput source="name" label="Nume activitate" />
            <TextInput source={"description"} label={"Descrierea"}/>
            <TextInput source="date" label="Data" options={{ format: "YYYY-MM-DD HH:mm:ss)" }} />
            <NumberInput source="time" label="Durata" />
            <TextInput source="contact" label="Numar de contact" />
        </SimpleForm>
    </Create>
);