import express from 'express';
import Task from '../models/Task';
import { protect, AuthRequest } from '../middleware/auth';
import { taskSchema, updateTaskSchema } from '../utils/validation';

const router: express.Router = express.Router();

// All routes are protected
router.use(protect);

// Get all tasks with sorting and filtering
router.get('/', async (req: AuthRequest, res) => {
  try {
    const { status, priority, sortBy = 'createdAt', order = 'desc', search } = req.query;
    
    const filter: any = { userId: req.user._id };
    
    if (status) filter.status = status;
    if (priority) filter.priority = priority;
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    let tasks = await Task.find(filter);
    
    // Custom sorting logic
    const sortOrder = order === 'desc' ? -1 : 1;
    
    tasks.sort((a, b) => {
      let comparison = 0;
      
      switch (sortBy) {
        case 'priority':
          const priorityValues = { high: 3, medium: 2, low: 1 };
          const aPriority = priorityValues[a.priority as keyof typeof priorityValues] || 0;
          const bPriority = priorityValues[b.priority as keyof typeof priorityValues] || 0;
          comparison = aPriority - bPriority;
          break;
          
        case 'status':
          const statusValues = { completed: 3, 'in-progress': 2, pending: 1 };
          const aStatus = statusValues[a.status as keyof typeof statusValues] || 0;
          const bStatus = statusValues[b.status as keyof typeof statusValues] || 0;
          comparison = aStatus - bStatus;
          break;
          
        case 'title':
          comparison = a.title.localeCompare(b.title);
          break;
          
        case 'dueDate':
          const aDate = a.dueDate ? new Date(a.dueDate).getTime() : 0;
          const bDate = b.dueDate ? new Date(b.dueDate).getTime() : 0;
          comparison = aDate - bDate;
          break;
          
        case 'createdAt':
          comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
          break;
          
        case 'updatedAt':
          comparison = new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime();
          break;
          
        default:
          comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      }
      
      return comparison * sortOrder;
    });
    
    res.json({ success: true, tasks });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// Get single task
router.get('/:id', async (req: AuthRequest, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, userId: req.user._id });
    
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    
    res.json({ success: true, task });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// Create task
router.post('/', async (req: AuthRequest, res) => {
  try {
    const validatedData = taskSchema.parse(req.body);
    
    const taskData = {
      ...validatedData,
      userId: req.user._id,
      dueDate: validatedData.dueDate ? new Date(validatedData.dueDate) : undefined,
      scheduledDate: validatedData.scheduledDate ? new Date(validatedData.scheduledDate) : undefined
    };

    const task = await Task.create(taskData);
    res.status(201).json({ success: true, task });
  } catch (error: any) {
    res.status(400).json({ message: error.message || 'Invalid input' });
  }
});

// Update task
router.put('/:id', async (req: AuthRequest, res) => {
  try {
    const validatedData = updateTaskSchema.parse(req.body);
    
    const updateData = {
      ...validatedData,
      dueDate: validatedData.dueDate ? new Date(validatedData.dueDate) : undefined,
      scheduledDate: validatedData.scheduledDate ? new Date(validatedData.scheduledDate) : undefined
    };

    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      updateData,
      { new: true, runValidators: true }
    );

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json({ success: true, task });
  } catch (error: any) {
    res.status(400).json({ message: error.message || 'Invalid input' });
  }
});

// Mark task as completed/uncompleted
router.patch('/:id/toggle', async (req: AuthRequest, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, userId: req.user._id });
    
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    task.completed = !task.completed;
    task.status = task.completed ? 'completed' : 'pending';
    await task.save();

    res.json({ success: true, task });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// Delete task
router.delete('/:id', async (req: AuthRequest, res) => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
    
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    
    res.json({ success: true, message: 'Task deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
