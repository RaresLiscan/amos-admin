import React, { useState, Fragment } from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import {
    List, Datagrid, TextField, ReferenceField, TextInput, ReferenceInput,
    SelectInput, Edit, SimpleForm, EditButton, Create, Filter, SimpleList,
    DateField, DateTimeInput, NumberInput
} from 'react-admin';
import { ActivityTitle } from './activities';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`${index}`}
            {...other}
        >
            {value === index && (
                // <Box p={3}>
                //     <Typography>{children}</Typography>
                // </Box>
                <div>{children}</div>
            )}
        </div>
    );
}

const ActivityEditor = props => {
    return (
        <Edit title={<ActivityTitle />} {...props}>
            <SimpleForm>
                {/* <TextInput disabled source="id" />
                        <ReferenceInput source="userId" reference="users">
                            <SelectInput optionText="name" />
                        </ReferenceInput> */}
                <TextInput disabled source="id" />
                <TextInput source="activity_name" />
                <DateTimeInput source="date" options={{ format: "YYYY-MM-DD HH:mm:ss" }} />
                <NumberInput source="duration" />
                <TextInput source="organizer" />
                {/* <TextInput multiline source="body" /> */}
            </SimpleForm>
        </Edit>
    )
}

export default function ActivityEdit(props) {

    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    }

    return (

        <Fragment>
            <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                <Tab label="Detalii activitate" value={0} id={"detalii"} />
                <Tab label="Participanţi" value={1} id={"participants"} />
            </Tabs>

            <TabPanel value={value} index={0}>
                {ActivityEditor(props)}
            </TabPanel>
            <TabPanel value={value} index={1}>
                
            </TabPanel>
        </Fragment>
    )

}