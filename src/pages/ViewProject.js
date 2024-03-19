import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
const ViewProject = () => {
    const location = useLocation();
    const formData = location.state;
    const [loading, setLoading] = useState(true);
    const [projectData, setProjectData] = useState(null); // State to store project data
    useEffect(async() => {
        console.log("ghsgdhs");
            try {
                const result = await axios.get('http://localhost:8080/viewprojects');
                console.log("data" + result.data);
                setProjectData(result.data);
                console.log(projectData);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false); 
            }

    }, []);

    if (loading) {
        return <div>
            <h2>Submitted Data</h2>
            <table>
                <thead>
                    <tr>
                        <th>Project Title</th>
                        <th>Project Description</th>
                        <th>Project Requirement</th>
                        <th>Deadline</th>
                    </tr>
                </thead>
                {(projectData) ? <tbody>
                    <tr>
                        <td>{projectData.projecttitle}</td>
                        <td>{projectData.projectdescription}</td>
                        <td>{projectData.projectrequirement}</td>
                        <td>{projectData.deadline}</td>
                    </tr>
                </tbody> : null}
            </table>
        </div>;
    }

    if (!formData || !projectData) {
        return <div>No project data found.</div>;
    }
    
};

export default ViewProject;
    