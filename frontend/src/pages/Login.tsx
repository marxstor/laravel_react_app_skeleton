import React, { useEffect } from 'react'
import { getTest } from '../api/v1/test'

const Login = () => {

    // useEffect(() => {
    //     const fetchData = async () => {
    //         const data = await getTest();
    //         console.log(data.message);
    //     };

    //     fetchData();
    // }, []);

    const handleCallTestApi = async () => {
        const data = await getTest();
        console.log(data);
    }

    return (
        <>
            <div>Login</div>
            <button className='bg-blue-600 text-white px-4 py-2 rounded cursor-pointer' onClick={handleCallTestApi}>Call laravel /test api</button>
        </>
    )
}

export default Login