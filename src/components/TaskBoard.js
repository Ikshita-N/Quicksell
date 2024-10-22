import React, { useState, useEffect } from 'react';
import TaskColumn from './TaskColumn';
import DisplayMenu from './DisplayMenu';

const API_URL = 'https://api.quicksell.co/v1/internal/frontend-assignment';

const TaskBoard = () => {
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [groupBy, setGroupBy] = useState(() => localStorage.getItem('groupBy') || 'status');
  const [sortBy, setSortBy] = useState(() => localStorage.getItem('sortBy') || 'priority');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('Failed to fetch data');

        const data = await response.json();
        setTasks(data.tickets);
        setUsers(data.users);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    localStorage.setItem('groupBy', groupBy);
    localStorage.setItem('sortBy', sortBy);
  }, [groupBy, sortBy]);

  const getUserById = (userId) => users.find((user) => user.id === userId);

  const sortTasks = (tasksToSort) => {
    return [...tasksToSort].sort((a, b) => {
      return sortBy === 'priority' ? b.priority - a.priority : a.title.localeCompare(b.title);
    });
  };

  const groupTasks = () => {
    const grouped = {};

    tasks.forEach((task) => {
      const groupKey = groupBy === 'status' ? task.status :
                       groupBy === 'user' ? getUserById(task.userId)?.name || 'Unassigned' :
                       getPriorityLabel(task.priority);

      if (!grouped[groupKey]) grouped[groupKey] = [];
      grouped[groupKey].push(task);
    });

    // Sort each group
    for (const key in grouped) {
      grouped[key] = sortTasks(grouped[key]);
    }

    return grouped;
  };

  const getPriorityLabel = (priority) => {
    switch (priority) {
      case 4: return 'Urgent';
      case 3: return 'High';
      case 2: return 'Medium';
      case 1: return 'Low';
      case 0: return 'No priority';
      default: return 'Unknown';
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="task-board">
      <DisplayMenu groupBy={groupBy} setGroupBy={setGroupBy} sortBy={sortBy} setSortBy={setSortBy} />
      <div className="task-board-body">
        {Object.entries(groupTasks()).map(([groupName, tasks]) => (
          <TaskColumn key={groupName} groupName={groupName} tasks={tasks} getUserById={getUserById} />
        ))}
      </div>
      <style jsx>{`
        .task-board {
          padding: 20px;
          background-color: #f4f5f8;
          min-height: 100vh;
        }
        .task-board-body {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 24px;
        }
      `}</style>
    </div>
  );
};

export default TaskBoard;
