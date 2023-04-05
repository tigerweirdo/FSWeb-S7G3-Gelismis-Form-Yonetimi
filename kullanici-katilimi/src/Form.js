import React, { useState } from 'react';
import * as yup from 'yup';
import axios from 'axios';
import './App.css';

const validationSchema = yup.object().shape({
  firstName: yup.string().required('İsim alanı zorunludur.'),
  lastName: yup.string().required('Soyisim alanı zorunludur.'),
  email: yup.string().email('Geçerli bir e-posta adresi girin.').required('E-posta alanı zorunludur.'),
  password: yup.string().min(8, 'Şifre en az 8 karakter içermelidir.').required('Şifre alanı zorunludur.'),
  termsOfService: yup.bool().oneOf([true], 'Kullanım Şartları kabul edilmelidir.'),
  role: yup.string().required('Rol alanı zorunludur.'),
});

const Form = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    termsOfService: false,
    role: '',
  });

  const [errors, setErrors] = useState({});
  const [users, setUsers] = useState([]);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };


  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await validationSchema.validate(formData, { abortEarly: false });

      const response = await axios.post('https://reqres.in/api/users', formData);
      console.log('Doğru cevap:', response.data);

      setUsers([...users, response.data]);

      setErrors({});
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        const errors = err.inner.reduce((acc, error) => {
          acc[error.path] = error.message;
          return acc;
        }, {});
        setErrors(errors);
      } else {
        console.error('API isteğinde hata:', err);
      }
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="form">
        <div className="input-wrapper">
          <label htmlFor="firstName" className="label">İsim:</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className="input"
          />
        </div>
        <div className="input-wrapper">
          <label htmlFor="lastName" className="label">Soyisim:</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className="input"
          />
        </div>
        <div className="input-wrapper">
          <label htmlFor="email" className="label">E-posta:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="input"
          />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>
        <div className="input-wrapper">
          <label htmlFor="password" className="label">Şifre:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="input"
            />
            <div className="input-wrapper">
          <label htmlFor="role" className="label">Rol:</label>
          <select
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="input"
          >
            <option value="">Rol seçin</option>
            <option value="user">Kullanıcı</option>
            <option value="admin">Yönetici</option>
            <option value="moderator">Moderatör</option>
          </select>
          {errors.role && <p className="error">{errors.role}</p>}
        </div>

            {errors.password && <p className="error">{errors.password}</p>}
          </div>
          <div className="input-wrapper">
            <label htmlFor="termsOfService" className="label">
              <input
                type="checkbox"
                id="termsOfService"
                name="termsOfService"
                checked={formData.termsOfService}
                onChange={handleChange}
                className="checkbox"
              />
              Kullanım Şartları'nı kabul ediyorum
            </label>
            {errors.termsOfService && <p className="error">{errors.termsOfService}</p>}
          </div>
          <button type="submit" className="submit-btn">Gönder</button>
        </form>
        <h2 className="users-title">Kullanıcılar</h2>
        <ul className="users-list">
          {users.map((user, index) => (
            <li key={index} className="user-item">
              <pre className="user-data">{JSON.stringify(user, null, 2)}</pre>
            </li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default Form;