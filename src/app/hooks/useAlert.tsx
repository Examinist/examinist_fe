import React, { useContext } from 'react'
import { AlertContext } from '../context/AlertProvider';

export default function useAlert() {
  return useContext(AlertContext);
}
