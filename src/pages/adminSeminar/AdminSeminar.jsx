import { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import cn from 'classnames';

import styles from '../adminSeminars/createSeminar/createSeminar.module.scss';
import stylesImg from '../adminSignals/createSignal/createSignal.module.scss';
import trash from '@assets/delete.svg';
import change from '@assets/change-img.svg';
import arrow from '@assets/arrow-down-violet.svg';
import { convertDateFormat } from '../adminSeminars/utils/convertDateFormat';
import { getSeminar, updateSeminar, getImg, createImg, deleteImg } from '@service/admin/seminars';

const AdminSeminar = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const imgRef = useRef();
  const [title, setTitle] = useState('');
  const [link, setLink] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [price, setPrice] = useState(0);
  const [seats, setSeats] = useState(0);
  const [additionalInputs, setAdditionalInputs] = useState([]);
  const [imgForViev, setImgForViev] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [isImgChange, setIsImgChange] = useState(false);

  useEffect(() => {
    const fetchSignal = async () => {
      try {
        const { title, price, seats, link, date, description } = await getSeminar(id);
        setTitle(title);
        setLink(link);
        setPrice(price);
        setSeats(seats);
        setDate(date.substring(0, 10));
        setTime(date.substring(11, 16));

        const parser = new DOMParser();
        const doc = parser.parseFromString(description, 'text/html');
        const liElements = Array.from(doc.querySelectorAll('li'));

        liElements.map((li) => {
          handleAddInputFromApi(li);
        });
      } catch (error) {
        console.error(error);
      }
    };

    fetchSignal();
  }, [id]);

  useEffect(() => {
    const fetchImg = async () => {
      try {
        const { data } = await getImg(id);
        const blob = new Blob([data]);
        const url = URL.createObjectURL(blob);
        setImageUrl(url);
      } catch (error) {
        console.error(error);
      }
    };

    fetchImg();
  }, [id]);

  const handleDeleteImg = () => {
    setImageUrl(null);
    setImgForViev(null);
    setIsImgChange(true);
    imgRef.current.value = '';
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setIsImgChange(true);

    if (file) {
      setImgForViev(URL.createObjectURL(file));
      setImageUrl(file);
      return;
    }

    setImgForViev(null);
    setImageUrl(null);
  };

  const handleAddImg = () => {
    imgRef.current.click();
  };

  const saveSeminar = async () => {
    const validDate = convertDateFormat(`${date} ${time}`);
    const values = [...additionalInputs.map((input) => input.value)];
    const htmlString = `<ul>${values.map((value) => `<li>${value}</li>`).join('')}</ul>`;

    const seminar = {
      title: title,
      description: htmlString,
      seats: +seats,
      price: +price,
      link: link,
      date: validDate,
    };

    await updateSeminar(id, seminar);

    if (isImgChange && imageUrl) {
      try {
        await createImg({ id, imageUrl });
      } catch (error) {
        console.error('Ошибка при создании изображения:', error);
      }
    }

    if (isImgChange && !imageUrl) {
      try {
        await deleteImg(id);
      } catch (error) {
        console.error('Ошибка при удалении изображения:', error);
      }
    }

    navigate('/seminars');
  };

  const handleAddInputFromApi = (li) => {
    const newInput = {
      id: li ? li.textContent.slice(0, 20) : additionalInputs.length + 1,
      value: li ? li.textContent : '',
    };
    setAdditionalInputs((prevInputs) => [...prevInputs, newInput]);
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
    <section className="admin-section">
      <h2 className={stylesImg.title}>Редактировать семинар</h2>
      <div className={stylesImg.imgTitle}>Изображение семинар</div>
      <div className={stylesImg.imgWrapper}>
        {imageUrl && !isImgChange && (
          <div className={stylesImg.imgLoaded}>
            <img src={imageUrl} width={180} height={104} alt="img" />
            <button className={stylesImg.trashBtn} onClick={handleDeleteImg}>
              <img src={trash} alt="delete-img" />
            </button>
          </div>
        )}
        {isImgChange && imgForViev && (
          <div className={stylesImg.imgLoaded}>
            <img src={imgForViev} width={180} height={104} alt="img" />
            <button className={stylesImg.trashBtn} onClick={handleDeleteImg}>
              <img src={trash} alt="delete-img" />
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
            accept=".jpeg, .jpg, .png"
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
          value={title}
          onChange={(e) => setTitle(e.target.value)}
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
              value={price}
              onChange={(e) => setPrice(e.target.value)}
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
        <Link to={'/seminars'} className={stylesImg.bottomCancel}>
          Отмена
        </Link>
        <button className={stylesImg.bottomAdd} onClick={() => saveSeminar()}>
          Сохранить семинар
        </button>
      </div>
    </section>
  );
};

export default AdminSeminar;
