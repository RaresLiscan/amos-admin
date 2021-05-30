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
    }
  }

  getActivityCoordinator = (id) => {
    const {activities} = this.props;

    return activities.map(act => {
      if (act.id === id) {
        return act.organizer;
      }
    })

  }

  getActivityDate = (id) => {
    const {activities} = this.props;

    return activities.map(act => {
      if (act.id === id) {
        return act.date.substring(0,10);
      }
    })

  }

  render() {
    const {data} = this.props;
    // console.log(data);
    return (
      <Document>
        {/*<Page style={styles.body}>*/}
        {/*  <View style={styles.header}>*/}
        {/*    <Image style={styles.image} src={antet} fixed />*/}
        {/*  </View>*/}


          {data.map(act => {
            return (
                <Page style={{ padding: '4%', flex: 1, flexWrap: 'wrap'}}>
                  <View style={styles.header}>
                    <Image style={styles.image} src={antet} fixed />
                  </View>
                  <View>
                    <Text style={{ textAlign: 'center' }}>{act[0].activity_name}</Text>
                    <Text style={[{ textAlign: 'center' }, styles.text]}>Data: {this.getActivityDate(act[0].activity_id)}</Text>
                  </View>
                  <View style={styles.table}>
                    <View style={styles.row}>
                      <View style={styles.titleCellLeft}>
                        <Text style={styles.title}>Nr. crt</Text>
                      </View>
                      <View style={styles.titleCellRight}>
                        <Text style={styles.title}>Nume si prenume participant</Text>
                      </View>
                    </View>

                    {act.map((part, index) => (
                          <View style={styles.row}>
                            <View style={styles.cellLeft}>
                              <Text style={styles.text}>{index + 1}.</Text>
                            </View>
                            <View style={styles.cellRight}>
                              <Text style={styles.text}>{part.name.normalize("NFD").replace(/[\u0300-\u036f]/g, "")}</Text>
                            </View>
                          </View>
                    ))}
                  </View>
                  <View>
                    <Text style={[styles.title]}>Coordonator: {this.getActivityCoordinator(act[0].activity_id)}</Text>
                    <Text style={[styles.text]}>Semnatura: </Text>
                  </View>
                </Page>
            )
          })}
  
          {/*<View>*/}
          {/*  <Text style={{ textAlign: 'center', fontSize: 18 }}>Activitate 2</Text>*/}
          {/*</View>*/}
          {/*<View style={styles.table}>*/}
          {/*  <View style={styles.row}>*/}
          {/*    <View style={styles.titleCellLeft}>*/}
          {/*      <Text style={styles.title}>Nr. crt</Text>*/}
          {/*    </View>*/}
          {/*    <View style={styles.titleCellRight}>*/}
          {/*      <Text style={styles.title}>Nume si prenume participant</Text>*/}
          {/*    </View>*/}
          {/*  </View>*/}
          {/*  <View style={styles.row}>*/}
          {/*    <View style={styles.cellLeft}>*/}
          {/*      <Text style={styles.text}>1.</Text>*/}
          {/*    </View>*/}
          {/*    <View style={styles.cellRight}>*/}
          {/*      <Text style={styles.text}>Rares Liscan</Text>*/}
          {/*    </View>*/}
          {/*  </View>*/}
          {/*  <View style={styles.row}>*/}
          {/*    <View style={styles.cellLeft}>*/}
          {/*      <Text style={styles.text}>2.</Text>*/}
          {/*    </View>*/}
          {/*    <View style={styles.cellRight}>*/}
          {/*      <Text style={styles.text}>Victor Boar</Text>*/}
          {/*    </View>*/}
          {/*  </View>*/}
          {/*  <View style={styles.row}>*/}
          {/*    <View style={styles.cellLeft}>*/}
          {/*      <Text style={styles.text}>3.</Text>*/}
          {/*    </View>*/}
          {/*    <View style={styles.cellRight}>*/}
          {/*      <Text style={styles.text}>Anamaria Botezan</Text>*/}
          {/*    </View>*/}
          {/*  </View>*/}
          {/*</View>*/}
          {/*<View>*/}

          {/*</View>*/}
  
        {/*</Page>*/}
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
    width: 500,
    // height: 30,
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    padding: '1%',
    paddingBottom: '2.5%'
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
    flexWrap: 'wrap'
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
    flex: 1,
    textAlign: 'center'
  },

  titleCellRight: {
    flex: 4,
    textAlign: 'center',
  },

  cellLeft: {
    borderStyle: 'solid',
    borderColor: 'black',
    borderRightWidth: 2,
    borderTopWidth: 2,
    flex: 1,
    textAlign: 'center'
  },
  cellRight: {
    flex: 4,
    borderTopWidth: 2,
    textAlign: 'center',
  }

});

  // ReactPDF.render(<Report />);
