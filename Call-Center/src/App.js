import { useState } from 'react';
import './App.css';
import handleRequest from './handleRequest';
import FormInput from './components/FormInput';
import './components/formInput.css';

const App = () => {
  const [formData, setFormData] = useState({
    phoneNumber: '',
    name: '',
    pickupAddress: '',
    dropoffAddress: '',
    carType: 'Select Car Type', // Đặt giá trị mặc định ban đầu
    // coordinateProviderType: '',
    coordinateProviderType: 'goongProvider',
  });

  const carTypes = ['Car 7 seats', 'Car 4 seats'];
  const toString = { 
    'Car 7 seats': '7 SEATS CAR', 
    'Car 4 seats': '4 SEATS CAR'
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    handleRequest(formData);
  };

  return (
    <div className="app">
      <form onSubmit={handleSubmit}>
        <h1>Order</h1>
        <FormInput
          name="phoneNumber"
          type="text"
          placeholder="Phone Number"
          label="Phone Number"
          value={formData.phoneNumber}
          onChange={handleChange}
        />

        <FormInput
          name="name"
          type="text"
          placeholder="Name"
          label="Name"
          value={formData.name}
          onChange={handleChange}
        />

        <FormInput
          name="pickupAddress"
          type="text"
          placeholder="Pick Up Address"
          label="Pick Up Address"
          value={formData.pickupAddress}
          onChange={handleChange}
        />

        <FormInput
          name="dropoffAddress"
          type="text"
          placeholder="Drop Off Address"
          label="Drop Off Address"
          value={formData.dropoffAddress}
          onChange={handleChange}
        />

        <div className="formInput">
          <label>Car Type</label>
          <select
            name="carType"
            value={formData.carType}
            onChange={handleChange}
            required
          >
            <option value="">Select Car Type</option> {/* Option mặc định */}
            {carTypes.map((type) => (
              <option key={toString[type]} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <button style={{ width: '280px' }} type="submit">Submit</button>
      </form>
    </div>
  );
};

export default App;
