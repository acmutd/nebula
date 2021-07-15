import React from 'react';
import { Course, SemesterCode, GPA_MAPPINGS, StudentPlan } from '../../../modules/common/data';
import { createSamplePlan } from '../../../modules/common/data';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import ReactPDF from '@react-pdf/renderer';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import GetAppIcon from '@material-ui/icons/GetApp';

const exampleStudent = createSamplePlan();

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  h1: {
    fontSize: 40,
    marginLeft: -20,
  },
  h2: {
    fontSize: 30,
  },
  tablet: {
    width: '24%',
    display: 'inline-block',
  },
  clickable: {
    cursor: 'pointer',
    margin: 10,
  },
});

function renderPDF() {
  ReactPDF.renderToStream(MyDocument());
}

function downloadPDF() {
  ReactPDF.render(<MyDocument />, `${__dirname}/example.pdf`);
}

function showTitle() {
  return <Text style={styles.h2}>{exampleStudent.title}</Text>;
}

function showMajor() {
  return <Text style={styles.h1}>{exampleStudent.major}</Text>;
}

function showSemesters(degree) {
  const semesters = [];
  for (let i = 0; i < degree.length; i++) {
    semesters.push(degree[i].title);
    semesters.push(<br></br>);
    semesters.push(showHeader());
    semesters.push(<br></br>);
    semesters.push(showCourses(degree[i].courses));
    semesters.push(<br></br>);
  }
  return <>{semesters}</>;
}

function showCourses(semester) {
  const courses = [];
  for (let i = 0; i < semester.length; i++) {
    courses.push(<Text style={styles.tablet}>{semester[i].catalogCode}</Text>);
    courses.push(<Text style={styles.tablet}>{semester[i].title}</Text>);
    courses.push(<Text style={styles.tablet}>{semester[i].date}</Text>);
    courses.push(<Text style={styles.tablet}>{semester[i].grade}</Text>);
    courses.push(<br></br>);
  }
  return courses;
}

function showHeader() {
  const header = [];
  header.push(<Text style={styles.tablet}>Course Code</Text>);
  header.push(<Text style={styles.tablet}>Course Title</Text>);
  header.push(<Text style={styles.tablet}>Semester Taken</Text>);
  header.push(<Text style={styles.tablet}>Course Grade</Text>);
  return header;
}

// Create Document Component
export default function MyDocument() {
  return (
    <>
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.section}>
            {showMajor()}
            <br></br>
            {showTitle()}
            <br></br>
            {showSemesters(exampleStudent.semesters)}
          </View>
        </Page>
      </Document>
      <OpenInNewIcon style={styles.clickable} onClick={() => renderPDF()}></OpenInNewIcon>
      <GetAppIcon style={styles.clickable} onClick={() => downloadPDF()}></GetAppIcon>
    </>
  );
}
