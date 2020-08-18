import * as Yup from "yup";

export const todoSchema = Yup.object().shape({
  task: Yup.string().required("You have to add a task!"),
  priority: Yup.number().required("Knowing what important is important!"),
});
