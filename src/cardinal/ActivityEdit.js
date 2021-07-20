import React, {useState, Fragment, useEffect} from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import {
    TextInput, Edit, SimpleForm, NumberInput, useGetOne, useGetList
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
    return <span>{record ? `"${record.name}"` : ''}</span>;
};

const ActivityEditor = props => {
    return (
        <Edit title={<ActivityTitle />} {...props}>
            <SimpleForm>
                <TextInput source={"id"} disabled/>
                <TextInput source={"name"}/>
                <TextInput source={"description"} />
                <TextInput source={"contact"} placeholder={"Persoana de contact"} />
                <TextInput source={"date"} placeholder={"Data proiectului"} />
                <TextInput source={"organizer"} placeholder={"Coordonatorul proiectului"} />
                <NumberInput source={"time"} placeholder={"Durata (in minute)"} />
            </SimpleForm>
        </Edit>
    )
}

export default function ActivityEdit(props) {

    const [value, setValue] = useState(0);
    const [pdfData, setPdf] = useState([]);
    const [activities, setActivities] = useState([]);
    const [loadedData, setLoaded] = useState(false);
    const projectData = useGetOne("projects", props.match.params.id);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    }

    useEffect(() => {
        console.log(props);
        if (loadedData === false) {
            // data(10, 2020);
            getPdfData(props.match.params.id);
            setLoaded(true);
        }
    }, []);

    const getPdfData = async (id) => {
        await fetch(`http://localhost:8081/participants/${id}`)
            .then(response => response.json())
            .then((json) => {
                console.log(json);
                setPdf(json);
            })
            .catch(error => {
                console.error(error);
            })
    }

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
                    <Report data={pdfData} projectData={projectData} />
                </PDFViewer>
            </TabPanel>
        </Fragment>
    )

}