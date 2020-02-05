import React from 'react';

import UserItem from './UserItem';
import Card from '../UIElements/Card';
import './UsersList.css';

const UsersList = props => {
  if (props.items.length === 0) {
    return (
      <div className="center">
        <Card>
          <h2>Nenhum usuário encontrado.</h2>
        </Card>
      </div>
    );
  }

  return (
    <ul className="users-list">
      {props.items.map(user => (
        <UserItem
          key={user.id}
          id={user.id}
          avatar_url={user.avatar_url}
          login={user.login}
        />
      ))}
    </ul>
  );
};

export default UsersList;
