import { BrowserRouter, Route } from 'react-router-dom'
import Header from './components/Header'
import LandingScreen from './screens/LandingScreen'
import Footer from './components/Footer'
import AcademyScreen from './screens/AcademyScreen';
import AcademyInvestingScreen from './screens/AcademyInvestingScreen';

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Header/>
        <main>
          <div className='container'>
            <Route path='/academy/investing' component={AcademyInvestingScreen}/>
            <Route exact={true} path='/academy' component={AcademyScreen} />
            <Route exact={true} path='/'  component={LandingScreen}/>            
          </div>
        </main> 
        <Footer/> 
      </div>    
    </BrowserRouter>
  );
}

export default App;
