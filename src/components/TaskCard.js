import React from 'react';
import TaskStatusIcon from './TaskStatusIcon';

const STATUS_ICONS = {
  Todo: require('../icons/To-do.svg').default,
  'In progress': require('../icons/in-progress.svg').default,
  Done: require('../icons/Done.svg').default,
  Backlog: require('../icons/Backlog.svg').default,
  Cancelled: require('../icons/Cancelled.svg').default,
};

const TaskCard = ({ task, getUserById }) => {
  const user = getUserById(task.userId);
  const priorityLabel = getPriorityLabel(task.priority);

  return (
    <div className="task-card">
      <div className="task-header">
        <span className="task-id">{task.id}</span>
        <div className="task-status-indicator" style={{ backgroundColor: getPriorityColor(task.priority) }}></div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {STATUS_ICONS[task.status] && <TaskStatusIcon src={STATUS_ICONS[task.status]} alt={task.status} />}
        <h3 className="task-title" style={{ marginLeft: '10px' }}>{task.title}</h3>
      </div>
      <div className="task-tags">
        {task.tag.map((tag, index) => (
          <span key={index} className="tag">{tag}</span>
        ))}
      </div>
      <style jsx>{`
        .task-card {
          background: #fff;
          border-radius: 5px;
          padding: 10px;
          margin: 10px 0;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
        }
        .task-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .task-id {
          font-size: 12px;
          color: #aaa;
        }
        .task-status-indicator {
          width: 10px;
          height: 10px;
          border-radius: 50%;
        }
        .task-title {
          margin: 0;
          font-size: 16px;
        }
        .task-tags {
          margin-top: 5px;
        }
        .tag {
          font-color: #e0e0e0;
          border-radius: 12px;
          padding: 5px 10px;
          margin-right: 5px;
          font-size: 12px;
        }
        .priority-label {
          font-weight: bold;
          color: #333;
          margin-top: 5px;
          display: inline-block;
        }
      `}</style>
    </div>
  );
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

const getPriorityColor = (priority) => {
  switch (priority) {
    case 4: return '#FF5733'; // Urgent color
    case 3: return '#FFA533'; // High color
    case 2: return '#33A3FF'; // Medium color
    case 1: return '#33FF57'; // Low color
    case 0: return '#CCCCCC'; // No priority color
    default: return '#CCCCCC'; // Default color for unknown
  }
};

export default TaskCard;
