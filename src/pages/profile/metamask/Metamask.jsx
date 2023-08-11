import { useState } from 'react';
import { ethers } from 'ethers';

import styles from './metamask.module.scss';
import foxPng from '@assets/metaMask.png';
import foxWebp from '@assets/metaMask.webp';

const Metamask = () => {
  const [user, setUser] = useState('');
  const [balance, setBalance] = useState(0);

  const onAuthorize = async () => {
    if (window.ethereum) {
      window.ethereum.request({ method: 'eth_requestAccounts' }).then((response) => {
        setUser(response[0]);
        getBalance(response[0]);
      });

      window.ethereum.on('accountChanged', onAuthorize);
      window.ethereum.on('chainChanged', chainHandler);
    } else {
      alert('Установите приложение metamask для вашего браузера');
    }
  };

  const getBalance = (account) => {
    window.ethereum
      .request({ method: 'eth_getBalance', params: [account, 'latest'] })
      .then((balance) => setBalance(ethers.formatEther(balance)));
  };

  const chainHandler = () => {
    window.location.reload();
  };

  console.log(user, balance);

  return (
    <div className={styles.metamask}>
      <picture>
        <source srcSet={foxWebp} type="image/webp" />
        <img src={foxPng} width={150} height={139} alt="fox" />
      </picture>
      <h2 className={styles.title}>Добро пожаловать</h2>
      <div className={styles.suptitle}>
        Пожалуйста, авторизуйтесь через Ваш криптовалютный кошелек Metamask
      </div>
      <button className={styles.authorization} onClick={onAuthorize}>
        Авторизоваться
      </button>
    </div>
  );
};

export default Metamask;
