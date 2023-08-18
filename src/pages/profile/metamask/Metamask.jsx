import { ethers } from 'ethers';

import styles from './metamask.module.scss';
import foxPng from '@assets/metaMask.png';
import foxWebp from '@assets/metaMask.webp';
import { postLogin } from '@service/user/metamask';

const Metamask = () => {
  let provider = null;
  let signer = null;

  const onAuthorize = async () => {
    if (window.ethereum) {
      provider = new ethers.BrowserProvider(window.ethereum);
      signer = await provider.getSigner();
      const userAddress = await signer.getAddress();
      const signature = await getSign(userAddress);

      await postLogin(userAddress, signature);

      window.ethereum.on('accountChanged', onAuthorize);
      window.ethereum.on('chainChanged', chainHandler);
    } else {
      alert('Установите приложение metamask для вашего браузера');
    }
  };

  const getSign = async (account) => {
    try {
      const message = JSON.stringify(account);
      const signature = await signer.signMessage(message);
      return signature;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const chainHandler = () => {
    window.location.reload();
  };

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
