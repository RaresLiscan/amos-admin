import React from "react";
import ReactPDF, { Page, Text, View, Document, StyleSheet, Image, Font } from '@react-pdf/renderer';
import antet from '../img/antet.png';
import arial from '../arial/ArialCE.ttf';
import arialBold from '../arial/ArialCEBold.ttf';

//API LINK: https://api.amosed.ro/api/participants?month={month}&year={year}

/**
 * PROPS:
 * 1. activities: array with all the activities from the database took from:
 * https://api.amosed.ro/api/activities
 * 2. data: all the participants in the required format
 * https://api.amosed.ro/api/participants?month={month}&year={year}
 * */
export default class Report extends React.Component {

    constructor(props) {
        super(props);
        // console.log(this.props.activities)
        this.state = {
            random: false,
            data: this.props.data,
            projectData: this.props.projectData.data,
        }
        console.log(this.props);
    }

    // getActivityCoordinator = (id) => {
    //     const {activities} = this.props;
    //
    //     return activities.map(act => {
    //         if (act.id === id) {
    //             return act.organizer;
    //         }
    //     })
    //
    // }
    //
    // getActivityDate = (id) => {
    //     const {activities} = this.props;
    //
    //     return activities.map(act => {
    //         if (act.id === id) {
    //             return act.date.substring(0, 10);
    //         }
    //     })
    //
    // }

    // render() {
    //     const {data, projectData} = this.state;
    //     // console.log(data);
    //     return (
    //         <Document>
    //             {/*<Page style={styles.body}>*/}

    //
    //             {/*<Page style={{padding: '4%', flex: 1, flexWrap: 'wrap'}}>*/}
    //             {/*    <View style={styles.header}>*/}
    //             {/*        <Image style={styles.image} src={antet} fixed/>*/}
    //             {/*    </View>*/}

    //             {/*</Page>*/}
    //             )
    //
    //             {/*<View>*/}
    //             {/*  <Text style={{ textAlign: 'center', fontSize: 18 }}>Activitate 2</Text>*/}
    //             {/*</View>*/}
    //             {/*<View style={styles.table}>*/}
    //             {/*  <View style={styles.row}>*/}
    //             {/*    <View style={styles.titleCellLeft}>*/}
    //             {/*      <Text style={styles.title}>Nr. crt</Text>*/}
    //             {/*    </View>*/}
    //             {/*    <View style={styles.titleCellRight}>*/}
    //             {/*      <Text style={styles.title}>Nume si prenume participant</Text>*/}
    //             {/*    </View>*/}
    //             {/*  </View>*/}
    //             {/*  <View style={styles.row}>*/}
    //             {/*    <View style={styles.cellLeft}>*/}
    //             {/*      <Text style={styles.text}>1.</Text>*/}
    //             {/*    </View>*/}
    //             {/*    <View style={styles.cellRight}>*/}
    //             {/*      <Text style={styles.text}>Rares Liscan</Text>*/}
    //             {/*    </View>*/}
    //             {/*  </View>*/}
    //             {/*  <View style={styles.row}>*/}
    //             {/*    <View style={styles.cellLeft}>*/}
    //             {/*      <Text style={styles.text}>2.</Text>*/}
    //             {/*    </View>*/}
    //             {/*    <View style={styles.cellRight}>*/}
    //             {/*      <Text style={styles.text}>Victor Boar</Text>*/}
    //             {/*    </View>*/}
    //             {/*  </View>*/}
    //             {/*  <View style={styles.row}>*/}
    //             {/*    <View style={styles.cellLeft}>*/}
    //             {/*      <Text style={styles.text}>3.</Text>*/}
    //             {/*    </View>*/}
    //             {/*    <View style={styles.cellRight}>*/}
    //             {/*      <Text style={styles.text}>Anamaria Botezan</Text>*/}
    //             {/*    </View>*/}
    //             {/*  </View>*/}
    //             {/*</View>*/}
    //             {/*<View>*/}
    //
    //             {/*</View>*/}
    //
    //             {/*</Page>*/}
    //         </Document>
    //     )
    // }

