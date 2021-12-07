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
  "SELECT Student.FirstName, Student.LastName, " +
  "COUNT(Student.StudentId) as count" +
  "From Student INNER JOIN Exams" +
  "ON Student.StudentId = Exams.StudentId" +
  "WHERE Exams.Result < 3" +
  "GROUP BY Student.StudentId HAVING count > 2",
  (err, result) => {
    console.log(err);
    console.log(result);
  }
)

connection.query(
  "SELECT Student.Group, " +
  "COUNT(Student.StudentId) as count" +
  "FROM Student JOIN Exam ON Student.StudentId = Exams.StudentId" +
  "WHERE Exams.Result <3" +
  "GROUP BY Student.Group HAVING COUNT(Student.StudentId) > 10",
  (err, result) => {
    console.log(err);
    console.log(result);
  }
)

connection.end()

app.listen(PORT, () => {
  console.log(`App listening on port:${ PORT }`);
})
