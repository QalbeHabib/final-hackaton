import * as Yup from "yup";


export const checkoutSchema = Yup.object({
    email: Yup.string().email("Invalid").required("Required"),
    nameOnCard: Yup.string().required("Required"),
    number: Yup.number().required("Required"),
    expireDate: Yup.number().required("Required"),
    cvv: Yup.number().required("Required"),
    address: Yup.string().required("Required"),
    city: Yup.string().required("Required"),
    state: Yup.string().required("Required"),
    zip: Yup.string().required("Required"),

  // img: Yup.string().required("Required"),
});
