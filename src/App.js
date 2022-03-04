import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import Navbar from './components/Navbar'
import News from './components/News'

export default class App extends Component {
  render() {
    return (
      <Router>
      <Navbar />
      <Routes>
          <Route exact path="/" element={<News key="general" country='us' category='general' />} />
          <Route exact path="/science" element={<News key="science" country='us' category='science' />} />
          <Route exact path="/sports" element={<News key="sports" country='us' category='sports' />} />
          <Route exact path="/technology" element={<News key="technology" country='us' category='technology' />} />
          <Route exact path="/health" element={<News key="health" country='us' category='health' />} />
          <Route exact path="/entertainment" element={<News key="entertainment" country='us' category='entertainment' />} />
          <Route exact path="/business" element={<News key="business" country='us' category='business' />} />
          <Route exact path="/general" element={<News key="general" country='us' category='general' />} />
              
      </Routes>
        
    
      </Router>
    )
  }
}

