"use client"; // Mark this file as a Client Component

import React, { useEffect, useState } from "react";
import AddTask from "./components/AddTask";
import TodoList from "./components/TodoList";
import { fetchAllTasks } from "@/api";

export default function Home() {
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
        <h1 className="text-2xl font-bold">Todo List App</h1>
        <AddTask setTasks={setTasks} tasks={tasks} />
      </div>
      <TodoList setTasks={setTasks} tasks={tasks} />
    </main>
  );
}
