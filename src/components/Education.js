import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser } from '../utils/userStorage';
import TopNav from './TopNav';
import Footer from './Footer';
import './Education.css';

function Education() {
  const navigate = useNavigate();
  const user = getCurrentUser();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('motivation');
  
  // Hide hero if user is logged in (accessing from dashboard)
  const isClientView = !!user;

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  const categories = {
    motivation: {
      name: 'Motivation & Psychology',
      papers: [
        { id: 'motivation-1', title: 'Autonomy-Supportive Coaching and Self-Determined Motivation', description: 'Investigates how coaching approaches that respect athlete autonomy foster intrinsic motivation and sustained engagement in sports.', url: '/NPO Research/Motivation/Autonomy-Supportive Coaching and Self-Determined Motivation in High School and College Athletes.pdf' },
        { id: 'motivation-2', title: 'Burnout and Psychological Needs in Athletes', description: 'Analyzes the relationship between unmet psychological needs for autonomy, competence, and relatedness and athlete burnout syndrome.', url: '/NPO Research/Motivation/Burnout and its Relations with Basic Psychological Needs and Motivation Among Athletes.pdf' },
        { id: 'motivation-3', title: 'Parental Involvement in Children\'s Active Lifestyle', description: 'Examines how different parenting styles and levels of involvement shape children\'s physical activity habits and long-term fitness engagement.', url: '/NPO Research/Motivation/Influence of parental involvement and parenting styles in children\'s active lifestyle.pdf' },
        { id: 'motivation-4', title: 'Intrinsic Motivation in Collegiate Athletes', description: 'Studies the sources and development of internal motivation in college athletes and its impact on performance and well-being.', url: '/NPO Research/Motivation/Intrinsic Motivation Collegiate Athletes.pdf' },
        { id: 'motivation-5', title: 'Motivation for Physical Activity in Young People', description: 'Identifies key motivational factors that drive youth participation in physical activity and strategies to sustain engagement.', url: '/NPO Research/Motivation/Motivation for Physical Activity in Young People.pdf' },
        { id: 'motivation-6', title: 'Parental Behavior and Motivation in Young Athletes', description: 'Explores how parental encouragement, pressure, and modeling behaviors influence young athletes\' motivation and competitive outcomes.', url: '/NPO Research/Motivation/Parental Behavior, Cognitive Appraisal, and Motivation in Young Athletes.pdf' },
        { id: 'motivation-7', title: 'Parental Correlates in Child and Adolescent Physical Activity', description: 'Identifies specific parental characteristics and behaviors that correlate with increased physical activity in children and teens.', url: '/NPO Research/Motivation/Parental correlates in child and adolescent physical activity.pdf' },
        { id: 'motivation-8', title: 'The Behavioral Neuroscience of Motivation', description: 'Explores the brain mechanisms and neurochemical systems underlying motivation, reward, and behavioral drive.', url: '/NPO Research/Motivation/The Behavioral Neuroscience of Motivation.pdf' },
        { id: 'motivation-9', title: 'Physical Activity and Academic Achievement', description: 'Demonstrates the positive correlation between regular physical activity and improved academic performance in students.', url: '/NPO Research/Motivation/The Importance of Physical Activity and Physical Education in the Prediction of Academic Achievement .pdf' },
        { id: 'motivation-10', title: 'Young Athletes\' Motivational Profiles', description: 'Categorizes different motivational patterns among young athletes and examines how these profiles affect performance and retention.', url: '/NPO Research/Motivation/Young Athletes\' Motivational Profiles.pdf' }
      ]
    },
    postpartum: {
      name: 'Postpartum & Women\'s Health',
      papers: [
        { id: 'postpartum-1', title: 'Physical Activity in Postpartum Women During COVID-19', description: 'Examines barriers and facilitators to postpartum exercise during pandemic lockdowns and social restrictions.', url: '/NPO Research/Postpartum/Factors influencing physical activity in postpartum women during the COVID-19 pandemic.pdf' },
        { id: 'postpartum-2', title: 'Group-Based Physical Activity Interventions for Postpartum Women', description: 'Evaluates the effectiveness of group exercise programs for postpartum recovery, mental health, and fitness restoration.', url: '/NPO Research/Postpartum/Group-based physical activity interventions for postpartum women with children aged 0–5 years old.pdf' },
        { id: 'postpartum-3', title: 'How To Lose Weight While Breastfeeding', description: 'Provides evidence-based guidelines for safe and effective weight loss during lactation without compromising milk supply.', url: '/NPO Research/Postpartum/How To Lose Weight While Breastfeeding.pdf' },
        { id: 'postpartum-4', title: 'Impact of Physical Activity on Quality of Life During Pregnancy', description: 'Shows how regular exercise during pregnancy improves physical fitness, mental health, and birth outcomes.', url: '/NPO Research/Postpartum/Impact of Physical Activity on Quality of Life During Pregnancy.pdf' },
        { id: 'postpartum-5', title: 'Barriers and Enablers of Physical Activity in Postpartum Women', description: 'Identifies obstacles like time constraints and childcare challenges, plus strategies that support postpartum exercise participation.', url: '/NPO Research/Postpartum/Perceived barriers and enablers of physical activity in postpartum women.pdf' },
        { id: 'postpartum-6', title: 'Physical Activity and Postpartum Well-Being', description: 'Demonstrates how exercise after childbirth reduces depression, anxiety, and improves overall physical and mental health.', url: '/NPO Research/Postpartum/Physical Activity and Postpartum Well-Being.pdf' },
        { id: 'postpartum-7', title: 'Postnatal Exercise Interventions', description: 'Reviews evidence-based exercise programs designed for safe postpartum recovery, core restoration, and fitness rebuilding.', url: '/NPO Research/Postpartum/Postnatal Exercise Interventions.pdf' },
        { id: 'postpartum-8', title: 'Pregnancy and Postpartum Physical Fitness', description: 'Tracks changes in cardiovascular fitness, strength, and endurance throughout pregnancy and the postpartum recovery period.', url: '/NPO Research/Postpartum/The effect of pregnancy and the duration of postpartum convalescence on the physical fitness of healthy women.pdf' }
      ]
    },
    proprioception: {
      name: 'Proprioception & Movement',
      papers: [
        { id: 'proprioception-1', title: 'Effects of Proprioceptive Training on Sports Performance', description: 'Demonstrates how targeted proprioceptive exercises enhance balance, coordination, and athletic performance across sports.', url: '/NPO Research/Proprioception/Effects of proprioceptive training on sports performance.pdf' },
        { id: 'proprioception-2', title: 'Making Sense of Proprioception', description: 'Explains the sensory systems and neural mechanisms that enable body awareness, spatial orientation, and movement control.', url: '/NPO Research/Proprioception/Making Sense of Proprioception.pdf' },
        { id: 'proprioception-3', title: 'Proprioception and Range of Motion in Children', description: 'Examines the relationship between proprioceptive ability and flexibility in children with varying mobility levels.', url: '/NPO Research/Proprioception/Proprioception and its relationship with range of motion in hypermobile and normal mobile children.pdf' },
        { id: 'proprioception-4', title: 'Proprioceptive Training for Motor Performance', description: 'Shows how proprioceptive exercises improve motor control, coordination, and reduce injury risk in athletic and clinical populations.', url: '/NPO Research/Proprioception/The Effectiveness of Proprioceptive Training for Improving Motor Performance and Motor Dysfunction.pdf' },
        { id: 'proprioception-5', title: 'Upper Extremity Proprioception in Aging and Stroke', description: 'Investigates proprioceptive changes with aging and evaluates rehabilitation strategies for stroke recovery and arm function.', url: '/NPO Research/Proprioception/Upper extremity proprioception in healthy aging and stroke populations, and the effects of therapist- and robot-based rehabilitation therapies on proprioceptive function.pdf' }
      ]
    },
    weightLoss: {
      name: 'Weight Loss & Body Composition',
      papers: [
        { id: 'weightloss-1', title: 'Parents\' Perspectives on Weight-Related Discussions', description: 'Explores how parents navigate conversations about weight and health with their children following obesity treatment.', url: '/NPO Research/Weight Loss/A balancing act: parents\' longitudinal perspectives of weight-related discussions with their children following obesity treatment.pdf' },
        { id: 'weightloss-2', title: 'Long-Term Weight Loss Maintenance Success', description: 'Identifies common characteristics, behaviors, and strategies of individuals who successfully maintain significant weight loss long-term.', url: '/NPO Research/Weight Loss/A descriptive study of individuals successful at long-term maintenance of substantial weight loss.pdf' },
        { id: 'weightloss-3', title: 'Behavioral Strategies for Long-Term Weight Loss', description: 'Outlines evidence-based behavioral and psychological approaches used by successful weight loss maintainers in structured programs.', url: '/NPO Research/Weight Loss/Behavioral and Psychological Strategies of Long-Term Weight Loss Maintainers in a Widely Available Weight Management Program.pdf' },
        { id: 'weightloss-4', title: 'Parenting Effects on Children\'s Eating and Weight', description: 'Analyzes how parenting styles, feeding practices, and modeling influence children\'s dietary habits and body weight outcomes.', url: '/NPO Research/Weight Loss/Does parenting affect children\'s eating and weight status?.pdf' },
        { id: 'weightloss-5', title: 'Long-Term Sustainability of Appetite Changes', description: 'Investigates whether appetite adaptations and hunger regulation changes persist after significant weight loss.', url: '/NPO Research/Weight Loss/Investigation of the long-term sustainability of changes in appetite after weight loss.pdf' },
        { id: 'weightloss-6', title: 'Parents\' Experiences Facilitating Healthy Lifestyles', description: 'Documents parental experiences, challenges, and strategies in supporting healthy living for children with severe obesity.', url: '/NPO Research/Weight Loss/It\'s been a lifelong thing for me\': parents\' experiences of facilitating a healthy lifestyle for their children with severe obesity.pdf' },
        { id: 'weightloss-7', title: 'Long-Term Weight Loss Maintenance Without Surgery', description: 'Examines non-surgical approaches and lifestyle interventions for achieving and maintaining significant weight loss in adults.', url: '/NPO Research/Weight Loss/Long term maintenance of weight loss with non-surgical interventions in obese adults.pdf' },
        { id: 'weightloss-8', title: 'Long-Term Weight Loss Maintenance', description: 'Reviews critical factors, behavioral strategies, and lifestyle modifications essential for sustaining weight loss over years.', url: '/NPO Research/Weight Loss/Long-term weight loss maintenance.pdf' },
        { id: 'weightloss-9', title: 'Parent Involvement in Adolescent Obesity Treatment', description: 'Demonstrates the importance of parental participation and support in adolescent weight management program success.', url: '/NPO Research/Weight Loss/Parent Involvement in Adolescent Obesity Treatment.pdf' },
        { id: 'weightloss-10', title: 'Parental Influence on Adolescent Diet and Obesity', description: 'Examines the pathways through which parental behaviors, attitudes, and modeling shape adolescent nutrition and weight.', url: '/NPO Research/Weight Loss/Pathways of parental influence on adolescent diet and obesity.pdf' },
        { id: 'weightloss-11', title: 'Predictors of Successful Long-Term Weight Loss', description: 'Identifies key psychological, behavioral, and lifestyle factors that predict successful long-term weight loss maintenance.', url: '/NPO Research/Weight Loss/Predictors of successful long-term weight loss maintenance.pdf' },
        { id: 'weightloss-12', title: 'Parental Involvement in Obesity Prevention and Management', description: 'Highlights the critical role of parents in preventing childhood obesity and supporting effective weight management interventions.', url: '/NPO Research/Weight Loss/The Impact of Parental Involvement in the Prevention and Management of Obesity in Children.pdf' }
      ]
    }
  };

  return (
    <>
      <TopNav />
      <button className="back-to-dashboard-btn" onClick={() => navigate('/dashboard')}>
        ← Back to Dashboard
      </button>
      <div className="education-page">
        {!isClientView && (
          <section className="education-hero">
            <h2 className="education-hero-subtitle">EDUCATION</h2>
            <h1 className="education-hero-title">Fitness & Nutrition Science</h1>
            <p className="education-hero-description">Learn the science behind effective training and nutrition</p>
          </section>
        )}

        <section className="education-read-learn">
          <div className="research-categories-tabs">
            <div className="read-learn-header">
              <h2>Read & Learn</h2>
              <p>Explore peer-reviewed research and evidence-based insights to deepen your understanding of fitness, nutrition, and wellness. Our curated collection of scientific papers covers key topics in exercise science, behavioral psychology, and health optimization. Whether you're looking to understand the science behind training principles, nutrition strategies, or the psychology of sustainable lifestyle change, you'll find comprehensive resources here.</p>
            </div>

            <div className="category-tabs">
              {Object.entries(categories).map(([key, category]) => (
                <button
                    key={key}
                    className={`category-tab ${selectedCategory === key ? 'active' : ''}`}
                    onClick={() => setSelectedCategory(key)}
                  >
                    {category.name}
                  </button>
                ))}
              </div>

              <div className="research-papers-container">
                {categories[selectedCategory].papers.map((paper) => (
                  <a
                    key={paper.id}
                    href={paper.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="research-paper-item"
                  >
                    <div className="paper-header">
                      <span className="paper-title">{paper.title}</span>
                      <span className="paper-type">📄</span>
                    </div>
                    <span className="paper-description">{paper.description}</span>
                  </a>
                ))}
              </div>
            </div>
          </section>

        <div className="education-container">
          <section className="education-coming-soon">
            <div className="coming-soon-wrapper">
              <div className="coming-soon-left">
                <p className="coming-soon-label">Get Notified</p>
                <h2>When We Launch</h2>
                <form className="coming-soon-form" onSubmit={handleSubscribe}>
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <button type="submit">Notify Me</button>
                </form>
                {subscribed && <p className="subscribe-success">✓ Thanks for subscribing!</p>}
                <p className="coming-soon-disclaimer">*Don't worry we will not spam you</p>
              </div>

              <div className="coming-soon-features">
                <div className="feature-item">
                  <h4>Expert-Led Courses</h4>
                  <p>Learn from certified fitness and nutrition professionals</p>
                </div>
                <div className="feature-item">
                  <h4>Video Tutorials</h4>
                  <p>Step-by-step guidance on training principles and nutrition</p>
                </div>
                <div className="feature-item">
                  <h4>Live Classes</h4>
                  <p>Interactive sessions with Q&A and community support</p>
                </div>
                <div className="feature-item">
                  <h4>Certification Programs</h4>
                  <p>Become a certified fitness and nutrition coach</p>
                </div>
              </div>
            </div>
          </section>

          <section className="education-instructor">
            <div className="instructor-content">
              <h2>Interested in Teaching?</h2>
              <p>We're looking for passionate fitness and nutrition experts to share their knowledge with our community. If you'd like to create a course or share your expertise, we'd love to hear from you.</p>
              
              <div className="instructor-buttons">
                <a href="/contact" className="btn-instructor">Get in Touch</a>
                <a href="/contact" className="btn-instructor-secondary">Apply as Instructor</a>
              </div>
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Education;
