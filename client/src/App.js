import { BrowserRouter, Route } from 'react-router-dom'
import Header from './components/Header'
import LandingScreen from './screens/LandingScreen'
import Footer from './components/Footer'
import AcademyScreen from './screens/AcademyScreen';

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Header/>
        <main>
          <div className='container'>
            <Route path='/academy' component={AcademyScreen} />
            <Route path='/' exact={true} component={LandingScreen}/>            
          </div>
        </main> 
        <Footer/> 
      </div>    
    </BrowserRouter>
  );
}

export default App;
