import React, { useEffect, useState } from 'react';

import ErrorModal from '../components/UIElements/ErrorModal';
import LoadingSpinner from '../components/UIElements/LoadingSpinner';
import UsersList from '../components/User/UsersList';
import Filter from '../components/User/Filter';
import { useHttpClient } from '../util/http-hook';

const Principal = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedUsers, setLoadedUsers] = useState();
  const [filteredUsers, setFilteredUsers] = useState();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const responseData = await sendRequest(
          'https://api.github.com/orgs/grupotesseract/public_members'
        );
        setFilteredUsers(responseData);
        setLoadedUsers(responseData);
      } catch (err) {}
    };
    fetchUsers();
  }, [sendRequest]);

  const filterUser = async (user_login) => {
    if (!user_login) {
      setFilteredUsers(loadedUsers);
    } else {
      setFilteredUsers(
        loadedUsers.filter(user => 
          user.login.toLowerCase().slice(0,user_login.length) === user_login.toLowerCase()
        )
      );
    }
  }

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <h1>Github Users Grupo Tesseract</h1>
      <Filter filter={filterUser}/>
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedUsers && <UsersList items={filteredUsers} />}
    </React.Fragment>
  );
};

export default Principal;
