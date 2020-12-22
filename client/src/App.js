import { Route } from 'react-router-dom'
import Header from './components/Page/Header'
import LandingScreen from './screens/LandingScreen'
import Footer from './components/Page/Footer'
import AcademyScreen from './screens/AcademyScreen';
import ProfileScreen from './screens/ProfileScreen'
import AcademyCourseScreen from './screens/AcademyCourseScreen';
import PrivacyPolicyScreen from './screens/PrivacyPolicyScreen';
import { SnackbarProvider } from 'notistack';
import { makeStyles } from '@material-ui/core/styles';
import { snackBarStyle, snackBarOptions } from './utils/styles';

const useStyles = makeStyles(snackBarStyle)

function App() {

  const classes = useStyles();

  return (
    <SnackbarProvider {...snackBarOptions(classes)}>
      <div className="app">
        <Header/>
        <main>
          <div className='container'>
            <Route path='/privacy-policy' component={PrivacyPolicyScreen}/>
            <Route path='/profile' component={ProfileScreen} />
            <Route path='/academy/:id' component={AcademyCourseScreen}/>
            <Route exact={true} path='/academy' component={AcademyScreen} />
            <Route exact={true} path='/' component={LandingScreen}/> 
          </div>
        </main> 
        <Footer/> 
      </div>    
    </SnackbarProvider>
  );
}

export default App;
