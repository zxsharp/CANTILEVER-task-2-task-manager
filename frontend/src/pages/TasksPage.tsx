import { useState, useEffect } from 'react';
import TaskCard from '../components/TaskCard';
import TaskForm from '../components/TaskForm';
import TaskFilters from '../components/TaskFilters';
import Navbar from '../components/Navbar';
import { Plus } from 'lucide-react';
import toast from 'react-hot-toast';
import { apiRequest } from '../config/api';

export interface Task {
  _id: string;
  title: string;
  description?: string;
  status: 'pending' | 'in-progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  dueDate?: string;
  scheduledDate?: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

const TasksPage = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [filters, setFilters] = useState({
    status: '',
    priority: '',
    sortBy: 'createdAt',
    order: 'desc',
    search: ''
  });
  const [pageVisible, setPageVisible] = useState(false);

  const fetchTasks = async () => {
    try {
      const queryParams = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value) queryParams.append(key, value);
      });

      const data = await apiRequest(`/api/tasks?${queryParams}`);
      setTasks(data.tasks);
    } catch (error) {
      toast.error('Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [filters]);

  useEffect(() => {
    setPageVisible(true);
  }, []);

  const handleCreateTask = async (taskData: Partial<Task>) => {
    try {
      const data = await apiRequest('/api/tasks', {
        method: 'POST',
        body: JSON.stringify(taskData),
      });

      setTasks([data.task, ...tasks]);
      setShowTaskForm(false);
      toast.success('Task created successfully!');
    } catch (error) {
      toast.error('Failed to create task');
    }
  };

  const handleUpdateTask = async (taskId: string, taskData: Partial<Task>) => {
    try {
      const data = await apiRequest(`/api/tasks/${taskId}`, {
        method: 'PUT',
        body: JSON.stringify(taskData),
      });

      setTasks(tasks.map(task => task._id === taskId ? data.task : task));
      setEditingTask(null);
      toast.success('Task updated successfully!');
    } catch (error) {
      toast.error('Failed to update task');
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    try {
      await apiRequest(`/api/tasks/${taskId}`, {
        method: 'DELETE',
      });

      setTasks(tasks.filter(task => task._id !== taskId));
      toast.success('Task deleted successfully!');
    } catch (error) {
      toast.error('Failed to delete task');
    }
  };

  const handleToggleTask = async (taskId: string) => {
    try {
      const data = await apiRequest(`/api/tasks/${taskId}/toggle`, {
        method: 'PATCH',
      });

      setTasks(tasks.map(task => task._id === taskId ? data.task : task));
    } catch (error) {
      toast.error('Failed to toggle task');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-400"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900">
      <Navbar />
      
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className={`flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 transition-all duration-700 ${pageVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">My Tasks</h1>
            <p className="text-purple-200">
              {tasks.length === 0 ? 'No tasks yet' : `${tasks.length} task${tasks.length !== 1 ? 's' : ''} total`}
            </p>
          </div>
          <button
            onClick={() => setShowTaskForm(true)}
            className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors flex items-center mt-4 sm:mt-0 cursor-pointer"
          >
            <Plus className="h-5 w-5 mr-2" />
            Add Task
          </button>
        </div>

        {/* Filters */}
        <div className={`transition-all duration-700 delay-200 ${pageVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <TaskFilters filters={filters} onFiltersChange={setFilters} />
        </div>

        {/* Tasks Grid */}
        {tasks.length === 0 ? (
          <div className={`text-center py-16 transition-all duration-700 delay-400 ${pageVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="max-w-md mx-auto">
              <div className="bg-slate-800 border border-purple-500/30 rounded-full h-24 w-24 flex items-center justify-center mx-auto mb-4">
                <Plus 
                  onClick={() => setShowTaskForm(true)}
                  className="h-12 w-12 text-purple-400 cursor-pointer" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">No tasks yet</h3>
              <p className="text-purple-200 mb-6">
                Get started by creating your first task to stay organized and productive.
              </p>
              <button
                onClick={() => setShowTaskForm(true)}
                className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors cursor-pointer"
              >
                Create Your First Task
              </button>
            </div>
          </div>
        ) : (
          <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 transition-all duration-700 delay-400 ${pageVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {tasks.map((task, index) => (
              <div
                key={task._id}
                className={`transition-all duration-500 ${pageVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                style={{ transitionDelay: `${500 + index * 100}ms` }}
              >
                <TaskCard
                  task={task}
                  onEdit={setEditingTask}
                  onDelete={handleDeleteTask}
                  onToggle={handleToggleTask}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      
      {(showTaskForm || editingTask) && (
        <TaskForm
          task={editingTask}
          onClose={() => {
            setShowTaskForm(false);
            setEditingTask(null);
          }}
          onSubmit={editingTask ? 
            (taskData) => handleUpdateTask(editingTask._id, taskData) :
            handleCreateTask
          }
        />
      )}
    </div>
  );
};

export default TasksPage;