import { useState } from 'react';
import { useSelector } from 'react-redux';

import Tabs from './tabs/Tabs';
import Login from './login/Login';
import Register from './register/Register';
import Restore from './restore/Restore';
import Confirm from './confirm/Confirm';
import Metamask from './metamask/Metamask';
import Cabinet from './cabinet/Cabinet';

const Profile = () => {
  const { data } = useSelector(({ user }) => user);
  const [activeTab1, setActiveTab1] = useState('login');
  const [activeTab2, setActiveTab2] = useState('null');
  const [isConfirm, setIsConfirm] = useState(false);
  const [confirmLink, setConfirmLink] = useState('');

  const handleTabChange1 = (tab) => {
    setActiveTab1(tab);
  };

  return (
    <section className="section">
      <div className="container">
        {data?.user?.id === undefined ? (
          <>
            {activeTab1 !== 'null' && (
              <Tabs activeTab1={activeTab1} handleTabChange1={handleTabChange1} />
            )}
            {activeTab1 === 'login' && (
              <Login setActiveTab1={setActiveTab1} setActiveTab2={setActiveTab2} />
            )}
            {activeTab1 === 'metamask' && <Metamask />}
            {activeTab2 === 'register' && (
              <Register
                setActiveTab1={setActiveTab1}
                setActiveTab2={setActiveTab2}
                setIsConfirm={setIsConfirm}
                setConfirmLink={setConfirmLink}
              />
            )}
            {activeTab2 === 'restore' && <Restore />}
            {isConfirm && (
              <Confirm
                confirmLink={confirmLink}
                setActiveTab1={setActiveTab1}
                setActiveTab2={setActiveTab2}
                setIsConfirm={setIsConfirm}
              />
            )}
          </>
        ) : (
          <Cabinet />
        )}
      </div>
    </section>
  );
};

export default Profile;
