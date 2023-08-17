import { Helmet, HelmetProvider } from 'react-helmet-async';
import Materials from '../middleware/contentCourse/Materials';
import Popup from './Popup';

export default function CourseContentPage() {

     return (
          <>
               <Helmet>
                    <title>COURSE_NAME | Minimal UI</title>
               </Helmet>
               <HelmetProvider>
                    <Materials />
                    {/* <Popup /> */}
               </HelmetProvider>

          </>
     );
}
