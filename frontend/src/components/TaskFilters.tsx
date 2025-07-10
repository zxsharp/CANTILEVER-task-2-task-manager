import { Search, Filter } from 'lucide-react';

interface TaskFiltersProps {
  filters: {
    status: string;
    priority: string;
    sortBy: string;
    order: string;
    search: string;
  };
  onFiltersChange: (filters: any) => void;
}

const TaskFilters = ({ filters, onFiltersChange }: TaskFiltersProps) => {
  const updateFilter = (key: string, value: string) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const resetFilters = () => {
    onFiltersChange({
      status: '',
      priority: '',
      sortBy: 'createdAt',
      order: 'desc',
      search: ''
    });
  };

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm border border-purple-500/30 rounded-lg shadow-lg p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <Filter className="h-5 w-5 text-purple-400 mr-2" />
          <h3 className="text-lg font-medium text-white">Filters & Sorting</h3>
        </div>
        <button
          onClick={resetFilters}
          className="text-sm text-purple-400 hover:text-purple-300 font-medium cursor-pointer"
        >
          Reset Filters
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
        {/* Search */}
        <div className="lg:col-span-2">
          <label htmlFor="search" className="block text-sm font-medium text-purple-200 mb-2">
            Search
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-purple-400" />
            <input
              id="search"
              type="text"
              value={filters.search}
              onChange={(e) => updateFilter('search', e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-purple-500/30 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-slate-700 text-white placeholder-purple-300"
              placeholder="Search tasks..."
            />
          </div>
        </div>

        {/* Status Filter */}
        <div>
          <label htmlFor="status" className="block text-sm font-medium text-purple-200 mb-2">
            Status
          </label>
          <select
            id="status"
            value={filters.status}
            onChange={(e) => updateFilter('status', e.target.value)}
            className="w-full px-3 py-2 border border-purple-500/30 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-slate-700 text-white"
          >
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        {/* Priority Filter */}
        <div>
          <label htmlFor="priority" className="block text-sm font-medium text-purple-200 mb-2">
            Priority
          </label>
          <select
            id="priority"
            value={filters.priority}
            onChange={(e) => updateFilter('priority', e.target.value)}
            className="w-full px-3 py-2 border border-purple-500/30 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-slate-700 text-white"
          >
            <option value="">All Priorities</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        {/* Sort By */}
        <div>
          <label htmlFor="sort" className="block text-sm font-medium text-purple-200 mb-2">
            Sort By
          </label>
          <select
            id="sort"
            value={filters.sortBy}
            onChange={(e) => updateFilter('sortBy', e.target.value)}
            className="w-full px-3 py-2 border border-purple-500/30 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-slate-700 text-white"
          >
            <option value="createdAt">Date Created</option>
            <option value="updatedAt">Date Updated</option>
            <option value="dueDate">Due Date</option>
            <option value="priority">Priority</option>
            <option value="title">Title</option>
            <option value="status">Status</option>
          </select>
        </div>

        {/* Sort Order */}
        <div>
          <label htmlFor="order" className="block text-sm font-medium text-purple-200 mb-2">
            Order
          </label>
          <select
            id="order"
            value={filters.order}
            onChange={(e) => updateFilter('order', e.target.value)}
            className="w-full px-3 py-2 border border-purple-500/30 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-slate-700 text-white"
            title={filters.sortBy === 'priority' ? 
              (filters.order === 'desc' ? 'High to Low' : 'Low to High') : 
              (filters.order === 'desc' ? 'Newest first' : 'Oldest first')
            }
          >
            <option value="desc">
              {filters.sortBy === 'priority' ? 'High → Low' : 
               filters.sortBy === 'title' ? 'Z → A' : 'Desc'}
            </option>
            <option value="asc">
              {filters.sortBy === 'priority' ? 'Low → High' : 
               filters.sortBy === 'title' ? 'A → Z' : 'Asc'}
            </option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default TaskFilters;
