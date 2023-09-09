import { useState } from 'react';
import './App.css';
import handleRequest from './handleRequest';
import FormInput from '../components/FormInput';

const App = () => {
  const [values, setValues] = useState({
    username: 'huan bui',
    phoneNumber: '0123456789',
    pickupAddress: 'Landmark 81',
    dropoffAddress: '227 Nguyễn Văn Cừ, Quận 5, TP.Hồ Chí Minh',
    carType: 'Car 7 seats',
    // name: "huan bui"
    // phoneNumber: "0123456789",
    // //pickupAddress: "Đại học Văn Lang",
    // pickupAddress: "2 Nguyễn Văn Cừ, Quận 5, TP.Hồ Chí Minh",
    // dropoffAddress: "Landmark 81",
    // carType: "Car 7 seats",
    // coordinateProviderType: "goongProvider"
  });

  const inputs = [
    {
      id: 1,
      name: 'username',
      type: 'text',
      placeholder: 'Username',
      errorMessage:
        "Username should be 3-16 characters and shouldn't include any special character!",
      label: 'Username',
      pattern: '^[A-Za-z0-9]{3,16}$',
      required: true,
    },
    {
      id: 2,
      name: 'phone',
      type: 'phone',
      placeholder: 'Phone Number',
      errorMessage: 'It should be a valid phone number!',
      label: 'Phone Number',
      required: true,
    },
    {
      id: 3,
      name: 'pickup',
      type: 'text',
      placeholder: 'Pick Up Address',
      label: 'Pick Up Address',
    },
    {
      id: 4,
      name: 'dropoff',
      type: 'text',
      placeholder: 'Drop Off Address',
      label: 'Drop Off Address',
    },
    {
      id: 5,
      name: 'cartype',
      type: 'text',
      placeholder: 'Car Type ',
      label: 'Car Type ',
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <div className="app">
      <form onSubmit={handleSubmit}>
        <h1>Register</h1>
        {inputs.map((input) => (
          <FormInput
            key={input.id}
            {...input}
            value={values[input.name]}
            onChange={onChange}
          />
        ))}

        <button>Submit</button>
      </form>
      <div>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.631711314178!2d106.67990747481815!3d10.762840859444594!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f1c06f4e1dd%3A0x43900f1d4539a3d!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBLaG9hIGjhu41jIFThu7Egbmhpw6puIC0gxJDhuqFpIGjhu41jIFF14buRYyBnaWEgVFAuSENN!5e0!3m2!1svi!2s!4v1694231118235!5m2!1svi!2s"
          width="500"
          height="450"
          style={{ border: '0' }}
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
};

export default App;
