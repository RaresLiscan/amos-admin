import React from 'react';
import ParticipantComponent from './ParticipantComponent';
import dataProviderNode from "../data/dataProviderNode";


export default class ActivityParticipants extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            participants: [],
            loaded: false,
        }
    }

    reloadComponent = () => {
        this.loadData();
    }

    loadData = async () => {
        // await fetch(`https://api.amosed.ro/api/participants/${this.props.id}`, {
        //     method: "GET",
        //     cors: "cors",
        //     headers: {
        //         "Content-Type": "application/json"
        //     }
        // })
        //     .then(response => response.json())
        //     .then(json => {
        //         this.setState({ participants: json, loaded: true });
        //     })
        //     .catch(error => console.log(error));
        await fetch(`${dataProviderNode.API_URL}/participants/${this.props.id}`, {
            method: "GET",
            cors: "cors",
            headers: {
                "Content-Type": "application/json",
            }
        })
            .then(response => response.json())
            .then(json => {
                this.setState({participants: json, loaded: true});
            })
            .catch(error => {
                console.error(error);
            })
    }

    async componentDidMount() {
        this.loadData();
    }

    render() {
        if (this.state.loaded === false) return <div></div> 
        return (
            <ParticipantComponent participants={this.state.participants} reload={this.reloadComponent} />
        )
    }
}