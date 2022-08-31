import React  from 'react';
import { LockClosedIcon } from '@heroicons/react/solid'
import { Link ,useNavigate} from 'react-router-dom';
import { Formik,Form,Field  } from 'formik';
import { validationSchema } from '../../Components/Validation/UserSchema';
import { initialValues } from '../../assets/constants';
import { addUser } from '../../Axios/Requests/User';
export default function UserSignup() {
const labelStyle = "text-sm font-medium leading-5 text-gray-900";
const navigate = useNavigate();

const registerUserForm = (values) => {
  addUser(values).then(res => {
    console.log("Response",res);
    navigate('/login');

  }
  ).catch(err => {
    console.log("ERROR",err);
  }
  )
} 

  return (
    <>

      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <img
              className="mx-auto h-12 w-auto"
              src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
              alt="Workflow"
            />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">User Sign-up</h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Or{' '}
              <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                start your 14-day free trial
              </a>
            </p>
          </div>
          {/* <form className="mt-8 space-y-6" action="#" method="POST"> */}
                <Formik
            validationSchema={validationSchema}
                initialValues={initialValues}
                onSubmit={(values) => {
                registerUserForm(values);
                }}
                >
                {({ values,
                    errors,
                    touched,}) => (
                      <Form>



            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Name
                </label>
                <Field 
                 className={`appearance-none rounded relative block ${errors.name && touched.name ? "border-red-600":""} w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                name="name"
                placeholder="Name"
               />
              </div>
              <div className="pt-5">
                <label htmlFor="password" className="sr-only">
                  Phone
                </label>
                <Field
                 
                  className={`appearance-none rounded relative block ${errors.phone && touched.phone ? "border-red-600":""} w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                  name="phone"
                  placeholder="Phone"
                />
              </div>

              <div className="pt-5">
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <Field
                   className={`appearance-none rounded relative block ${errors.email && touched.email? "border-red-600":""} w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                name="email"
                  placeholder="Email address"
                  />
              </div>
              <p></p>

              <div className="pt-5">
                <label htmlFor="email-address" className="sr-only">
                  Password
                </label>
                <Field
                  name="password"
                    className={`appearance-none rounded relative block ${errors.password && touched.password ? "border-red-600":""} w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                  placeholder="Password"
                  />
              </div>
                  
              <div className="pt-5">
                <label htmlFor="password" className="sr-only">
                  Confirm Password
                </label>
                <Field
                  name="confirmPassword"
                     className={`appearance-none rounded relative block ${errors.confirmPassword && touched.confirmPassword ? "border-red-600":""} w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                  placeholder="Confirm Password"
                />
              </div>
            </div>

            <div className='my-5'>
              <button 
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
                </span>
                Sign in
              </button>
            </div>
            <div className="flex items-center justify-between">
             
<p className={labelStyle}>Already have an account </p>
              <div className="text-sm">
                 <Link to="/login">
                <p href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                  Login?
                </p>
                 </Link>
              </div>
            </div>

                    
                      </Form>
                    )}
                  </Formik>
                    </div>
                  </div>
    </>
  )
}
