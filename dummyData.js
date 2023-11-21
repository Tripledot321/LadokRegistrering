const mongoose = require('mongoose');
const { EpokCourse, EpokModule } = require('./api/models/EpokDB');

mongoose.connect('mongodb+srv://user123:4KnNlLNdbNcnRnCR@cluster0.sdivnpi.mongodb.net/', {});

const populateDataEpok = async () => {
  // sample EpokCourse1
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

  // Add modules to the EpokCourse
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

  console.log('dummy data successful');
  mongoose.connection.close();
};
const populateData = async (db) => {
    switch (db) {
      case 'epok':
        await populateDataEpok();
        break;
      // add for ladok, its
      default:
        console.log('usage: node dummyData.js epok|ladok|its');
        process.exit(1);
    }
  };
const db = process.argv[2];

populateData(db);