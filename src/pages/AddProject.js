import React, { useState } from 'react';
import Layout from '../components/Layout';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { showLoading, hideLoading } from '../redux/features/alertSlice';
import { message } from 'antd';
import ViewProject from './ViewProject'; 

const AddProject = () => {
  const [formData, setFormData] = useState({
    projecttitle: '',
    projectdescription: '',
    projectrequirement: '',
    deadline: ''
  });
  const { user } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        
        console.log(formData);
        const response = await axios.post('http://localhost:8080/addproject', formData);
        const projectId = response.data.projectId;
        response.save();
        
        navigate('/');
    } catch (error) {
       
        dispatch(hideLoading());
        console.error(error);
        message.error('Something went wrong');
    }
};
return (
    <Layout>
      <h1 className='text-center'>ADD PROJECT</h1>
      {!submitted && (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <label style={{ color: 'black', marginBottom: '10px' }}>Project Title</label>
          <input
            value={formData.projecttitle}
            type="text"
            name="projecttitle"
            onChange={(e) => setFormData({ ...formData, projecttitle: e.target.value })}
            style={{ marginBottom: '10px' }}
            required
          />
          <label style={{ color: 'black', marginBottom: '10px' }}>Project Description</label>
          <input
            value={formData.projectdescription}
            type="text"
            name="projectdescription"
            onChange={(e) => setFormData({ ...formData, projectdescription: e.target.value })}
            style={{ marginBottom: '10px' }}
            required
          />
          <label style={{ color: 'black', marginBottom: '10px' }}>Project Requirement</label>
          <input
            value={formData.projectrequirement}
            type="text"
            name="projectrequirement"
            onChange={(e) => setFormData({ ...formData, projectrequirement: e.target.value })}
            style={{ marginBottom: '10px' }}
            required
          />
          <label style={{ color: 'black', marginBottom: '10px' }}>Deadline</label>
          <input
            value={formData.deadline}
            type="date"
            name="deadline"
            onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
            style={{ marginBottom: '20px' }}
            required
          />
          <input type="submit" value="Submit" />
        </form>
      )}
      {submitted && <ViewProject formData={formData} />} 
    </Layout>
  );
};

export default AddProject;





