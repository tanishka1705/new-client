// import React from 'react'

// function InvoicePDF() {
//   return (
//     <div>InvoicePDF</div>
//   )
// }

// export default InvoicePDF



import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4',
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  heading: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
    textDecoration: 'underline',
  },
  table: {
    display: 'table',
    width: 'auto',
    marginBottom: 10,
  },
  tableRow: {
    flexDirection: 'row',
  },
  tableCell: {
    borderWidth: 1,
    borderColor: '#000',
    padding: 4,
    fontSize: 12,
  },
});

const InvoicePDF = ({ invoice }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.heading}>Invoice</Text>
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <Text style={[styles.tableCell, { fontWeight: 'bold' }]}>Description</Text>
              <Text style={[styles.tableCell, { fontWeight: 'bold' }]}>Period</Text>
              <Text style={[styles.tableCell, { fontWeight: 'bold' }]}>Working Days</Text>
              <Text style={[styles.tableCell, { fontWeight: 'bold' }]}>Rate</Text>
              <Text style={[styles.tableCell, { fontWeight: 'bold' }]}>Hour</Text>
              <Text style={[styles.tableCell, { fontWeight: 'bold' }]}>Conversion Rate</Text>
              <Text style={[styles.tableCell, { fontWeight: 'bold' }]}>Amount</Text>
            </View>
            {invoice.map((invoice) => (
              <View key={invoice.id} style={styles.tableRow}>
                <Text style={styles.tableCell}>{invoice.description}</Text>
                <Text style={styles.tableCell}>{invoice.period}</Text>
                <Text style={styles.tableCell}>{invoice.workingDays}</Text>
                <Text style={styles.tableCell}>{invoice.rate}</Text>
                <Text style={styles.tableCell}>{invoice.hour}</Text>
                <Text style={styles.tableCell}>{invoice.conversionRate}</Text>
                <Text style={styles.tableCell}>{invoice.amount}</Text>
              </View>
            ))}
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default InvoicePDF;

