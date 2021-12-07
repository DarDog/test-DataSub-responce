const app = require('express');
const mysql = require('mysql');

const { PORT = 3000 } = process.env

const connection = mysql.createConnection({
  host: HOST_NAME,
  user: DB_USER_NAME,
  database: DB_NAME,
  password: DB_PASSWORD
})

connection.connect();

connection.query(
  "SELECT Students.FirstName, Students.LastName, " +
  "COUNT(Students.StudentId) as count" +
  "From Students INNER JOIN Exams" +
  "ON Students.StudentId = Exams.StudentId" +
  "WHERE Exams.Result < 3" +
  "GROUP BY Students.StudentId HAVING count > 2",
  (err, result) => {
    console.log(err);
    console.log(result);
  }
)

connection.query(
  "SELECT Students.Group, " +
  "COUNT(Students.StudentId) as count" +
  "FROM Students JOIN Exam ON Students.StudentId = Exams.StudentId" +
  "WHERE Exams.Result < 3" +
  "GROUP BY Students.Group HAVING COUNT(Student.StudentId) > 10",
  (err, result) => {
    console.log(err);
    console.log(result);
  }
)

connection.end()

app.listen(PORT, () => {
  console.log(`App listening on port:${ PORT }`);
})
