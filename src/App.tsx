import React from 'react';

const getUsers = () =>
  fetch('https://randomuser.me/api')
    .then(res => res.json())
    .then(({ results }) => results);

export interface Name {
  title: string;
  first: string;
  last: string;
}

export interface Street {
  number: number;
  name: string;
}

export interface Coordinates {
  latitude: string;
  longitude: string;
}

export interface Timezone {
  offset: string;
  description: string;
}

export interface Location {
  street: Street;
  city: string;
  state: string;
  country: string;
  postcode: number;
  coordinates: Coordinates;
  timezone: Timezone;
}

export interface Login {
  uuid: string;
  username: string;
  password: string;
  salt: string;
  md5: string;
  sha1: string;
  sha256: string;
}

export interface Dob {
  date: Date;
  age: number;
}

export interface Registered {
  date: Date;
  age: number;
}

export interface Id {
  name: string;
  value?: any;
}

export interface Picture {
  large: string;
  medium: string;
  thumbnail: string;
}

export interface IUser {
  gender: string;
  name: Name;
  location: Location;
  email: string;
  login: Login;
  dob: Dob;
  registered: Registered;
  phone: string;
  cell: string;
  id: Id;
  picture: Picture;
  nat: string;
}

const User: React.FC<IUser> = user => (
  <li>
    <pre>{JSON.stringify(user, null, 2)}</pre>
  </li>
);

const Users: React.FC<{ users: IUser[] }> = ({ users }) => (
  <ul>
    {users.map(user => (
      <User key={user.login.uuid} {...user}></User>
    ))}
  </ul>
);

const App: React.FC = () => {
  const [users, setUsers] = React.useState([]);

  React.useEffect(() => {
    getUsers().then(setUsers);
  }, []);

  return (
    <div>
      <Users users={users} />
    </div>
  );
};

export default App;
