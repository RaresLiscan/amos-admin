import * as React from "react";
import {
    List, Datagrid, TextField, ReferenceField, TextInput, ReferenceInput,
    SelectInput, Edit, SimpleForm, EditButton, Create, Filter, SimpleList,
    DateField, DateTimeInput, NumberInput
} from 'react-admin';
import { useMediaQuery } from '@material-ui/core';


const ActivityTitle = ({ record }) => {
    return <span>Post {record ? `"${record.title}"` : ''}</span>;
};

const CardinalFilter = (props) => (
    <Filter {...props}>
        <TextInput label="Caută participantul..." source="name" alwaysOn />
        <TextInput label="Caută activitatea..." source="activity_name" allowEmpty />
        {/* <ReferenceInput label="Activităţi" source="activity_name" reference="activities" allowEmpty>
            <SelectInput optionText="name" />
        </ReferenceInput> */}
    </Filter>
);

export const CardinalList = props => {
    console.log("Cardinal list props: ", props);
    const isSmall = useMediaQuery(theme => theme.breakpoints.down('sm'));
    return (
        // <List filters={<CardinalFilter />} {...props}>
        <List {...props}>

            {/* {isSmall ? (
                <SimpleList
                    primaryText={record => record.activity_name}
                    secondaryText={record => `${record.views} views`}
                    tertiaryText={record => new Date(record.published_at).toLocaleDateString()}
                />
            ) : ( */}
                    <Datagrid>
                        <TextField source="id" />
                        <TextField source="name" label="Nume participant"/>
                        {/* <ReferenceField label="Nume activitate" source="id" reference="activities"> */}
                        <TextField source="activity_name" />
                        {/* </ReferenceField> */}
                        {/* <DateField source="date" showTime locales="ro-RO" label="Data" /> */}
                        <TextField source="member" label="Moseador" />
                        <TextField source="phone_number" label="Număr de telefon" />
                        <TextField source="email" label="Email" />
                        <TextField source="registration_date" label="Data înregistrării" />
                        {/* <EditButton /> */}
                    </Datagrid>
                {/* )} */}
        </List>
    )};

export const ActivityEdit = props => (
    <Edit title={<ActivityTitle />} {...props}>
        <SimpleForm>
            {/* <TextInput disabled source="id" />
            <ReferenceInput source="userId" reference="users">
                <SelectInput optionText="name" />
            </ReferenceInput> */}
            <TextInput disabled source="id" />
            <TextInput source="activity_name" />
            <DateTimeInput source="date" options={{ format: "YYYY-MM-DD HH:mm:ss"}} />
            <NumberInput source="duration" />
            <TextInput source="organizer" />
            {/* <TextInput multiline source="body" /> */}
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
            {/* <ReferenceInput source="userId" reference="users">
                <SelectInput optionText="name" />
            </ReferenceInput> */}
            <TextInput source="activity_name" label="Nume activitate" />
            <TextInput source="date" label="Data" options={{ format: "YYYY-MM-DD HH:mm:ss)" }} />
            <NumberInput source="duration" label="Durata" />
            <TextInput source="organizer" label="Organizator" />
            {/* <TextInput multiline source="body" /> */}
        </SimpleForm>
    </Create>
);