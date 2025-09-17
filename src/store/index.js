import { createStore } from 'vuex';
//import auth from './modules/auth';
import dashboard from './modules/user/dashboard';
import profiles from './modules/user/profiles';
import documents from './modules/user/documents';
import positions from './modules/user/positions';
import educations from './modules/user/educations';
import trainings from './modules/user/trainings';
import titles from './modules/user/titles';
import families from './modules/user/families';
import achievements from './modules/user/achievements';
import performances from './modules/user/performances';
import users from './modules/admin/users';
import schools from './modules/admin/schools';
import details from './modules/admin/details';
import verify from './modules/admin/verify';


export default createStore({
  modules: {
   // auth,
    dashboard,
    profiles,
    documents,
    positions,
    educations,
    trainings,
    titles,
    families,
    achievements,
    performances,
    users,
    schools,
    details,
    verify,
    // Add other modules here if needed
  },
});
