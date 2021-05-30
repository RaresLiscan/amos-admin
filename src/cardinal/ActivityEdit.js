import React, {useState, Fragment, useEffect} from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import {
    TextInput, Edit, SimpleForm, NumberInput
} from 'react-admin';
import ActivityParticipants from './ActivityParticipants';
import QRCode from 'qrcode.react';
import ParticipantsPdf from './participantsPdf';
import ReactPDF, { PDFViewer } from '@react-pdf/renderer';
import Report from './templateRaportLunar';

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
    // console.log(record);
    return <span>{record ? `"${record.activity_name}"` : ''}</span>;
};

const ActivityEditor = props => {
    // console.log(props);
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
    const [pdfData, setPdf] = useState([]);
    const [activities, setActivities] = useState([]);
    const [loadedData, setLoaded] = useState(false);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    }

    useEffect(() => {
        if (loadedData === false) {
            data(10, 2020);
            setLoaded(true);
        }
    })

    const data = async (month, year) => {
        let jsonData = {};
        await fetch(`https://api.amosed.ro/api/participants?month=${month}&year=${year}`)
            .then(response => response.json())
            .then(json => {
                setPdf(json);
                // console.log(json);
            })
            .catch(error => console.error(error));

        await fetch("https://api.amosed.ro/api/activities")
            .then(response => response.json())
            .then(json => setActivities(json))
            .catch(error => console.log(error));
    }

    return (

        <Fragment>
            <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                <Tab label="Detalii activitate" value={0} id={"detalii"} />
                <Tab label="Participanţi" value={1} id={"participants"} />
                <Tab label="Cod QR" value={2} id={"qr"}/>
                <Tab label="Fișă de prezență" value={3} id="prezenta"/>
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
            <TabPanel value={value} index={3}>
                {/* <ParticipantsPdf /> */}
                {/* {ReactPDF.render(<Report />)} */}
                <PDFViewer style={{width: '100%', height: 900}}>
                    <Report data={pdfData} activities = {activities}/>
                </PDFViewer>
            </TabPanel>
        </Fragment>
    )

}