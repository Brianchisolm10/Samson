import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import './styles/global-polish.css';
import Hero from './components/Hero';
import CTA from './components/CTA';
import Footer from './components/Footer';
import HubPage from './components/HubPage';
import WorkoutInfo from './components/WorkoutInfo';
import MealInfo from './components/MealInfo';
import WorkoutDemo from './components/WorkoutDemo';
import MealPlanDemo from './components/MealPlanDemo';
import AdminFoodManager from './components/AdminFoodManager';
import AdminDashboard from './components/AdminDashboard';
import FoodLibraryManager from './components/FoodLibraryManager';
import ExerciseLibraryManager from './components/ExerciseLibraryManager';
import Signup from './components/Signup';
import Login from './components/Login';
import Profile from './components/Profile';
import Schedule from './components/Schedule';
import Contact from './components/Contact';
import HelpTopics from './components/HelpTopics';
import SendFeedback from './components/SendFeedback';
import FrequentlyAsked from './components/FrequentlyAsked';
import Education from './components/Education';
import Community from './components/Community';
import Resources from './components/Resources';
import ResourceDetail from './components/ResourceDetail';
import Shop from './components/Shop';
import Accessible from './components/Accessible';
import WhyAfya from './components/WhyAfya';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsOfService from './components/TermsOfService';
import AccessibilityStatement from './components/AccessibilityStatement';
import ClientDashboard from './components/ClientDashboard';
import Blog from './components/Blog';
import Careers from './components/Careers';

function HomePage() {
  const [activeModal, setActiveModal] = useState(null);

  const handleToolClick = (tool) => {
    setActiveModal(tool);
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  return (
    <div className="App">
      <Hero onToolClick={handleToolClick} />
      <CTA onToolClick={handleToolClick} />
      <Footer />
      
      {activeModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>×</button>
            <h2>{activeModal === 'workout' ? 'Workout Program Generator' : 'Meal Plan Creator'}</h2>
            <p>Loading {activeModal === 'workout' ? 'workout' : 'meal plan'} tool...</p>
          </div>
        </div>
      )}
    </div>
  );
}

function App() {
  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/hub" element={<HubPage />} />
        <Route path="/workout-info" element={<WorkoutInfo />} />
        <Route path="/meal-info" element={<MealInfo />} />
        <Route path="/workout-generator" element={<WorkoutDemo />} />
        <Route path="/meal-plan-generator" element={<MealPlanDemo />} />
        <Route path="/admin/food-manager" element={<AdminFoodManager />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/food-library" element={<FoodLibraryManager />} />
        <Route path="/admin/exercise-library" element={<ExerciseLibraryManager />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<ClientDashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/help/topics" element={<HelpTopics />} />
        <Route path="/help/feedback" element={<SendFeedback />} />
        <Route path="/help/faq" element={<FrequentlyAsked />} />
        <Route path="/education" element={<Education />} />
        <Route path="/community" element={<Community />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/resources/:id" element={<ResourceDetail />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/accessible" element={<Accessible />} />
        <Route path="/why-afya" element={<WhyAfya />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsOfService />} />
        <Route path="/accessibility" element={<AccessibilityStatement />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/careers" element={<Careers />} />
      </Routes>
    </Router>
  );
}

export default App;
