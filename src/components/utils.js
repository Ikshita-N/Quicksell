export const renderGroupImage = (groupName) => {

    switch (groupName) {
      case 'Todo':
        return <img src={require('../icons/To-do.svg').default} alt="Todo" />;
      case 'In progress':
        return <img src={require('../icons/in-progress.svg').default} alt="In Progress" />;
      case 'Done':
        return <img src={require('../icons/Done.svg').default} alt="Done" />;
      case 'Backlog':
        return <img src={require('../icons/Backlog.svg').default} alt="Backlog" />;
      case 'Cancelled':
        return <img src={require('../icons/Cancelled.svg').default} alt="Cancelled" />;
      default:
        return null;
    }
  };
  