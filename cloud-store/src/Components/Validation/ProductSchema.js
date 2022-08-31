import * as Yup from "yup";


export const validationSchema = Yup.object({
  name: Yup.string()
    .required("Required")
    .min(3, "Must be at least 3 characters")
    .max(100, "Sorry, Your Product must be between 3 and 100 characters long."),

  price: Yup.number().required("Required"),
  qty: Yup.string().required("Required"),
  category: Yup.string().required("Required"),
  description: Yup.string().required("Required"),
  // img: Yup.string().required("Required"),
});
