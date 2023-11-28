const mongoose = require('mongoose');
const { EpokCourse, EpokModule } = require('./api/models/EpokDB');
const { CanvasStudent, CanvasCourse, Assignment, CanvasStudentResult } = require('./api/models/CanvasDB');

mongoose.connect('mongodb+srv://test123:FVJq7wW4AKEcw7Bc@cluster0.sdivnpi.mongodb.net/', {});

const populateDataCanvas = async () => {
  // clear existing
  await Promise.all([
      CanvasStudent.deleteMany({}),
      CanvasCourse.deleteMany({}),
      Assignment.deleteMany({}),
      CanvasStudentResult.deleteMany({}),
  ]);

  const canvasStudents = [
      { studentId: 'vikese-0', name: 'Viktor' },
      { studentId: 'gushol-2', name: 'Gustav' },
  ];

  const canvasCourses = [
      {
          courseId: 'D0031N',
          courseName: 'EA&SOA',
          assignments: [],
      },
  ];

  const assignments = [
      { assignmentId: 'D0031N-1', assignment: 'Examinationsuppgift 1', courseId: 'D0031N' },
      { assignmentId: 'D0031N-2', assignment: 'Examinationsuppgift 2', courseId: 'D0031N' },
  ];

  const canvasStudentResults = [
      {
          studentId: 'vikese-0',
          courseId: 'D0031N',
          grades: [
              { assignmentId: 'D0031N-1', grade: 'G' },
              { assignmentId: 'D0031N-2', grade: 'G' },
          ],
      },
      {
          studentId: 'gushol-2',
          courseId: 'D0031N',
          grades: [
              { assignmentId: 'D0031N-1', grade: 'G' },
              { assignmentId: 'D0031N-2', grade: 'U' },
          ],
      },
  ];

  // insert assignments and get their objects
  const assignmentObjects = await Assignment.insertMany(assignments);

  // update course with assignment objects
  canvasCourses[0].assignments = assignmentObjects.map(assignment => assignment.assignmentId);

  // save to db
  await Promise.all([
      CanvasStudent.insertMany(canvasStudents),
      CanvasCourse.insertMany(canvasCourses),
      CanvasStudentResult.insertMany(canvasStudentResults),
  ]);

  console.log('dummy data CANVAS successful');
  mongoose.connection.close();
};

const populateDataEpok = async () => {
  // add course
  const epokCourse1 = new EpokCourse({
    _id: 'D0031N',
    courseName: 'EA&SOA',
    moduleIds: [],
  });

  const module1 = new EpokModule({
    _id: '0005',
    moduleName: 'Assignments',
  });

  const module2 = new EpokModule({
    _id: '0006',
    moduleName: 'Projects',
  });

  // add modules to course
  epokCourse1.moduleIds.push(module1, module2);

  const epokCourse2 = new EpokCourse({
    _id: 'D0025E',
    courseName: 'Data Mining',
    moduleIds: [],
  });

  const module3 = new EpokModule({
    _id: '0001',
    moduleName: 'Assignments',
  });

  const module4 = new EpokModule({
    _id: '0002',
    moduleName: 'Exams',
  });

  epokCourse2.moduleIds.push(module3, module4);

  // save to db
  await epokCourse1.save();
  await epokCourse2.save();
  await module1.save();
  await module2.save();
  await module3.save();
  await module4.save();

  console.log('dummy data EPOK successful');
  mongoose.connection.close();
};
const populateData = async (db) => {
    switch (db) {
      case 'epok':
        await populateDataEpok();
        break;
      // add cases for ladok, its
      case 'canvas':
        await populateDataCanvas();
        break;
      default:
        console.log('usage: node dummyData.js epok|ladok|its|canvas');
        process.exit(1);
    }
  };
const db = process.argv[2];

populateData(db);