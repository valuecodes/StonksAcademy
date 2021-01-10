import React,{ useRef } from 'react'
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
import { snackBarStyle, snackBarOptions } from './utils/snackbar';
import DisclaimerScreen from './screens/DisclaimerScreen'
import TermsOfServiceScreen from './screens/TermsOfServiceScreen'
import ContactScreen from './screens/ContactScreen'
import PlaygroundScreen from './screens/PlaygroundScreen'
import PlaygroundSectionScreen from './screens/PlaygroundSectionScreen'

const useStyles = makeStyles(snackBarStyle)

function App() {

  const notistackRef = useRef();
  const classes = useStyles();

  return (
    <SnackbarProvider ref={notistackRef} {...snackBarOptions(classes,notistackRef)}>
      <div className="app">
        <Header/>
        <main>
          <div className='container'>
            <Route path='/contact' component={ContactScreen}/>
            <Route path='/terms-of-service' component={TermsOfServiceScreen}/>
            <Route path='/disclaimer' component={DisclaimerScreen}/>
            <Route path='/privacy-policy' component={PrivacyPolicyScreen}/>
            <Route path='/profile' component={ProfileScreen} />
            <Route exact={true} path='/playground/:id' component={PlaygroundSectionScreen}/>
            <Route exact={true} path='/playground' component={PlaygroundScreen}/>
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
