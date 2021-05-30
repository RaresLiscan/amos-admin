import * as React from "react";
import {
    List, Datagrid, TextField, TextInput, Edit, SimpleForm, Create, DateTimeInput, NumberInput
} from 'react-admin';


const ActivityTitle = ({ record }) => {
    return <span>Post {record ? `"${record.title}"` : ''}</span>;
};


export const CardinalList = props => {
    console.log("Cardinal list props: ", props);
    return (
        // <List filters={<CardinalFilter />} {...props}>
        <List {...props}>
            <Datagrid>
                <TextField source="id" />
                <TextField source="name" label="Nume participant" />
                <TextField source="activity_name" />
                <TextField source="member" label="Moseador" />
                <TextField source="phone_number" label="Număr de telefon" />
                <TextField source="email" label="Email" />
                <TextField source="registration_date" label="Data înregistrării" />
            </Datagrid>
        </List>
    )
};

export const ActivityEdit = props => (
    <Edit title={<ActivityTitle />} {...props}>
        <SimpleForm>
            <TextInput disabled source="id" />
            <TextInput source="activity_name" />
            <DateTimeInput source="date" options={{ format: "YYYY-MM-DD HH:mm:ss" }} />
            <NumberInput source="duration" />
            <TextInput source="organizer" />
        </SimpleForm>
    </Edit>
);

const isCorrectFormat = (dateString) => {
    const regex = /[0-9]{4}-[0-9]{2}-[0-3][0-9] [0-9]{2}:[0-9]{2}:[0-9]{2}/;
    console.log(regex.test(dateString));
    return regex.test(dateString);
}

const createFormValidation = (values) => {
    const errors = {};
    if (!values.activity_name) {
        errors.activity_name = "Numele activitatii e obligatoriu!";
    }
    if (!values.date) {
        errors.date = "Activitatea este obligatorie";
    }
    if (!isCorrectFormat(values.date)) {
        errors.date = "Formatarea datei este incorecta. Data trebuie sa fie in formatul YYYY-MM-DD HH:mm:ss";
    }
    if (!values.duration) {
        errors.duration = "Durata activitatii e obligatoriu!";
    }
    if (!values.organizer) {
        errors.organizer = "Organizatorul activitatii e obligatoriu!";
    }
    return errors;
}

export const ActivityCreate = props => (
    <Create {...props}>
        <SimpleForm validate={createFormValidation}>
            <TextInput source="activity_name" label="Nume activitate" />
            <TextInput source="date" label="Data" options={{ format: "YYYY-MM-DD HH:mm:ss)" }} />
            <NumberInput source="duration" label="Durata" />
            <TextInput source="organizer" label="Organizator" />
        </SimpleForm>
    </Create>
);