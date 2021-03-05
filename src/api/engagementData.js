import moment from "moment";
const createData = (
  date,
  assessments_assigned,
  students_taking_assessments
) => ({
  date,
  assessments_assigned,
  students_taking_assessments
});
const createAll = () => {
  let i = 0;
  let initDate = moment("Jan 2020");
  let data = [];
  for (let i = 0; i < 10; ++i) {
    data.push(
      createData(
        initDate.add(1, "months").format("MMM'YY"),
        Math.floor(Math.random() * 180 + 20),
        Math.floor(Math.random() * 130 + 15)
      )
    );
  }
  return data;
};
const data = createAll();

export default data;
