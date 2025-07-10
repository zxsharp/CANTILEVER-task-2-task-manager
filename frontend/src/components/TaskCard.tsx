import { format } from 'date-fns';
import { 
  Calendar, 
  Clock, 
  Edit, 
  Trash2, 
  CheckCircle, 
  Circle,
  AlertCircle,
  ArrowUp,
  ArrowDown,
  Minus
} from 'lucide-react';
import { type Task } from '../pages/TasksPage';

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
  onToggle: (taskId: string) => void;
}

const TaskCard = ({ task, onEdit, onDelete, onToggle }: TaskCardProps) => {
  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high':
        return <ArrowUp className="h-4 w-4 text-red-500" />;
      case 'low':
        return <ArrowDown className="h-4 w-4 text-green-500" />;
      default:
        return <Minus className="h-4 w-4 text-yellow-500" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && !task.completed;

  return (
    <div className={`bg-slate-800 rounded-lg shadow-sm border-2 transition-all duration-300 hover:shadow-lg hover:scale-105 hover:-translate-y-1 ${
      task.completed ? 'border-green-500/30 bg-green-900/20' : 
      isOverdue ? 'border-red-500/30' : 'border-purple-500/30'
    }`}>
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-start space-x-3 flex-1">
            <button
              onClick={() => onToggle(task._id)}
              className={`mt-1 transition-colors cursor-pointer ${
                task.completed ? 'text-green-600 dark:text-green-400' : 'text-gray-400 dark:text-gray-500 hover:text-green-600 dark:hover:text-green-400'
              }`}
            >
              {task.completed ? (
                <CheckCircle className="h-5 w-5" />
              ) : (
                <Circle className="h-5 w-5" />
              )}
            </button>
            <div className="flex-1">
              <h3 className={`font-semibold text-gray-900 dark:text-white ${
                task.completed ? 'line-through opacity-75' : ''
              }`}>
                {task.title}
              </h3>
              {task.description && (
                <p className={`text-sm text-gray-600 dark:text-gray-300 mt-1 ${
                  task.completed ? 'line-through opacity-75' : ''
                }`}>
                  {task.description}
                </p>
              )}
            </div>
          </div>
          
          <div className="flex items-center space-x-1">
            <button
              onClick={() => onEdit(task)}
              className="p-1 text-gray-400 dark:text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
            >
              <Edit className="h-4 w-4" />
            </button>
            <button
              onClick={() => onDelete(task._id)}
              className="p-1 text-gray-400 dark:text-gray-500 hover:text-red-600 dark:hover:text-red-400 transition-colors cursor-pointer"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
            {getPriorityIcon(task.priority)}
            <span className="ml-1 capitalize">{task.priority}</span>
          </span>
          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
            {task.status === 'in-progress' ? 'In Progress' : task.status.charAt(0).toUpperCase() + task.status.slice(1)}
          </span>
        </div>

        {/* Dates */}
        <div className="space-y-2">
          {task.dueDate && (
            <div className={`flex items-center text-sm ${
              isOverdue ? 'text-red-600 dark:text-red-400' : 'text-gray-600 dark:text-gray-300'
            }`}>
              {isOverdue && <AlertCircle className="h-4 w-4 mr-1" />}
              <Calendar className="h-4 w-4 mr-1" />
              <span>Due: {format(new Date(task.dueDate), 'MMM dd, yyyy')}</span>
            </div>
          )}
          {task.scheduledDate && (
            <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
              <Clock className="h-4 w-4 mr-1" />
              <span>Scheduled: {format(new Date(task.scheduledDate), 'MMM dd, yyyy')}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
