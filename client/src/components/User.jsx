import React, {useEffect} from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';

function Profile() {

  const { user } = useAuth0();

  useEffect(() => {
    if (user) console.log(user)
  }, [user]);

  if (!user) return <div><LoginButton/></div>
  return <><div>Hello {user.name}</div>
    <LogoutButton />
  </>;
}

export default Profile;