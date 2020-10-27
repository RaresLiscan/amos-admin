import React from 'react';
import { Page, Text, View, Document, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer';
import { PDFViewer } from '@react-pdf/renderer';
import ReactPDF from '@react-pdf/renderer';

const styles = StyleSheet.create({
    page: {
        flexDirection: 'row',
        backgroundColor: '#E4E4E4'
    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1
    }
});


function TestPdf() {

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.section}>
                    <Text>Section #1</Text>
                </View>
                <View style={styles.section}>
                    <Text>Section #2</Text>
                </View>
            </Page>
        </Document>
    )

}

export default function ParticipantsPdf() {

    return (
        // <PDFViewer>
        //     <TestPdf />
        // </PDFViewer>
        <div>
            <PDFDownloadLink document={<TestPdf />} fileName="somename.pdf">
                {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download now!')}
            </PDFDownloadLink>
        </div>
        // ReactPDF.render(<ParticipantsPdf />, `${__dirname}/example.pdf`)
    )

}

// ReactPDF.render(<ParticipantsPdf />, `${__dirname}/example.pdf`);