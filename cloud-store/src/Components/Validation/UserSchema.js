import * as Yup from "yup";

export const validationSchema = Yup.object({
  name: Yup.string()
    .required("Required")
    .min(3, "Must be at least 3 characters")
    .max(30, "Sorry, Your username must be between 5 and 30 characters long."),

  phone: Yup.string().required("Required"),
  email: Yup.string().email("Invalid").required("Required"),
  password: Yup.string().required("Password is required"),

  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

export const validationLoginSchema = Yup.object({
  email: Yup.string().email("Invalid").required("Required"),
  password: Yup.string().required("Password is required"),
});
