import * as React from "react";
import { Card, CardContent, CardHeader } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { BlobProvider } from '@react-pdf/renderer';
import Report from './templateRaportLunar';

const months = ["", "Ianuarie", "Februarie", "Martie", "Aprilie", "Mai", "Iunie", "Iulie", "August", "Septembrie",
    "Octombrie", "Noiembrie", "Decembrie"];

export default function Dashboard() {

    //TODO: lista cu toate lunile pana azi, incepand cu septembrie 2020

    const [reportList, setReports] = React.useState([]);
    const [reportsUpdated, setReportsUpdated] = React.useState(false);

    let genMonths = () => {
        const date = new Date();
        const currentYear = date.getFullYear();
        const currentMonth = date.getMonth();

        let reports = [];
        
        for (let year = currentYear, month = currentMonth; year >= 2020 && (month >= 8 || year > 2020); month --) {

            if (month + 1 === 0) {
                month = 11;
            }

            reports.push({
                month: month + 1,
                year: year,
            });

        }
        console.log(reports);
        setReports(reports);
    }

    React.useEffect(() => {
        if (reportsUpdated === false) {
            setReportsUpdated(true);
            genMonths();
        }
    });

    const reportChosen = (report) => {
        console.log(report);
    }

    //TODO: instalat react-router-dom si creat un path special pentru pdf
    //acolo se va furniza prin link luna si anul si se va genera pdf-ul
    //va trebui researchuit cum se randeaza direct PDF-ul, fara sa mai apesi pe alte butoane

    const reportListItem = (report) => {
        return (
            <ListItem button onClick={() => reportChosen(report)}>
                {/* <BlobProvider document={Report}>
                    {({blob, url}) => (
                        <a href={"#"} target="_blank">{months[report.month]} {report.year}</a>
                    )}
                </BlobProvider> */}
            </ListItem>
        )
    }

    const renderReports = () => {
        return reportList.map(report => (
            <List component="div">
                {reportListItem(report)}
            </List>
        ))
    }

    return (
        <div>
            <Card>
                <CardHeader title="Welcome to the administration" />
                <CardContent>Lorem ipsum sic dolor amet...</CardContent>
            </Card>

            {/*<Card>*/}
            {/*    <CardHeader title="Rapoartele activitatii in fiecare luna"/>*/}
            {/*    <CardContent>*/}
            {/*        {renderReports()}*/}
            {/*    </CardContent>*/}
            {/*</Card>*/}

        </div>
    )
};