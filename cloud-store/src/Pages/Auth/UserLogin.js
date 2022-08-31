import React from 'react';
import { LockClosedIcon } from '@heroicons/react/solid'
import { Link } from 'react-router-dom';
import { Formik,Form ,Field} from 'formik';
import { validationLoginSchema } from '../../Components/Validation/UserSchema';
import { userLoginValues } from '../../assets/constants';
import { getUser } from '../../Axios/Requests/User';
import {useSelector,useDispatch} from 'react-redux';
import {useNavigate } from 'react-router-dom';
export default function UserLogin() {
  const userObj = useSelector(state => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
const loginUser = (values) => {
  
  getUser(values).then(res => {
    dispatch({type: 'SET_CURRENT_USER',payload: {login_state: true,user: res.data,role: res.data.role == "user" ? false : true}});
      if(res.data.role === 'admin'){
      navigate('/admin')
    }
    else{
      navigate('/loader')
    }

}
  ).catch(err => {
    alert(err.response.data);

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
                validationSchema={validationLoginSchema}
                initialValues={userLoginValues}
                onSubmit={(values) => {
                  loginUser(values);
                }}
                >
                {({ values,
                    touched,
                    errors,
                    dirty,
                    isSubmitting,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    handleReset }) => (
                      <Form>



            <div className="rounded-md shadow-sm -space-y-px">
            

            <div className="pt-5">
                <label htmlFor="password" className="sr-only">
                  Email
                </label>
                <Field
                 
                  className={`appearance-none rounded relative block ${errors.email && touched.email ? "border-red-600":""} w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                  name="email"
                  placeholder="Email"
                />
              </div>

              <div className="pt-5">
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <Field
                 
                  className={`appearance-none rounded relative block ${errors.password && touched.password ? "border-red-600":""} w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                  name="password"
                  placeholder="Password"
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
             
<p className="text-sm font-medium leading-5 text-gray-900">Dosn't have an account </p>
              <div className="text-sm">
                 <Link to="/UserSignup">
                <p href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                  Create an Account?
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
