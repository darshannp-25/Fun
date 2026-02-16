'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import api from '@/utils/api';
import toast from 'react-hot-toast';

interface Task {
    _id: string;
    title: string;
    description: string;
    completed: boolean;
}

export default function DashboardPage() {
    const { user, loading, isAuthenticated } = useAuth();
    const router = useRouter();
    const [tasks, setTasks] = useState<Task[]>([]);
    const [newTask, setNewTask] = useState({ title: '', description: '' });
    const [search, setSearch] = useState('');

    useEffect(() => {
        if (!loading && !isAuthenticated) {
            router.push('/login');
        } else if (isAuthenticated) {
            fetchTasks();
        }
    }, [loading, isAuthenticated, router]);

    const fetchTasks = async () => {
        try {
            const res = await api.get('/tasks');
            setTasks(res.data);
        } catch (err) {
            console.error(err);
        }
    };



    const addTask = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await api.post('/tasks', newTask);
            setTasks([res.data, ...tasks]);
            setNewTask({ title: '', description: '' });
            toast.success('Task added successfully!');
        } catch (err: any) {
            console.error(err);
            toast.error('Failed to add task');
        }
    };

    const deleteTask = async (id: string) => {
        try {
            await api.delete(`/tasks/${id}`);
            setTasks(tasks.filter(task => task._id !== id));
            toast.success('Task deleted');
        } catch (err: any) {
            console.error(err);
            toast.error('Failed to delete task');
        }
    };

    const toggleTask = async (task: Task) => {
        try {
            const res = await api.put(`/tasks/${task._id}`, { ...task, completed: !task.completed });
            setTasks(tasks.map(t => (t._id === task._id ? res.data : t)));
            toast.success(task.completed ? 'Task undone' : 'Task completed');
        } catch (err: any) {
            console.error(err);
            toast.error('Failed to update task');
        }
    };

    const filteredTasks = tasks.filter(task =>
        task.title.toLowerCase().includes(search.toLowerCase()) ||
        task.description.toLowerCase().includes(search.toLowerCase())
    );

    if (loading || !isAuthenticated) return <p className="text-center mt-10">Loading...</p>;

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">Dashboard</h1>

            {/* Search */}
            <div className="mb-6">
                <input
                    type="text"
                    placeholder="Search items..."
                    className="w-full p-2 border border-gray-300 rounded"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            {/* Add Task Form */}
            <form onSubmit={addTask} className="mb-8 p-4 bg-gray-100 rounded shadow">
                <h2 className="text-xl font-bold mb-4">Add New Item</h2>
                <div className="flex gap-4 mb-4">
                    <input
                        type="text"
                        placeholder="Title"
                        className="flex-1 p-2 border rounded"
                        value={newTask.title}
                        onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Description"
                        className="flex-1 p-2 border rounded"
                        value={newTask.description}
                        onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                    />
                </div>
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                    Add Item
                </button>
            </form>

            {/* Task List */}
            <div className="grid gap-4">
                {filteredTasks.length === 0 ? <p>No items found.</p> : filteredTasks.map((task) => (
                    <div key={task._id} className={`p-4 border rounded shadow flex justify-between items-center ${task.completed ? 'bg-green-50' : 'bg-white'}`}>
                        <div>
                            <h3 className={`font-bold ${task.completed ? 'line-through text-gray-500' : ''}`}>{task.title}</h3>
                            <p className="text-gray-600">{task.description}</p>
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={() => toggleTask(task)}
                                className={`px-3 py-1 rounded text-white ${task.completed ? 'bg-yellow-500' : 'bg-green-500'}`}
                            >
                                {task.completed ? 'Undo' : 'Complete'}
                            </button>
                            <button
                                onClick={() => deleteTask(task._id)}
                                className="bg-red-500 text-white px-3 py-1 rounded"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
