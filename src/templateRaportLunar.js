import React from "react";
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

const Quixote = () => (
    <Document>
      <Page style={styles.body}>
        <View style={styles.header} fixed>
          <Image
            style={styles.image}
            src="/images/quijote1.jpg"
          />
        </View>
        
        <View>
            <Text style={{textAlign: 'center', fontSize: 18}}>Activitate 1</Text>
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
            <Text style={[styles.title, {marginBottom: '5%'}]}>Coordonator: Andrei Tritean</Text>
        </View>
        
        <View>
            <Text style={{textAlign: 'center', fontSize: 18}}>Activitate 2</Text>
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
            <Text style={[styles.title, {marginBottom: '5%'}]}>Coordonator: Andrei Tritean</Text>
        </View>
    
      </Page>
    </Document>
  );
  
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
      width: 200,
    },
    header: {
      display: 'flex',
      alignItems: 'center',
      margin: '3%'
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
  
  ReactPDF.render(<Quixote />);
  