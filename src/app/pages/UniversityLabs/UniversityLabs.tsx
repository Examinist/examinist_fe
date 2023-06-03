import React, { useEffect } from 'react'
import { addLabApi, getLabsListApi, updateLabApi } from '../../services/APIs/LabsAPIs';
import { ILab } from '../../types/Lab';

const lab: ILab = {id: 21, name: "Mock Lab11", capacity: 10};
export default function UniversityLabs() {
  useEffect(() => {
    // getLabsListApi().then((res) => {
    //   console.log(res);
    // });
    
  }, []);
  return (
    <div>UniversityLabs</div>
  )
}
