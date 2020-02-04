import React, { useEffect, useState } from 'react';

import ErrorModal from '../components/UIElements/ErrorModal';
import LoadingSpinner from '../components/UIElements/LoadingSpinner';
import Avatar from '../components/UIElements/Avatar';
import { useHttpClient } from '../util/http-hook';

const Principal = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedUsers, setLoadedUsers] = useState();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const responseData = await sendRequest(
          'https://api.github.com/orgs/grupotesseract/public_members'
        );
        console.log(responseData);  
        setLoadedUsers(responseData);
      } catch (err) {}
    };
    fetchUsers();
  }, [sendRequest]);

  let lista;
  if (!isLoading && loadedUsers) {
    lista = 
      loadedUsers.map(user => (
        <div>
          <Avatar image={`${user.avatar_url}`} alt={user.login} />
          <p>{user.login}</p>
          <p></p>
        </div>
      )) 
  }

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {lista}
    </React.Fragment>
  );
};

export default Principal;
