import React  from 'react';
import { LockClosedIcon } from '@heroicons/react/solid'
import { Link ,useNavigate} from 'react-router-dom';
import { Formik,Form } from 'formik';
import { validationSchema } from '../../Components/Validation/UserSchema';
import { adminValues } from '../../assets/constants';
import { addUser } from '../../Axios/Requests/User';
export default function AdminSignup() {
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
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Admin Sign-up</h2>
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
                initialValues={adminValues}
                onSubmit={(values) => {
                registerUserForm(values);
                }}
                >
                {({ values,

                    handleChange,
                    handleBlur,}) => (
                      <Form>



            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  // autoComplete="email"
                  required
                  className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Name"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  />
              </div>
              <div className="pt-5">
                <label htmlFor="password" className="sr-only">
                  Phone
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="number"
                  autoComplete="current-password"
                  required
                  className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Phone"
                  value={values.phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </div>

              <div className="pt-5">
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  />
              </div>
              <p></p>

              <div className="pt-5">
                <label htmlFor="email-address" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  />
              </div>
                  
              <div className="pt-5">
                <label htmlFor="password" className="sr-only">
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Confirm Password"
                  value={values.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </div>
            </div>

            <div>
              <button 
                // onClick={() => submit()}
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