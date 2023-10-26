"use client"; // Mark this file as a Client Component

import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import {AiFillHome} from 'react-icons/ai'
import { fetchAllTasks } from '@/api'
import ExpiredTodoList from '../components/ExpiredTodoList';


const page = () => {

    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const fetchTasks = async () => {
        const data = await fetchAllTasks();
        setTasks(data);
        };

        fetchTasks();
    }, []);


    return (
        <main className="max-w-4xl mx-auto mt-4">
            <div className="text-black text-center my-5 flex flex-col gap-4">
                <h1 className="text-2xl font-bold">Expired Tasks</h1>
                <div>
                    <Link href='/'>
                        <button
                            className='btn btn-primary w-75 transition-colors duration-300 ease-in-out bg-dodgerblue hover:bg-green'
                        >
                            All Tasks / Go Back Home
                        
                        <AiFillHome className="ml-2 bg-transparent" style={{ background: 'transparent' }} size={18} />
                        </button>
                    </Link>
                </div>
            </div>
            <ExpiredTodoList tasks={tasks} setTasks={setTasks} />
        </main>
    )
}

export default page