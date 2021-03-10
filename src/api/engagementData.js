import moment from "moment";
const createData = (
  date,
  assessments_assigned,
  students_taking_assessments,
  timestamp=0
) => ({
  date,
  assessments_assigned,
  students_taking_assessments,
  timestamp,
});
const createAll = () => {
  let i = 0;
  let initDate = moment("Jan 2021");
  let data = [];
  for (let i = 0; i < 20; ++i) {
    const thisDate = moment(initDate).add(-i, 'months');
    data.push(
      createData(
        thisDate.format("MMM'YY"),
        Math.floor(Math.random() * 180 + 20),
        Math.floor(Math.random() * 130 + 15),
        thisDate.toDate().getTime(),
      )
    );
  }
  return data;
};
const data = createAll();

export default data;