    //TODO: refacut cu jspdf
    render() {
        const { data, projectData } = this.state;
        console.log(data);
        return (
            <Document>
                <Page>
                    <View style={styles.header}>
                        <Image style={styles.image} src={antet} fixed />
                    </View>
                    <View>
                        <Text style={{ textAlign: 'center' }}>Fisa de registru {projectData.name}</Text>
                        <Text style={[{ textAlign: 'center' }, styles.text]}>Data: {projectData.date}</Text>
                    </View>
                    <View>
                        <Text style={[styles.text, { marginLeft: '2%', marginTop: '1%' }]}>In tabelul de mai jos sunt afisati toti participantii de la proiectul {projectData.name}.</Text>
                    </View>
                    <View style={styles.table}>
                        <View style={styles.row}>
                            <View style={styles.titleCellLeft}>
                                <Text style={styles.title}>Nr. crt</Text>
                            </View>
                            <View style={styles.titleCellLeft}>
                                <Text style={styles.title}>Nume si prenume participant</Text>
                            </View>
                            <View style={styles.titleCellRight}>
                                <Text style={styles.title}>Email participant</Text>
                            </View>
                        </View>

                        {data.map((part, index) => {

                            if (index === data.length - 1) {
                                return (
                                    <View style={styles.row}>
                                        <View style={[styles.cellLeft, {borderBottomWidth: 2, paddingBottom: '2%'}]}>
                                            <Text style={styles.text}>{index + 1}</Text>
                                        </View>
                                        <View style={[styles.cellLeft, {borderBottomWidth: 2}]}>
                                            <Text
                                                style={styles.text}>{part.name.normalize("NFD").replace(/[\u0300-\u036f]/g, "")}</Text>
                                        </View>
                                        <View style={[styles.cellRight, {borderBottomWidth: 2}]}>
                                            <Text
                                                style={styles.text}>{part.email}</Text>
                                        </View>
                                    </View>
                                    
                                )
                            }

                            return (
                                <View style={styles.row}>
                                    <View style={styles.cellLeft}>
                                        <Text style={styles.text}>{index + 1}</Text>
                                    </View>
                                    <View style={styles.cellLeft}>
                                        <Text
                                            style={styles.text}>{part.name.normalize("NFD").replace(/[\u0300-\u036f]/g, "")}</Text>
                                    </View>
                                    <View style={styles.cellRight}>
                                        <Text
                                            style={styles.text}>{part.email}</Text>
                                    </View>
                                </View>
                            )
                        })
                        }
                    </View>

                    <View style={{ margin: '2%' }}>
                        <Text
                            style={[styles.title]}>Coordonator: {projectData.organizer}</Text>
                        <Text style={styles.text}>Semnatura </Text>
                        {/*<Text style={[styles.text]}>Semnatura: </Text>*/}
                    </View>
                </Page>
            </Document>
        )
    }

};

Font.register({
    family: 'Arial',
    src: arial
});

Font.register({
    family: "ArialBold",
    src: arialBold
})

const styles = StyleSheet.create({
    body: {
        paddingTop: 35,
        paddingBottom: 65,
        paddingHorizontal: 35,
    },
    image: {
        width: 550,
        // height: 30,
    },
    header: {
        display: 'flex',
        alignItems: 'center',
        padding: '1%',
        paddingBottom: '6.5%'
    },
    pageNumber: {
        position: 'absolute',
        fontSize: 12,
        bottom: 30,
        left: 0,
        right: 0,
        textAlign: 'center',
        color: 'grey',
    },

    row: {
        flex: 5,
        flexDirection: "row",
    },

    table: {
        borderStyle: 'solid',
        borderColor: 'black',
        borderWidth: 2,
        flexWrap: 'wrap',
        margin: '2%'
    },

    title: {
        fontSize: 12,
        fontFamily: "ArialBold"
        // fontFamily: "Oswald"
    },

    text: {
        fontSize: 11,
        fontFamily: "Arial"
    },

    titleCellLeft: {
        borderStyle: 'solid',
        borderColor: 'black',
        borderRightWidth: 2,
        flex: 2,
        textAlign: 'center',
        padding: '1%'
    },

    titleCellRight: {
        flex: 2,
        textAlign: 'center',
        padding: '1%'
    },

    cellLeft: {
        borderStyle: 'solid',
        borderColor: 'black',
        borderRightWidth: 2,
        borderTopWidth: 2,
        flex: 2,
        textAlign: 'center',
        padding: '1%'
    },
    cellRight: {
        flex: 2,
        borderTopWidth: 2,
        textAlign: 'center',
        padding: '1%'
    }

});

// ReactPDF.render(<Report />);
