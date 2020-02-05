import React from 'react';

import Avatar from '../UIElements/Avatar';
import Card from '../UIElements/Card';
import './UserItem.css';

const UserItem = props => {
  return (
    <li className="user-item">
      <Card className="user-item__content">
        <a>
          <div className="user-item__image">
            <Avatar image={props.avatar_url} alt={props.login} />
          </div>
          <div className="user-item__info">
            <h2>{props.login}</h2>
          </div>
        </a>
      </Card>
    </li>
  );
};

export default UserItem;
