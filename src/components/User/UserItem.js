import React, { useState } from 'react';

import Avatar from '../UIElements/Avatar';
import Card from '../UIElements/Card';
import ErrorModal from '../UIElements/ErrorModal';
import LoadingSpinner from '../UIElements/LoadingSpinner';
import './UserItem.css';

import { useHttpClient } from '../../util/http-hook';

const UserItem = props => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedDetails, setLoadedDetails] = useState();

  const fetchUserDetails = async () => {
    if (loadedDetails) {
      setLoadedDetails(null);
    } else {
      try {
        const responseData = await sendRequest(
          `https://api.github.com/users/${props.login}`
        );
        setLoadedDetails(responseData);
      } catch (err) { }
    }
  }

  let UserInfo;
  if (!isLoading && loadedDetails) {
    UserInfo =
      <React.Fragment>
        <p>{loadedDetails.name}</p>
        <p>Repositórios: {loadedDetails.public_repos}</p>
        <p>Seguidores: {loadedDetails.followers}</p>
        <p>Data de entrada:<br/>{loadedDetails.created_at.slice(0,10)}</p>
      </React.Fragment>
  }

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <li className="user-item">
        <Card className="user-item__content">
          <a onClick={fetchUserDetails} >
            <div className="user-item__image">
              <Avatar image={props.avatar_url} alt={props.login} />
            </div>
            <div className="user-item__info">
              <h2>{props.login}</h2>
              {UserInfo}
            </div>
            {isLoading && (
              <div className="center">
                <LoadingSpinner />
              </div>
            )}
          </a>
        </Card>
      </li>
    </React.Fragment>
  );
};

export default UserItem;
