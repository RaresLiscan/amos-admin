import React, { useState, Fragment } from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import {
    TextInput, Edit, SimpleForm, NumberInput
} from 'react-admin';
import ActivityParticipants from './ActivityParticipants';
import QRCode from 'qrcode.react';

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
                <div>{children}</div>
            )}
        </div>
    );
}

const ActivityTitle = ({ record }) => {
    console.log(record);
    return <span>{record ? `"${record.activity_name}"` : ''}</span>;
};

const ActivityEditor = props => {
    console.log(props);
    return (
        <Edit title={<ActivityTitle />} {...props}>
            <SimpleForm>
                <TextInput disabled source="id" />
                <TextInput source="activity_name" label="Numele activității"/>
                <TextInput source="date" label="Data activității" />
                <NumberInput source="duration" label="Durata" />
                <TextInput source="organizer" label="Coordonator"/>
            </SimpleForm>
        </Edit>
    )
}

export default function ActivityEdit(props) {

    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    }
    console.log(props);

    return (

        <Fragment>
            <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                <Tab label="Detalii activitate" value={0} id={"detalii"} />
                <Tab label="Participanţi" value={1} id={"participants"} />
                <Tab label="Cod QR" value={2} id={"qr"}/>
            </Tabs>

            <TabPanel value={value} index={0}>
                {ActivityEditor(props)}
            </TabPanel>
            <TabPanel value={value} index={1}>
                <ActivityParticipants id={props.match.params.id} />
            </TabPanel>
            <TabPanel value={value} index={2}>
                <QRCode style={{ margin: '3%'}} value={`https://moseadori.amosed.ro/${props.id}`} size={300} />
            </TabPanel>
        </Fragment>
    )

}