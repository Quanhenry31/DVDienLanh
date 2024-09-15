import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

function Login() {
    return (
        <>
            {/* Container */}
            <div className="container mx-auto ">
                <div className="flex justify-center px-6 my-12">
                    {/* Row */}
                    <div className="w-full xl:w-3/4 lg:w-11/12 flex">
                        {/* Col */}
                        <Link
                            to="/"
                            className="w-full h-[550px] bg-gray-400 hidden lg:block lg:w-1/2 bg-cover rounded-l-lg"
                            style={{
                                backgroundImage:
                                    'url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXx2xFk_wEb1hLQoDo4Ar3YbhosCPyOCfOgA&s")',
                            }}
                        />
                        {/* Col */}
                        <div className="w-full lg:w-1/2 bg-white p-5 rounded-lg lg:rounded-l-none">
                            <h3 className="pt-4  text-center text-[40px]">Welcome Back!</h3>
                            <form className="px-8 pt-6 pb-8 mb-4 bg-white rounded">
                                <div className="mb-4">
                                    <label
                                        className=" text-[12px] block  mb-2 text-sm font-bold text-gray-700"
                                        htmlFor="username"
                                    >
                                        Username
                                    </label>
                                    <input
                                        className="text-[16px] w-full h-[50px] px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                        id="username"
                                        type="text"
                                        placeholder="Username"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label
                                        className="  text-[12px] block mb-2 text-sm font-bold text-gray-700"
                                        htmlFor="password"
                                    >
                                        Password
                                    </label>
                                    <input
                                        className=" text-[16px] w-full h-[50px] px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border border-red-500 rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                        id="password"
                                        type="password"
                                        placeholder="******************"
                                    />
                                    <p className="text-xs italic text-red-500">Please choose a password.</p>
                                </div>
                                <div className="mb-4 flex !w-[100px]">
                                    <input className="mr-2 leading-tight " type="checkbox" id="checkbox_id" />
                                    <label className="text-sm size-2 flex  !w-[100px]" htmlFor="checkbox_id">
                                        <span className=" !w-[100px] !text-[10px]">Remember Me</span>
                                    </label>
                                </div>
                                <div className="mb-6 text-center">
                                    <button
                                        className="w-full h-[50px] px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                                        type="button"
                                    >
                                        Sign In
                                    </button>
                                </div>

                                <hr className="mb-6 border-t" />
                                <div className="flex">
                                    <div className="text-center mr-[45%]">
                                        <a
                                            className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800 text-[14px]"
                                            href="#"
                                        >
                                            Create an Account!
                                        </a>
                                    </div>
                                    <div className="text-center">
                                        <a
                                            className="inline-block text-sm text-red-500 align-baseline hover:text-blue-800  text-[14px]"
                                            href="#"
                                        >
                                            Forgot Password?
                                        </a>
                                    </div>
                                </div>
                                <div className="flex  mt-[20px]">
                                    <div className="mb-6 mr-[39%] ml-[0%] text-center">
                                        <button
                                            className="flex items-center justify-center w-[90px] h-[50px] px-4 py-2 font-bold text-white bg-blue-500 rounded-[5px] hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                                            type="button"
                                        >
                                            <FontAwesomeIcon icon={faGoogle} size="2xs" className="size-[40px]" />
                                        </button>
                                    </div>
                                    <div className="mb-6 text-center">
                                        <button
                                            className="flex items-center justify-center w-[90px] h-[50px] px-4 py-2 font-bold text-white bg-blue-500 rounded-[5px] hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                                            type="button"
                                        >
                                            <FontAwesomeIcon icon={faFacebook} size="2xs" className="size-[40px]" />
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;
