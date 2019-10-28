import React from 'react';

const getUsers = () =>
  fetch('https://randomuser.me/api')
    .then(res => res.json())
    .then(({ results }) => results);

const App: React.FC = () => {
  const [users, setUsers] = React.useState([]);

  React.useEffect(() => {
    getUsers().then(setUsers);
  }, []);

  return (
    <div>
      <ul>
        {users.map(user => (
          <li>
            <pre>{JSON.stringify(user, null, 2)}</pre>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
