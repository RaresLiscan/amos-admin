import React from "react";
import ReactPDF, { Page, Text, View, Document, StyleSheet, Image, Font } from '@react-pdf/renderer';
import antet from './img/antet.png';

//TODO: luat toate activitatile pe o anumita luna din server
//TODO: creat continut dinamic in functie de acele activitati

//API LINK: https://api.amosed.ro/api/activities?month={month}&year={year}

const data = (month, year) => {
  return fetch(`https://api.amosed.ro/api/activities?month=${month}&year=${year}`)
    .then(response => response.json())
    .then(json => {
      return json;
    })
    .catch(error => console.error(error));
}

export default class Report extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [],
    }
  }

  // getData = async(month, year) => {
  //   await fetch(`https://api.amosed.ro/api/activities?month=${month}&year=${year}`)
  //     .then(response => response.json())
  //     .then(json => {
  //       this.setState({data: json});
  //       console.log(json);
  //     })
  //     .catch(error => console.error(error));
  // }

  // componentDidMount() {
  //   this.getData(10, 2020);
  // }

  render() {
    return (
      <Document>
        <Page style={styles.body}>
          <View style={styles.header}>
            <Image style={styles.image} src={antet} fixed />
          </View>
          {/* <View style={styles.header} fixed> */}
          {/* <Image
              style={styles.image}
              src="D:\Projects\amos-admin\src\img\antet.png"
              fixed
            /> */}
          {/* <Text>Test header daca apare</Text> */}
          {/* </View> */}
  
          <View>
            <Text style={{ textAlign: 'center', fontSize: 18 }}>Activitate 1</Text>
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
            <View style={styles.row}>
              <View style={styles.cellLeft}>
                <Text style={styles.text}>1.</Text>
              </View>
              <View style={styles.cellRight}>
                <Text style={styles.text}>Rares Liscan</Text>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.cellLeft}>
                <Text style={styles.text}>2.</Text>
              </View>
              <View style={styles.cellRight}>
                <Text style={styles.text}>Victor Boar</Text>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.cellLeft}>
                <Text style={styles.text}>3.</Text>
              </View>
              <View style={styles.cellRight}>
                <Text style={styles.text}>Anamaria Botezan</Text>
              </View>
            </View>
          </View>
          <View>
            <Text style={[styles.title, { marginBottom: '5%' }]}>Coordonator: Andrei Tritean</Text>
          </View>
  
          <View>
            <Text style={{ textAlign: 'center', fontSize: 18 }}>Activitate 2</Text>
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
            <View style={styles.row}>
              <View style={styles.cellLeft}>
                <Text style={styles.text}>1.</Text>
              </View>
              <View style={styles.cellRight}>
                <Text style={styles.text}>Rares Liscan</Text>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.cellLeft}>
                <Text style={styles.text}>2.</Text>
              </View>
              <View style={styles.cellRight}>
                <Text style={styles.text}>Victor Boar</Text>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.cellLeft}>
                <Text style={styles.text}>3.</Text>
              </View>
              <View style={styles.cellRight}>
                <Text style={styles.text}>Anamaria Botezan</Text>
              </View>
            </View>
          </View>
          <View>
            <Text style={[styles.title, { marginBottom: '5%' }]}>Coordonator: Andrei Tritean</Text>
          </View>
  
        </Page>
      </Document>
    )
  }
  
};

Font.register({
  family: 'Oswald',
  src: 'https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf'
});

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
    margin: '1%',
    marginBottom: '2.5%'
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
  },

  title: {
    fontSize: 15,
    // fontFamily: "Oswald"
  },

  text: {
    fontSize: 11,
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
