import React from 'react';
import {PDFViewer} from "@react-pdf/renderer";
import Report from "./templateRaportLunar";

export default class MonthlyActivityReport extends React.Component {

    constructor(props) {
        super(props);
        // this.month = this.props.match.params.month;
        // this.year = this.props.match.params.year;
        console.log("PROPS: ", this.props);
        this.state = {
            activities: {},
            data: {},
            loaded: false
        }
    }

    componentWillMount() {
        this.prepData();
    }

    prepData = async() => {
        // console.log(`https://api.amosed.ro/api/participants?month=${month}&year=${year}`);
        const month = this.props.match.params.month;
        const year = this.props.match.params.year;
        await fetch(`https://api.amosed.ro/api/participants?month=${month}&year=${year}`)
            .then(response => response.json())
            .then(json => {
                this.setState({data: json});
                console.log("Collected Data: ", json);
                // console.log(json);
            })
            .catch(error => console.error(error));

        await fetch("https://api.amosed.ro/api/activities")
            .then(response => response.json())
            .then(json => this.setState({activities: json}))
            .catch(error => console.log(error));

        this.setState({loaded: true});
    }

    render() {

        if (this.state.loaded === false) {
            return (
                <div>
                    <p>Loading...</p>
                </div>
            );
        }
        return (
            <div style={{overflow: 'hidden'}}>
                <PDFViewer style={{width: '100%', height: window.innerHeight, margin: 0}}>
                    <Report data={this.state.data} activities={this.state.activities} />
                </PDFViewer>
            </div>
        )
    }
}


