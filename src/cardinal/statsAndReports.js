import React, {useEffect, useState} from 'react';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

const months = ["", "Ianuarie", "Februarie", "Martie", "Aprilie", "Mai", "Iunie", "Iulie", "August", "Septembrie",
    "Octombrie", "Noiembrie", "Decembrie"];

export default function StatsAndReports() {

    const [reports, setReports] = useState([]);
    const [loaded, setLoaded] = useState(false);

    const genMonths = () => {
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

    useEffect(() => {
        if (loaded === false) {
            genMonths();
            setLoaded(true);
        }
    })

    const reportChosen = () => {
        // const history = useHistory();
    }

    return (
        <Card>
            <CardContent>
                <h2 style={{marginLeft: '1%'}}>Rapoarte lunare</h2>
                <List>
                    {reports.map(item => (
                        <a target={"_blank"} href={`/pdf/${item.month}/${item.year}`} style={{textDecoration: 'none', color: 'black'}}>
                            <ListItem button={true} onClick={() => reportChosen()}>
                                <p>{months[item.month]} {item.year}</p>
                            </ListItem>
                        </a>
                    ))}
                </List>
            </CardContent>
        </Card>
    )

}
