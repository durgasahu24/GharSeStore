import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import {createOrder} from "../../../state/Order/Action.js"

export default function streetAddressForm() {

  const dispatch = useDispatch();
  
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    streetAddress: '',
    city: '',
    state: '',
    zipCode: '',
    mobile: '',
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.firstName) newErrors.firstName = "First name is required.";
    if (!formData.lastName) newErrors.lastName = "Last name is required.";
    if (!formData.streetAddress) newErrors.streetAddress = "streetAddress is required.";
    if (!formData.city) newErrors.city = "City is required.";
    if (!formData.state) newErrors.state = "State is required.";
    if (!formData.zipCode || formData.zipCode.length !== 6) newErrors.zipCode = "PinCode code must be 6 digits.";
    if (!formData.mobile || formData.mobile.length !== 10) newErrors.mobile = "Phone number must be 10 digits.";

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validate();
    setErrors(formErrors);

    if (Object.keys(formErrors).length === 0) {
      setIsSubmitting(true);
      // Simulate form submission
      setTimeout(() => {
        dispatch(createOrder({formData,navigate}))
        setIsSubmitting(false);
      }, 2000);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-12 p-6 bg-white shadow-lg rounded-lg min-h-screen lg:mt-[70px]">
      <h1 className=" text-2xl lg:text-4xl font-bold text-gray-800 mb-6 text-center whitespace-nowrap">Delivery Information</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* First Name */}
          <div className="flex flex-col">
            <label htmlFor="firstName" className="text-lg font-medium text-gray-700">First Name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              className={`mt-1 p-1 lg:p-3 w-full border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${errors.firstName ? 'border-red-500' : ''}`}
            />
            {errors.firstName && <p className="text-xs text-red-500 mt-1">{errors.firstName}</p>}
          </div>

          {/* Last Name */}
          <div className="flex flex-col">
            <label htmlFor="lastName" className="text-lg font-medium text-gray-700">Last Name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              className={`mt-1 p-1 lg:p-3 w-full border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${errors.lastName ? 'border-red-500' : ''}`}
            />
            {errors.lastName && <p className="text-xs text-red-500 mt-1">{errors.lastName}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* streetAddress */}
          <div className="flex flex-col col-span-2">
            <label htmlFor="streetAddress" className="text-lg font-medium text-gray-700">Street Address</label>
            <textarea
              id="streetAddress"
              name="streetAddress"
              value={formData.streetAddress}
              onChange={handleChange}
              required
              rows="4"
              className={`mt-1 p-1 lg:p-3 w-full border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${errors.streetAddress ? 'border-red-500' : ''}`}
            />
            {errors.streetAddress && <p className="text-xs text-red-500 mt-1">{errors.streetAddress}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* City */}
          <div className="flex flex-col">
            <label htmlFor="city" className="text-lg font-medium text-gray-700">City</label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
              className={`mt-1 p-1 lg:p-3 w-full border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${errors.city ? 'border-red-500' : ''}`}
            />
            {errors.city && <p className="text-xs text-red-500 mt-1">{errors.city}</p>}
          </div>

          {/* State */}
          <div className="flex flex-col">
            <label htmlFor="state" className="text-lg font-medium text-gray-700">State</label>
            <input
              type="text"
              id="state"
              name="state"
              value={formData.state}
              onChange={handleChange}
              required
              className={`mt-1 p-1 lg:p-3 w-full border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${errors.state ? 'border-red-500' : ''}`}
            />
            {errors.state && <p className="text-xs text-red-500 mt-1">{errors.state}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* zipCode Code */}
          <div className="flex flex-col">
            <label htmlFor="zipCode" className="text-lg font-medium text-gray-700">PinCode</label>
            <input
              type="text"
              id="zipCode"
              name="zipCode"
              value={formData.zipCode}
              onChange={handleChange}
              required
              className={`mt-1 p-1 lg:p-3 w-full border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${errors.zipCode ? 'border-red-500' : ''}`}
            />
            {errors.zipCode && <p className="text-xs text-red-500 mt-1">{errors.zipCode}</p>}
          </div>

          {/* Phone Number */}
          <div className="flex flex-col">
            <label htmlFor="mobile" className="text-lg font-medium text-gray-700">Phone Number</label>
            <input
              type="text"
              id="mobile"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              required
              className={`mt-1 p-1 lg:p-3 w-full border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${errors.mobile ? 'border-red-500' : ''}`}
            />
            {errors.mobile && <p className="text-xs text-red-500 mt-1">{errors.mobile}</p>}
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            type="submit"
            className={`w-1/2 py-3 text-white font-semibold rounded-lg ${isSubmitting ? 'bg-gray-400' : 'bg-gray-600 hover:bg-gray-700'} ${isSubmitting ? 'cursor-not-allowed' : ''}`}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Deliver Here'}
          </button>
        </div>
      </form>
    </div>
  );
}
