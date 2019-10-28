import React from 'react';

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

type IUsers = IUser[];

const throttle = <Data extends {}>(data: Data) =>
  new Promise<Data>(resolve => {
    setTimeout(resolve, 2000, data);
  });

const getUsers = () =>
  fetch('https://randomuser.me/api')
    .then(res => res.json())
    .then(({ results }) => results as IUsers)
    .then(throttle);

const wrapPromise = <Data extends {}>(
  promise: Promise<Data>,
): (() => never | Data) => {
  let loading = true;
  let error: Error | null = null;
  let data: Data | null = null;

  const suspender = promise
    .then(d => {
      data = d;
    })
    .catch(e => {
      error = e;
    })
    .finally(() => {
      loading = false;
    });

  return () => {
    if (loading) {
      throw suspender;
    } else if (error) {
      throw error;
    } else {
      return data!;
    }
  };
};

const User: React.FC<IUser> = user => (
  <li>
    <pre>{JSON.stringify(user, null, 2)}</pre>
  </li>
);

const Users: React.FC<{ users: IUsers }> = ({ users }) => (
  <ul>
    {users.map(user => (
      <User key={user.login.uuid} {...user}></User>
    ))}
  </ul>
);

const resource = wrapPromise(getUsers());

const Adapter = () => <Users users={resource()} />;

const App: React.FC = () => (
  <React.Suspense
    fallback={<img src="https://i.imgur.com/HE134Vr.gif" alt="loading" />}
  >
    <Adapter />
  </React.Suspense>
);

export default App;
