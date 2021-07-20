import React from 'react';
import { List, Datagrid, TextField, EmailField, TextInput, NumberInput, Edit,
    SimpleForm } from 'react-admin';

/*TODO: Re-create the edit activity component
* TODO 4. Generate the pdf with all the participants from this activity
* TODO: Each of these points may be another React Component in order to keep the code clean and readable
*
* */

export const ActivityTitle = ({ record }) => {
    return <span>{record ? `"${record.name}"` : 'Editeaza proiectul'}</span>;
};

const updateUser = () => {

}

export const EditActivity = (props) => (
    <Edit title={<ActivityTitle />} {...props}>
        <SimpleForm>
            <TextInput source={"id"} disabled/>
            <TextInput source={"name"}/>
            <TextInput source={"description"} />
            <TextInput source={"contact"} placeholder={"Persoana de contact"} />
            <TextInput source={"date"} placeholder={"Data proiectului"} />
            <TextInput source={"time"} placeholder={"Durata (in minute)"} />
        </SimpleForm>
    </Edit>
)