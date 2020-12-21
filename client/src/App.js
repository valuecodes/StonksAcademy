import { BrowserRouter, Route } from 'react-router-dom'
import Header from './components/Page/Header'
import LandingScreen from './screens/LandingScreen'
import Footer from './components/Page/Footer'
import AcademyScreen from './screens/AcademyScreen';
import ProfileScreen from './screens/ProfileScreen'
import AcademyCourseScreen from './screens/AcademyCourseScreen';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import PrivacyPolicyScreen from './screens/PrivacyPolicyScreen';

const theme = createMuiTheme({
  typography: {
    fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
    fontSize: 16,
    // display4: {
    //   fontSize: 13,
    // },
    // display3: {
    //   fontSize: 13,
    // },
    // display2: {
    //   fontSize: 13,
    // },
    // display1: {
    //   fontSize: 13,
    // },
    // headline: {
    //   fontSize: 13,
    // },
    // title: {
    //   fontSize: 13,
    // },
    // subheading: {
    //   fontSize: 13,
    // },
    // body2: {
    //   fontSize: 13,
    // },
    // body1: {
    //   fontSize: 13,
    // },
    // caption: {
    //   fontSize: 13,
    // },
    // button: {
    //   fontSize: 13,
    // },
  },
});

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
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
        </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
