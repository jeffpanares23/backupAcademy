import { useEffect, useState } from 'react';
import Axios from 'axios';

export default function useCourseData() {
  const [courseData, setCourseData] = useState();

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await Axios.get(`http://localhost:8000/fetchCourse`);
        const courses = response.data;
        if (courses.length > 0) {
          // console.log(courses);
          setCourseData(courses);
        }

      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchCourse();
  }, []);

  return courseData;
}
