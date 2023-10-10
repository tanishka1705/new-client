

import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { HStack, Heading,Box } from '@chakra-ui/react';

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
    fontSize: 20,
    marginBottom: 10,
    marginTop: 40,
    textAlign: 'center',
    textDecoration: 'underline',
  },
  table: {
    display: 'table',
    width: '100%',
    marginTop: 50,
    marginBottom: 10,
  },
  tableRow: {
    flexDirection: 'row',
  },
  tableCell: {
    border:'1 solid #b0b0b0' ,
    padding: 10,
    fontSize: 10,
    textAlign:'center',
    width:'100%',
  },
  txt : {
    fontSize: 13,
    marginTop: 10,
  },
  txt1 : {
    fontSize: 13,
    marginTop: 50,
  }
});

function formatDate(date){
  return date.toLocaleDateString('en-GB');
}

const InvoicePDF = ({ invoice, invoiceNumber, invoiceDate, dueDate, isHourly }) => {

  const formattedInvoiceDate =  formatDate(invoiceDate);
  const formattedDueDate = formatDate(dueDate);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.heading}>Invoice</Text>

        
          <Text style={styles.txt1}>Invoice Number : {invoiceNumber}</Text>
          <Text style={styles.txt}>Invoice Date : {formattedInvoiceDate}</Text>
          <Text style={styles.txt}>Due Date: {formattedDueDate}</Text>

         
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <Text style={[styles.tableCell, { fontWeight: 'bold' }]}>Description</Text>
              <Text style={[styles.tableCell, { fontWeight: 'bold' }]}>Period</Text>
              {!isHourly && <Text style={[styles.tableCell, { fontWeight: 'bold' }]}>Working Days</Text>}
              <Text style={[styles.tableCell, { fontWeight: 'bold' }]}>Rate</Text>
              <Text style={[styles.tableCell, { fontWeight: 'bold' }]}>Hour</Text>
              <Text style={[styles.tableCell, { fontWeight: 'bold' }]}>Conversion Rate</Text>
              <Text style={[styles.tableCell, { fontWeight: 'bold' }]}>Amount</Text>
            </View>
            {invoice.map((invoice) => (
              <View key={invoice.id} style={styles.tableRow}>
                <Text style={styles.tableCell}>{invoice.description}</Text>
                <Text style={styles.tableCell}>{invoice.period}</Text>
               {!isHourly && <Text style={styles.tableCell}>{invoice.workingDays}</Text>}
                <Text style={styles.tableCell}>{invoice.rate.rate}</Text>
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

