import { useState, useRef } from 'react';
import cn from 'classnames';

import styles from './createSeminar.module.scss';
import stylesImg from '../../adminSignals/createSignal/createSignal.module.scss';
import trash from '@assets/delete.svg';
import change from '@assets/change-img.svg';
import arrow from '@assets/arrow-down-violet.svg';
import { createSeminar, createImg } from '@service/admin/seminars';
import { convertDateFormat } from '../utils/convertDateFormat';

const CreateSeminar = ({ setTabs }) => {
  const imgRef = useRef();
  const [imgForViev, setImgForViev] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [header, setHeader] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [paragraph, setParagraph] = useState('');
  const [link, setLink] = useState('');
  const [cost, setCost] = useState('');
  const [seats, setSeats] = useState('');
  const [additionalInputs, setAdditionalInputs] = useState([]);

  const handleDeleteImg = () => {
    setImageUrl(null);
    setImgForViev(null);
    imgRef.current.value = '';
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setImgForViev(URL.createObjectURL(file));
      setImageUrl(file);
    } else {
      setImgForViev(null);
      setImageUrl(null);
    }
  };

  const handleAddImg = () => {
    imgRef.current.click();
  };

  const sendSeminar = async () => {
    const validDate = convertDateFormat(`${date} ${time}`);
    const values = [paragraph, ...additionalInputs.map((input) => input.value)];
    const htmlString = `<ul>${values.map((value) => `<li>${value}</li>`).join('')}</ul>`;

    const seminar = {
      title: header,
      description: htmlString,
      seats: +seats,
      price: +cost,
      date: validDate,
      link: link,
    };

    const { id } = await createSeminar(seminar);

    if (imageUrl) {
      try {
        await createImg({ id, imageUrl });
      } catch (error) {
        console.error('Ошибка при отправке изображения:', error);
      }
    }

    setTabs('seminars');
  };

  const handleAddInput = () => {
    const newInput = {
      id: additionalInputs.length + 1,
      value: '',
    };
    setAdditionalInputs([...additionalInputs, newInput]);
  };

  const handleChangeAdditionalInput = (e, id) => {
    const updatedInputs = additionalInputs.map((input) => {
      if (input.id === id) {
        return {
          ...input,
          value: e.target.value,
        };
      }
      return input;
    });
    setAdditionalInputs(updatedInputs);
  };

  const handleRemoveInput = (id) => {
    const updatedInputs = additionalInputs.filter((input) => input.id !== id);
    setAdditionalInputs(updatedInputs);
  };

  return (
    <>
      <h2 className={stylesImg.title}>Новый семинар</h2>
      <div className={stylesImg.imgTitle}>Изображение семинара</div>
      <div className={stylesImg.imgWrapper}>
        {imgForViev && (
          <div className={stylesImg.imgLoaded}>
            <img src={imgForViev} width={180} height={104} alt="load-img" />
            <button className={stylesImg.trashBtn} onClick={handleDeleteImg}>
              <img src={trash} width={16} height={20} alt="delete-img" />
            </button>
          </div>
        )}
        <div className={stylesImg.imgChange} onClick={handleAddImg}>
          <input
            className={stylesImg.imgInput}
            ref={imgRef}
            type="file"
            name="file"
            onChange={handleFileChange}
            accept="image/jpeg, image/jpg, image/png, image/webp"
          />
          <img src={change} width={25} height={25} alt="change-img" />
          <span className={stylesImg.imgSpan}>
            Заменить <br /> изображение
          </span>
        </div>
      </div>
      <div className={styles.item}>
        <div className={styles.suptitle}>Заголовок семинара</div>
        <input
          className={styles.input}
          value={header}
          onChange={(e) => setHeader(e.target.value)}
          type="text"
          name="title"
          placeholder="Введите заголовок"
        />
      </div>
      <div className={cn(styles.dates, styles.item)}>
        <div className={styles.datesItem}>
          <div className={styles.suptitle}>Дата проведения</div>
          <input
            className={styles.input}
            onChange={(e) => setDate(e.target.value)}
            value={date}
            type="date"
            name="date"
            placeholder="Выберите дату"
          />
          <img src={arrow} width={11} height={6} alt="arrow-down" />
        </div>
        <div className={styles.datesItem}>
          <div className={styles.suptitle}>Время проведения</div>
          <input
            className={styles.input}
            value={time}
            onChange={(e) => setTime(e.target.value)}
            type="time"
            name="time"
            placeholder="Укажите время"
          />
          <img src={arrow} width={11} height={6} alt="arrow-down" />
        </div>
      </div>
      <div className={styles.item}>
        <div className={styles.suptitle}>На курсе вы научитесь</div>
        <input
          className={styles.input}
          value={paragraph}
          onChange={(e) => setParagraph(e.target.value)}
          type="text"
          name="description"
          placeholder="Введите описание семинара"
        />
        {additionalInputs.map((input) => (
          <div key={input.id} className={styles.additionalWrapper}>
            <input
              className={cn(styles.input, styles.li)}
              value={input.value}
              onChange={(e) => handleChangeAdditionalInput(e, input.id)}
              type="text"
              name="description"
              placeholder="Введите описание семинара"
            />
            <button
              className={cn(stylesImg.trashBtn, styles.additionalBtn)}
              onClick={() => handleRemoveInput(input.id)}>
              <img src={trash} width={16} height={20} alt="delete-description" />
            </button>
          </div>
        ))}
        <button className={styles.addPunct} onClick={handleAddInput}>
          <span className={styles.addPlus}>+</span>
          <span className={styles.addSpan}>Добавить пункт описания</span>
        </button>
      </div>
      <div className={styles.item}>
        <div className={styles.suptitle}>Ссылка на семинар</div>
        <input
          className={styles.input}
          value={link}
          onChange={(e) => setLink(e.target.value)}
          type="text"
          name="link"
          placeholder="Введите ссылку, которая переадресует пользователя на семинар"
        />
        <div className={cn(styles.info, styles.item)}>
          <div className={styles.datesItem}>
            <div className={styles.suptitle}>Стоимость участия</div>
            <input
              className={styles.input}
              value={cost}
              onChange={(e) => setCost(e.target.value)}
              type="text"
              name="cost"
              placeholder="Укажите стоимость, руб"
            />
          </div>
          <div className={styles.datesItem}>
            <div className={styles.suptitle}>Количество мест</div>
            <input
              className={styles.input}
              value={seats}
              onChange={(e) => setSeats(e.target.value)}
              type="text"
              name="seats"
              placeholder="Укажите максимальное количество участников"
            />
          </div>
        </div>
      </div>
      <div className={stylesImg.bottom}>
        <button className={stylesImg.bottomCancel} onClick={() => setTabs('seminars')}>
          Отмена
        </button>
        <button className={stylesImg.bottomAdd} onClick={sendSeminar}>
          Добавить семинар
        </button>
      </div>
    </>
  );
};

export default CreateSeminar;
