import { BrowserRouter, Route } from 'react-router-dom'
import Header from './components/Header'
import LandingScreen from './screens/LandingScreen'
import Footer from './components/Footer'

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Header/>
        <main>
          <Route path='/' exact={true} component={LandingScreen}/>
        </main> 
        <Footer/> 
      </div>    
    </BrowserRouter>
  );
}

export default App;
