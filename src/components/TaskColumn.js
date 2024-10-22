import React from 'react';
import TaskCard from './TaskCard';
import { renderGroupImage } from './utils'; 

const TaskColumn = ({ groupId, groupName, tasks, getUserById }) => {
  return (
    <div className="board-column">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {renderGroupImage(groupName)}
          <h2 style={{ marginLeft: '10px' }}>{groupName}</h2>
          <span className="task-count">{tasks.length}</span>
          {/* Displaying the group ID */}
          {/* <span style={{ marginLeft: '10px', fontSize: '12px', color: '#888' }}>ID: {groupId}</span> */}
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img src={require('../icons/add.svg').default} alt="Add" style={{ marginRight: '10px' }} />
          <img src={require('../icons/3 dot menu.svg').default} alt="More options" />
        </div>
      </div>
      <div className="column-content">
        {/* Render TaskCard for each task, even if tasks are empty */}
        {tasks.length === 0 ? (
          <p>No tasks available.</p>
        ) : (
          tasks.map((task) => (
            <TaskCard key={task.id} task={task} getUserById={getUserById} />
          ))
        )}
      </div>
      <style jsx>{`
        .board-column {
          background: white;
          border-radius: 8px;
          padding: 16px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }
        .task-count {
          border-radius: 50%;
          padding: 5px 10px;
          margin-left: 10px;
        }
      `}</style>
    </div>
  );
};

export default TaskColumn;
