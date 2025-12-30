import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import TopNav from './TopNav';
import Footer from './Footer';
import './ResourceDetail.css';

function ResourceDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const resourceContent = {
    2: {
      title: 'Strength Training Fundamentals',
      category: 'Training',
      type: 'Education',
      icon: '💪',
      description: 'Learn frequency, intensity, rest periods, and progressive overload principles',
      content: `
        <h2>Strength Training Fundamentals</h2>
        <p>Strength training is one of the most effective ways to build muscle, increase bone density, and improve overall fitness. This guide covers the essential principles you need to know.</p>
        
        <h3>Key Principles</h3>
        <ul>
          <li><strong>Progressive Overload:</strong> Gradually increasing the demands on your muscles to continue making progress</li>
          <li><strong>Frequency:</strong> Training each muscle group 2-3 times per week for optimal results</li>
          <li><strong>Intensity:</strong> Working at 70-85% of your maximum effort for strength gains</li>
          <li><strong>Rest Periods:</strong> 2-3 minutes between heavy compound lifts, 60-90 seconds for isolation exercises</li>
          <li><strong>Recovery:</strong> Adequate sleep and nutrition are crucial for muscle growth</li>
        </ul>

        <h3>Training Frequency</h3>
        <p>Most research suggests training each muscle group 2-3 times per week provides optimal results for strength development. This allows for adequate recovery while maintaining consistent stimulus.</p>

        <h3>Exercise Selection</h3>
        <p>Focus on compound movements that work multiple muscle groups: squats, deadlifts, bench press, rows, and overhead press. These movements are more efficient and effective than isolation exercises alone.</p>

        <h3>Progressive Overload Strategies</h3>
        <ul>
          <li>Increase weight lifted</li>
          <li>Add more repetitions</li>
          <li>Reduce rest periods</li>
          <li>Improve exercise form and range of motion</li>
          <li>Add more sets or exercises</li>
        </ul>

        <h3>Recovery and Nutrition</h3>
        <p>Strength gains happen during recovery, not during the workout. Ensure you're getting 7-9 hours of sleep and consuming adequate protein (0.7-1g per pound of body weight).</p>
      `
    },
    3: {
      title: 'Cardiovascular Fitness & Endurance',
      category: 'Training',
      type: 'Guide',
      icon: '❤️',
      description: 'Understanding aerobic capacity, energy systems, and conditioning',
      content: `
        <h2>Cardiovascular Fitness & Endurance</h2>
        <p>Cardiovascular fitness is your body's ability to deliver oxygen to muscles during sustained activity. Building endurance improves heart health, increases energy, and enhances overall fitness.</p>
        
        <h3>Energy Systems</h3>
        <p>Your body uses different energy systems depending on exercise duration and intensity:</p>
        <ul>
          <li><strong>Phosphocreatine System (0-10 seconds):</strong> Used for explosive movements</li>
          <li><strong>Anaerobic System (10 seconds - 2 minutes):</strong> High-intensity efforts</li>
          <li><strong>Aerobic System (2+ minutes):</strong> Sustained, moderate-intensity activity</li>
        </ul>

        <h3>Building Aerobic Capacity</h3>
        <p>Aerobic capacity (VO2 max) is the maximum amount of oxygen your body can utilize. It improves through consistent cardio training at moderate to high intensities.</p>

        <h3>Types of Cardio Training</h3>
        <ul>
          <li><strong>Steady-State Cardio:</strong> Consistent pace for 20-60 minutes</li>
          <li><strong>Interval Training:</strong> Alternating high and low intensity periods</li>
          <li><strong>HIIT:</strong> Short bursts of maximum effort followed by recovery</li>
          <li><strong>Fartlek Training:</strong> Unstructured speed play</li>
        </ul>

        <h3>Recommended Guidelines</h3>
        <p>The CDC recommends 150 minutes of moderate-intensity aerobic activity or 75 minutes of vigorous-intensity activity per week for adults.</p>
      `
    },
    4: {
      title: 'Flexibility & Mobility Essentials',
      category: 'Training',
      type: 'Education',
      icon: '🧘',
      description: 'Warm-ups, stretching protocols, and mobility work for all fitness levels',
      content: `
        <h2>Flexibility & Mobility Essentials</h2>
        <p>Flexibility and mobility are often confused but are distinct qualities. Flexibility is your muscle's ability to lengthen, while mobility is your joint's ability to move through its full range of motion.</p>
        
        <h3>Why Mobility Matters</h3>
        <ul>
          <li>Improves exercise performance</li>
          <li>Reduces injury risk</li>
          <li>Decreases muscle soreness</li>
          <li>Enhances recovery</li>
          <li>Improves posture and daily function</li>
        </ul>

        <h3>Warm-Up Protocol</h3>
        <p>A proper warm-up prepares your body for exercise and increases performance:</p>
        <ul>
          <li>5-10 minutes of light cardio to increase heart rate</li>
          <li>Dynamic stretches and mobility drills</li>
          <li>Movement-specific warm-up sets</li>
        </ul>

        <h3>Stretching Types</h3>
        <ul>
          <li><strong>Dynamic Stretching:</strong> Moving stretches before workouts</li>
          <li><strong>Static Stretching:</strong> Held stretches after workouts</li>
          <li><strong>PNF Stretching:</strong> Advanced technique for deeper stretches</li>
        </ul>

        <h3>Mobility Work</h3>
        <p>Incorporate mobility drills 3-4 times per week. Focus on areas that feel tight or restricted. Common problem areas include hips, shoulders, and thoracic spine.</p>
      `
    },
    5: {
      title: 'Injury Prevention Principles',
      category: 'Training',
      type: 'Guide',
      icon: '🛡️',
      description: 'Evidence-based strategies to prevent common fitness injuries',
      content: `
        <h2>Injury Prevention Principles</h2>
        <p>Preventing injuries is crucial for long-term fitness success. Most injuries result from poor form, inadequate recovery, or progressing too quickly.</p>
        
        <h3>Core Prevention Strategies</h3>
        <ul>
          <li><strong>Proper Form:</strong> Quality over quantity always</li>
          <li><strong>Progressive Overload:</strong> Increase demands gradually</li>
          <li><strong>Adequate Recovery:</strong> Rest days and sleep are essential</li>
          <li><strong>Warm-Up Properly:</strong> Prepare your body before intense activity</li>
          <li><strong>Listen to Your Body:</strong> Pain is a signal to modify or rest</li>
        </ul>

        <h3>Common Injuries and Prevention</h3>
        <ul>
          <li><strong>Lower Back Pain:</strong> Strengthen core, maintain proper posture</li>
          <li><strong>Knee Pain:</strong> Strengthen glutes and quads, avoid excessive volume</li>
          <li><strong>Shoulder Issues:</strong> Maintain shoulder mobility, balance pushing and pulling</li>
          <li><strong>Tendinitis:</strong> Avoid sudden increases in volume or intensity</li>
        </ul>

        <h3>Recovery Essentials</h3>
        <p>Recovery is when your body adapts and gets stronger. Prioritize sleep, nutrition, hydration, and active recovery days.</p>

        <h3>When to Seek Help</h3>
        <p>If pain persists beyond 2 weeks or significantly limits your activity, consult a healthcare professional or physical therapist.</p>
      `
    },
    7: {
      title: 'Macronutrients Explained',
      category: 'Nutrition',
      type: 'Education',
      icon: '🥗',
      description: 'Deep dive into proteins, carbohydrates, fats, and their roles in fitness',
      content: `
        <h2>Macronutrients Explained</h2>
        <p>Macronutrients are the three main nutrients your body needs in large quantities: protein, carbohydrates, and fats. Each plays a crucial role in fitness and health.</p>
        
        <h3>Protein</h3>
        <ul>
          <li><strong>Role:</strong> Builds and repairs muscle tissue</li>
          <li><strong>Recommendation:</strong> 0.7-1g per pound of body weight for active individuals</li>
          <li><strong>Sources:</strong> Chicken, fish, eggs, dairy, legumes, tofu</li>
          <li><strong>Timing:</strong> Distribute throughout the day for optimal muscle protein synthesis</li>
        </ul>

        <h3>Carbohydrates</h3>
        <ul>
          <li><strong>Role:</strong> Primary energy source for workouts</li>
          <li><strong>Types:</strong> Simple (quick energy) and complex (sustained energy)</li>
          <li><strong>Recommendation:</strong> 3-7g per pound of body weight depending on activity level</li>
          <li><strong>Sources:</strong> Oats, rice, potatoes, fruits, vegetables, whole grains</li>
        </ul>

        <h3>Fats</h3>
        <ul>
          <li><strong>Role:</strong> Hormone production, nutrient absorption, energy</li>
          <li><strong>Recommendation:</strong> 0.3-0.5g per pound of body weight</li>
          <li><strong>Focus on:</strong> Unsaturated fats (olive oil, nuts, avocados)</li>
          <li><strong>Limit:</strong> Saturated and trans fats</li>
        </ul>

        <h3>Macronutrient Ratios</h3>
        <p>A common approach is 40% carbs, 30% protein, 30% fat, but individual needs vary based on goals and activity level.</p>
      `
    },
    9: {
      title: 'Hydration & Performance',
      category: 'Nutrition',
      type: 'Guide',
      icon: '💧',
      description: 'Electrolytes, fluid intake, and hydration strategies for athletes',
      content: `
        <h2>Hydration & Performance</h2>
        <p>Proper hydration is critical for athletic performance, recovery, and overall health. Even mild dehydration can impair performance and increase injury risk.</p>
        
        <h3>Hydration Guidelines</h3>
        <ul>
          <li><strong>Daily Intake:</strong> Half your body weight in ounces (e.g., 150 lbs = 75 oz)</li>
          <li><strong>During Exercise:</strong> 7-10 oz every 10-20 minutes</li>
          <li><strong>Post-Exercise:</strong> 16-24 oz for every pound lost during exercise</li>
        </ul>

        <h3>Electrolytes</h3>
        <p>Electrolytes (sodium, potassium, magnesium) help maintain fluid balance and muscle function. They're especially important during intense or prolonged exercise.</p>
        <ul>
          <li><strong>Sodium:</strong> Helps retain fluids and maintain performance</li>
          <li><strong>Potassium:</strong> Supports muscle function and recovery</li>
          <li><strong>Magnesium:</strong> Aids muscle relaxation and energy production</li>
        </ul>

        <h3>Hydration Strategies</h3>
        <ul>
          <li>Drink consistently throughout the day</li>
          <li>Monitor urine color (pale yellow is ideal)</li>
          <li>Increase intake in hot weather or during intense training</li>
          <li>Use electrolyte drinks for exercise lasting over 60 minutes</li>
        </ul>

        <h3>Signs of Dehydration</h3>
        <p>Thirst, dark urine, fatigue, dizziness, and decreased performance are signs you need more fluids.</p>
      `
    },
    11: {
      title: 'Stress Management Techniques',
      category: 'Recovery',
      type: 'Education',
      icon: '🧠',
      description: 'Evidence-based strategies for managing stress and supporting recovery',
      content: `
        <h2>Stress Management Techniques</h2>
        <p>Chronic stress impairs recovery, increases injury risk, and hinders fitness progress. Effective stress management is essential for optimal health and performance.</p>
        
        <h3>Impact of Stress on Fitness</h3>
        <ul>
          <li>Increases cortisol levels, which can promote fat storage</li>
          <li>Impairs muscle recovery and growth</li>
          <li>Weakens immune system</li>
          <li>Disrupts sleep quality</li>
          <li>Increases injury risk</li>
        </ul>

        <h3>Stress Management Strategies</h3>
        <ul>
          <li><strong>Meditation:</strong> 10-20 minutes daily reduces stress and improves focus</li>
          <li><strong>Deep Breathing:</strong> Box breathing (4-4-4-4) activates parasympathetic nervous system</li>
          <li><strong>Exercise:</strong> Physical activity is one of the best stress relievers</li>
          <li><strong>Sleep:</strong> Prioritize 7-9 hours nightly</li>
          <li><strong>Social Connection:</strong> Time with friends and family reduces stress</li>
        </ul>

        <h3>Recovery Practices</h3>
        <ul>
          <li>Yoga or stretching</li>
          <li>Massage or foam rolling</li>
          <li>Sauna or cold plunge</li>
          <li>Journaling</li>
          <li>Time in nature</li>
        </ul>

        <h3>When to Seek Help</h3>
        <p>If stress feels overwhelming, consider speaking with a mental health professional or counselor.</p>
      `
    },
    12: {
      title: 'Active Recovery Methods',
      category: 'Recovery',
      type: 'Guide',
      icon: '🔄',
      description: 'Light movement, foam rolling, and recovery protocols between workouts',
      content: `
        <h2>Active Recovery Methods</h2>
        <p>Active recovery involves light movement on rest days to promote blood flow and recovery without adding significant training stress.</p>
        
        <h3>Benefits of Active Recovery</h3>
        <ul>
          <li>Increases blood flow to muscles</li>
          <li>Reduces muscle soreness</li>
          <li>Improves flexibility and mobility</li>
          <li>Enhances overall recovery</li>
          <li>Maintains fitness during deload weeks</li>
        </ul>

        <h3>Active Recovery Activities</h3>
        <ul>
          <li><strong>Walking:</strong> 20-30 minutes at easy pace</li>
          <li><strong>Swimming:</strong> Low-impact full-body movement</li>
          <li><strong>Cycling:</strong> Easy, conversational pace</li>
          <li><strong>Yoga:</strong> Improves mobility and reduces stress</li>
          <li><strong>Light Stretching:</strong> 10-15 minutes</li>
        </ul>

        <h3>Foam Rolling</h3>
        <p>Foam rolling helps release muscle tension and improve mobility. Spend 30-60 seconds on each muscle group, avoiding rolling directly on joints or bones.</p>

        <h3>Recovery Protocol</h3>
        <ul>
          <li>1-2 active recovery days per week</li>
          <li>Keep intensity at 40-50% of max effort</li>
          <li>Focus on areas that feel tight or sore</li>
          <li>Combine with proper nutrition and sleep</li>
        </ul>
      `
    },
    14: {
      title: 'Habit Formation & Motivation',
      category: 'Mental Wellness',
      type: 'Education',
      icon: '🎯',
      description: 'Behavioral science principles for building lasting fitness habits',
      content: `
        <h2>Habit Formation & Motivation</h2>
        <p>Building lasting fitness habits is more important than short-term motivation. Understanding habit formation helps you create sustainable lifestyle changes.</p>
        
        <h3>The Habit Loop</h3>
        <p>Every habit consists of three parts:</p>
        <ul>
          <li><strong>Cue:</strong> The trigger that initiates the behavior</li>
          <li><strong>Routine:</strong> The behavior itself</li>
          <li><strong>Reward:</strong> The benefit you receive</li>
        </ul>

        <h3>Building New Habits</h3>
        <ul>
          <li><strong>Start Small:</strong> Begin with 5-10 minute workouts</li>
          <li><strong>Stack Habits:</strong> Attach new habits to existing ones</li>
          <li><strong>Track Progress:</strong> Use a calendar or app to mark completed days</li>
          <li><strong>Find Your Why:</strong> Connect to deeper motivations</li>
          <li><strong>Be Consistent:</strong> Same time and place builds automaticity</li>
        </ul>

        <h3>Overcoming Motivation Dips</h3>
        <ul>
          <li>Remember your initial goals and reasons</li>
          <li>Track progress visually (photos, measurements)</li>
          <li>Find a workout buddy or community</li>
          <li>Vary your routine to prevent boredom</li>
          <li>Focus on how exercise makes you feel</li>
        </ul>

        <h3>The 66-Day Rule</h3>
        <p>Research suggests it takes an average of 66 days for a behavior to become automatic. Stay consistent through this period and habits become easier.</p>
      `
    },
    15: {
      title: 'Youth & Adolescent Fitness',
      category: 'Special Populations',
      type: 'Guide',
      icon: '👶',
      description: 'Age-appropriate training and development principles for young athletes',
      content: `
        <h2>Youth & Adolescent Fitness</h2>
        <p>Young athletes have unique needs and considerations. Proper training during youth years builds a foundation for lifelong fitness and prevents injury.</p>
        
        <h3>Age-Appropriate Guidelines</h3>
        <ul>
          <li><strong>Ages 6-12:</strong> Focus on movement variety, coordination, and fun</li>
          <li><strong>Ages 13-18:</strong> Can begin structured training with proper form emphasis</li>
          <li><strong>All Ages:</strong> Prioritize technique over intensity</li>
        </ul>

        <h3>Training Principles for Youth</h3>
        <ul>
          <li>Emphasize proper form and technique</li>
          <li>Use bodyweight and light resistance</li>
          <li>Include variety and fun activities</li>
          <li>Limit heavy lifting until skeletal maturity</li>
          <li>Ensure adequate recovery and sleep</li>
        </ul>

        <h3>Recommended Activities</h3>
        <ul>
          <li>Sports and recreational activities</li>
          <li>Bodyweight exercises</li>
          <li>Flexibility and mobility work</li>
          <li>Cardiovascular activities</li>
          <li>Coordination and balance drills</li>
        </ul>

        <h3>Injury Prevention</h3>
        <p>Overuse injuries are common in young athletes. Limit specialization to one sport, ensure adequate rest, and emphasize proper technique.</p>

        <h3>Nutrition for Young Athletes</h3>
        <p>Young athletes need adequate calories, protein, and nutrients to support growth and training. Encourage whole foods and proper hydration.</p>
      `
    },
    16: {
      title: 'Fitness for Older Adults',
      category: 'Special Populations',
      type: 'Guide',
      icon: '👴',
      description: 'Safe, effective training strategies for maintaining strength and mobility',
      content: `
        <h2>Fitness for Older Adults</h2>
        <p>Regular exercise is crucial for maintaining independence, strength, and quality of life as we age. Older adults can safely and effectively improve fitness at any age.</p>
        
        <h3>Benefits of Exercise for Older Adults</h3>
        <ul>
          <li>Maintains muscle mass and strength</li>
          <li>Improves balance and reduces fall risk</li>
          <li>Supports bone health</li>
          <li>Enhances cardiovascular health</li>
          <li>Improves cognitive function</li>
          <li>Supports mental health and independence</li>
        </ul>

        <h3>Recommended Exercise Guidelines</h3>
        <ul>
          <li><strong>Aerobic Activity:</strong> 150 minutes moderate or 75 minutes vigorous per week</li>
          <li><strong>Strength Training:</strong> 2+ days per week</li>
          <li><strong>Balance Training:</strong> 3+ days per week</li>
          <li><strong>Flexibility:</strong> Daily stretching</li>
        </ul>

        <h3>Safe Training Principles</h3>
        <ul>
          <li>Start slowly and progress gradually</li>
          <li>Emphasize proper form and control</li>
          <li>Include warm-up and cool-down</li>
          <li>Listen to your body and modify as needed</li>
          <li>Consult healthcare provider before starting new program</li>
        </ul>

        <h3>Modifications for Common Conditions</h3>
        <p>Arthritis, osteoporosis, and other conditions may require modifications. Work with a qualified trainer or physical therapist for personalized guidance.</p>
      `
    },
    24: {
      title: 'Menstrual Cycle & Training',
      category: 'Women\'s Health',
      type: 'Education',
      description: 'How to optimize training and nutrition throughout your menstrual cycle',
      content: `
        <h2>Menstrual Cycle & Training</h2>
        <p>Understanding your menstrual cycle can help you optimize training intensity, nutrition, and recovery. The cycle has distinct phases with different hormonal profiles that affect performance and recovery.</p>
        
        <h3>The Four Phases</h3>
        <ul>
          <li><strong>Menstruation (Days 1-5):</strong> Lowest estrogen and progesterone. May experience fatigue, cramping, and reduced performance. Focus on lighter training and recovery.</li>
          <li><strong>Follicular Phase (Days 1-13):</strong> Rising estrogen. Increased energy, strength, and endurance. Ideal for high-intensity training and building strength.</li>
          <li><strong>Ovulation (Days 14-16):</strong> Peak estrogen and LH surge. Peak performance window. Best time for intense workouts and testing limits.</li>
          <li><strong>Luteal Phase (Days 17-28):</strong> Rising progesterone. May feel more fatigued, need more calories, and prefer lower intensity. Focus on strength maintenance and recovery.</li>
        </ul>

        <h3>Training Recommendations by Phase</h3>
        <ul>
          <li><strong>Menstrual:</strong> Light cardio, yoga, stretching, mobility work</li>
          <li><strong>Follicular:</strong> High-intensity intervals, strength training, new challenges</li>
          <li><strong>Ovulation:</strong> Peak performance activities, testing, competitions</li>
          <li><strong>Luteal:</strong> Moderate intensity, strength maintenance, flexibility work</li>
        </ul>

        <h3>Nutrition Adjustments</h3>
        <ul>
          <li><strong>Follicular Phase:</strong> Standard caloric intake, focus on carbs for energy</li>
          <li><strong>Luteal Phase:</strong> Increase calories by 100-300, increase protein and healthy fats</li>
          <li><strong>Throughout:</strong> Stay hydrated, maintain consistent micronutrient intake</li>
        </ul>

        <h3>Important Notes</h3>
        <p>Every woman's cycle is different. Track your own patterns to identify what works best for you. Hormonal birth control affects these patterns differently for each person. Listen to your body and adjust as needed.</p>
      `
    },
    25: {
      title: 'Pregnancy & Postpartum Fitness',
      category: 'Women\'s Health',
      type: 'Guide',
      description: 'Safe exercise guidelines during pregnancy and postpartum recovery',
      content: `
        <h2>Pregnancy & Postpartum Fitness</h2>
        <p>Exercise during pregnancy and postpartum is beneficial for both mother and baby when done safely. Always consult with your healthcare provider before starting or continuing an exercise program.</p>
        
        <h3>Benefits of Exercise During Pregnancy</h3>
        <ul>
          <li>Reduces gestational diabetes risk</li>
          <li>Improves cardiovascular health</li>
          <li>Helps manage weight gain</li>
          <li>Reduces back pain and pelvic pain</li>
          <li>Improves mood and mental health</li>
          <li>May reduce labor complications</li>
          <li>Improves recovery postpartum</li>
        </ul>

        <h3>Pregnancy Exercise Guidelines</h3>
        <ul>
          <li><strong>Frequency:</strong> 150 minutes of moderate-intensity activity per week</li>
          <li><strong>Types:</strong> Walking, swimming, stationary cycling, modified strength training</li>
          <li><strong>Avoid:</strong> Contact sports, activities with fall risk, exercises lying flat after first trimester</li>
          <li><strong>Intensity:</strong> Should be able to talk during exercise (talk test)</li>
          <li><strong>Modifications:</strong> Reduce intensity as pregnancy progresses</li>
        </ul>

        <h3>Postpartum Recovery Timeline</h3>
        <ul>
          <li><strong>Weeks 0-6:</strong> Focus on rest, pelvic floor recovery, gentle walking</li>
          <li><strong>Weeks 6-12:</strong> Gradual return to exercise with medical clearance, pelvic floor strengthening</li>
          <li><strong>3+ Months:</strong> Progressive return to pre-pregnancy activities</li>
        </ul>

        <h3>Postpartum Exercise Considerations</h3>
        <ul>
          <li>Get clearance from healthcare provider (typically 6 weeks vaginal, 8 weeks cesarean)</li>
          <li>Address diastasis recti (abdominal separation) before intense core work</li>
          <li>Pelvic floor rehabilitation is crucial</li>
          <li>Breastfeeding may affect hydration and caloric needs</li>
          <li>Sleep deprivation affects recovery - adjust intensity accordingly</li>
        </ul>

        <h3>Red Flags - Stop Exercise and Seek Medical Help</h3>
        <ul>
          <li>Vaginal bleeding or fluid leakage</li>
          <li>Chest pain or shortness of breath</li>
          <li>Dizziness or fainting</li>
          <li>Severe abdominal or pelvic pain</li>
          <li>Contractions or cramping</li>
        </ul>
      `
    },
    26: {
      title: 'Pelvic Floor Health',
      category: 'Women\'s Health',
      type: 'Education',
      description: 'Understanding pelvic floor function, exercises, and common issues',
      content: `
        <h2>Pelvic Floor Health</h2>
        <p>The pelvic floor is a group of muscles that support the bladder, uterus, and bowel. Strong, flexible pelvic floor muscles are essential for continence, sexual function, and core stability.</p>
        
        <h3>What the Pelvic Floor Does</h3>
        <ul>
          <li>Supports pelvic organs</li>
          <li>Controls bladder and bowel function</li>
          <li>Contributes to sexual sensation and function</li>
          <li>Works with core muscles for stability</li>
          <li>Helps manage intra-abdominal pressure</li>
        </ul>

        <h3>Common Pelvic Floor Issues</h3>
        <ul>
          <li><strong>Pelvic Floor Dysfunction:</strong> Muscles too tight or too weak</li>
          <li><strong>Urinary Incontinence:</strong> Leaking with cough, sneeze, or exercise</li>
          <li><strong>Pelvic Pain:</strong> Pain during intercourse or daily activities</li>
          <li><strong>Prolapse:</strong> Organs dropping due to weak support</li>
        </ul>

        <h3>Pelvic Floor Exercises (Kegels)</h3>
        <ul>
          <li><strong>Identify the muscles:</strong> Stop urination midstream (do this only to identify, not regularly)</li>
          <li><strong>Basic exercise:</strong> Contract muscles for 3 seconds, relax for 3 seconds</li>
          <li><strong>Progression:</strong> Gradually increase hold time to 10 seconds</li>
          <li><strong>Frequency:</strong> 3 sets of 10 repetitions, 3-5 times per week</li>
          <li><strong>Variety:</strong> Mix quick pulses with longer holds</li>
        </ul>

        <h3>Pelvic Floor and Exercise</h3>
        <ul>
          <li>High-impact activities may stress weak pelvic floors</li>
          <li>Proper breathing during exercise is crucial</li>
          <li>Avoid holding breath during strength training</li>
          <li>Gradually progress intensity if experiencing leakage</li>
          <li>Consider pelvic floor physical therapy if issues persist</li>
        </ul>

        <h3>When to Seek Professional Help</h3>
        <p>A pelvic floor physical therapist can assess and treat dysfunction. Seek help if you experience persistent pain, incontinence, or difficulty with exercise.</p>
      `
    },
    27: {
      title: 'Hormonal Health & Fitness',
      category: 'Women\'s Health',
      type: 'Guide',
      description: 'How hormones affect training, recovery, and body composition',
      content: `
        <h2>Hormonal Health & Fitness</h2>
        <p>Hormones profoundly affect training performance, recovery, body composition, and overall health. Understanding these relationships helps optimize your fitness approach.</p>
        
        <h3>Key Hormones in Women</h3>
        <ul>
          <li><strong>Estrogen:</strong> Affects muscle protein synthesis, bone health, mood, and metabolism</li>
          <li><strong>Progesterone:</strong> Affects energy needs, body temperature, and recovery</li>
          <li><strong>Testosterone:</strong> Supports muscle growth and strength (women have lower levels than men)</li>
          <li><strong>Cortisol:</strong> Stress hormone affecting recovery and body composition</li>
          <li><strong>Thyroid Hormones:</strong> Regulate metabolism and energy</li>
        </ul>

        <h3>Hormonal Effects on Training</h3>
        <ul>
          <li><strong>Strength:</strong> Varies across menstrual cycle; peak during follicular phase</li>
          <li><strong>Endurance:</strong> May be better during follicular phase due to lower body temperature</li>
          <li><strong>Recovery:</strong> Slower during luteal phase; prioritize sleep and nutrition</li>
          <li><strong>Injury Risk:</strong> May increase during certain cycle phases</li>
        </ul>

        <h3>Hormonal Birth Control Considerations</h3>
        <ul>
          <li>Affects hormonal fluctuations and cycle-based training benefits</li>
          <li>May impact muscle protein synthesis</li>
          <li>Can affect hydration and thermoregulation</li>
          <li>Individual responses vary significantly</li>
          <li>Track your own performance to identify patterns</li>
        </ul>

        <h3>Supporting Hormonal Health</h3>
        <ul>
          <li><strong>Sleep:</strong> 7-9 hours nightly is crucial for hormone regulation</li>
          <li><strong>Nutrition:</strong> Adequate calories, protein, and micronutrients</li>
          <li><strong>Stress Management:</strong> Chronic stress disrupts hormonal balance</li>
          <li><strong>Exercise Variety:</strong> Mix strength, cardio, and flexibility work</li>
          <li><strong>Recovery:</strong> Include rest days and deload weeks</li>
        </ul>

        <h3>When to Seek Help</h3>
        <p>If you experience irregular cycles, severe PMS, or hormonal imbalances affecting training, consult with a healthcare provider or sports medicine specialist.</p>
      `
    },
    28: {
      title: 'Bone Health for Women',
      category: 'Women\'s Health',
      type: 'Education',
      description: 'Preventing osteoporosis and maintaining bone density through exercise and nutrition',
      content: `
        <h2>Bone Health for Women</h2>
        <p>Women are at higher risk for osteoporosis, especially after menopause. Building and maintaining bone density through exercise and nutrition is crucial for lifelong health.</p>
        
        <h3>Why Women Are at Higher Risk</h3>
        <ul>
          <li>Lower peak bone mass than men</li>
          <li>Rapid bone loss after menopause due to declining estrogen</li>
          <li>Longer lifespan increases fracture risk</li>
          <li>Hormonal factors affect bone metabolism</li>
        </ul>

        <h3>Building Bone Density</h3>
        <ul>
          <li><strong>Strength Training:</strong> Weight-bearing and resistance exercises are most effective</li>
          <li><strong>Impact Activities:</strong> Running, jumping, dancing stimulate bone formation</li>
          <li><strong>Frequency:</strong> 3-4 times per week for optimal results</li>
          <li><strong>Progressive Overload:</strong> Gradually increase intensity and resistance</li>
        </ul>

        <h3>Nutritional Support for Bone Health</h3>
        <ul>
          <li><strong>Calcium:</strong> 1000-1200 mg daily from dairy, leafy greens, fortified foods</li>
          <li><strong>Vitamin D:</strong> 600-800 IU daily (more if deficient); supports calcium absorption</li>
          <li><strong>Protein:</strong> Adequate protein supports bone matrix formation</li>
          <li><strong>Magnesium:</strong> Important for bone structure and function</li>
          <li><strong>Vitamin K:</strong> Found in leafy greens; supports bone mineralization</li>
        </ul>

        <h3>Lifestyle Factors</h3>
        <ul>
          <li>Limit caffeine and sodium (can increase calcium loss)</li>
          <li>Avoid smoking (accelerates bone loss)</li>
          <li>Limit alcohol (excessive intake affects bone health)</li>
          <li>Maintain healthy body weight</li>
          <li>Get adequate sleep</li>
        </ul>

        <h3>Bone Health Screening</h3>
        <p>Women over 50 should discuss bone density screening (DEXA scan) with their healthcare provider. Early detection of low bone density allows for preventive interventions.</p>
      `
    },
    29: {
      title: 'Breast Health & Exercise',
      category: 'Women\'s Health',
      type: 'Guide',
      description: 'Proper support, exercise modifications, and health considerations',
      content: `
        <h2>Breast Health & Exercise</h2>
        <p>Proper breast support during exercise is important for comfort, performance, and long-term breast health. Understanding breast anatomy helps optimize your exercise experience.</p>
        
        <h3>Breast Anatomy & Exercise</h3>
        <ul>
          <li>Breast tissue is primarily fat with no muscle</li>
          <li>Ligaments (Cooper's ligaments) provide support</li>
          <li>Repetitive motion without support can stretch these ligaments</li>
          <li>Proper support reduces discomfort and potential damage</li>
        </ul>

        <h3>Choosing the Right Sports Bra</h3>
        <ul>
          <li><strong>Fit:</strong> Should be snug but not restrictive; minimal bounce</li>
          <li><strong>Support Level:</strong> Match to activity intensity (low, medium, high)</li>
          <li><strong>Straps:</strong> Should not dig in or slip off shoulders</li>
          <li><strong>Band:</strong> Should sit level around torso</li>
          <li><strong>Replacement:</strong> Every 6-12 months or when elastic loses elasticity</li>
        </ul>

        <h3>Breast Tenderness & Exercise</h3>
        <ul>
          <li><strong>Cyclical Tenderness:</strong> Related to menstrual cycle; usually resolves with proper support</li>
          <li><strong>Non-Cyclical Tenderness:</strong> May be related to caffeine, medications, or other factors</li>
          <li><strong>Management:</strong> Proper bra support, anti-inflammatory medications if needed</li>
        </ul>

        <h3>Exercise Modifications</h3>
        <ul>
          <li>High-impact activities require higher support bras</li>
          <li>Avoid exercises that cause excessive breast movement</li>
          <li>Consider timing workouts around menstrual cycle if experiencing tenderness</li>
          <li>Proper posture reduces strain on breast tissue</li>
        </ul>

        <h3>Breast Health Awareness</h3>
        <ul>
          <li>Perform regular self-exams</li>
          <li>Know what's normal for your breasts</li>
          <li>Report any changes to healthcare provider</li>
          <li>Maintain healthy lifestyle (exercise, nutrition, limited alcohol)</li>
        </ul>
      `
    },
    30: {
      title: 'Menopause & Fitness',
      category: 'Women\'s Health',
      type: 'Education',
      description: 'Training strategies and lifestyle modifications for menopause transition',
      content: `
        <h2>Menopause & Fitness</h2>
        <p>Menopause is a natural life transition involving significant hormonal changes. Exercise and lifestyle modifications can help manage symptoms and maintain health during this phase.</p>
        
        <h3>Menopause Symptoms Affecting Exercise</h3>
        <ul>
          <li><strong>Hot Flashes:</strong> Sudden heat sensation; may interrupt sleep and training</li>
          <li><strong>Night Sweats:</strong> Disrupt sleep quality and recovery</li>
          <li><strong>Fatigue:</strong> May reduce exercise motivation and performance</li>
          <li><strong>Joint Pain:</strong> May require exercise modifications</li>
          <li><strong>Mood Changes:</strong> May affect motivation and mental health</li>
          <li><strong>Weight Gain:</strong> Metabolic changes increase fat storage</li>
        </ul>

        <h3>Exercise Benefits During Menopause</h3>
        <ul>
          <li>Reduces hot flash frequency and severity</li>
          <li>Improves sleep quality</li>
          <li>Supports bone health (critical during menopause)</li>
          <li>Helps manage weight and metabolism</li>
          <li>Improves mood and mental health</li>
          <li>Reduces cardiovascular disease risk</li>
        </ul>

        <h3>Recommended Exercise During Menopause</h3>
        <ul>
          <li><strong>Strength Training:</strong> 2-3 times per week to maintain muscle and bone</li>
          <li><strong>Cardio:</strong> 150 minutes moderate or 75 minutes vigorous per week</li>
          <li><strong>Flexibility:</strong> Daily stretching and yoga</li>
          <li><strong>Intensity:</strong> Moderate; listen to your body</li>
        </ul>

        <h3>Exercise Modifications</h3>
        <ul>
          <li>Exercise in cool environments to manage hot flashes</li>
          <li>Wear moisture-wicking clothing</li>
          <li>Stay well-hydrated</li>
          <li>Avoid intense exercise during peak hot flash times</li>
          <li>Modify high-impact activities if experiencing joint pain</li>
        </ul>

        <h3>Nutrition During Menopause</h3>
        <ul>
          <li>Increase calcium and vitamin D for bone health</li>
          <li>Maintain adequate protein for muscle maintenance</li>
          <li>Reduce calories slightly due to metabolic slowdown</li>
          <li>Increase fiber for digestive health</li>
          <li>Stay hydrated (especially with night sweats)</li>
        </ul>

        <h3>When to Seek Support</h3>
        <p>If symptoms significantly impact quality of life or exercise ability, discuss options with your healthcare provider. Hormone therapy and other treatments may be appropriate.</p>
      `
    },
    31: {
      title: 'Female Athlete Triad',
      category: 'Women\'s Health',
      type: 'Reference',
      description: 'Understanding the relationship between energy availability, bone health, and menstrual function',
      content: `
        <h2>Female Athlete Triad</h2>
        <p>The Female Athlete Triad is a syndrome of three interrelated conditions affecting female athletes: low energy availability, menstrual dysfunction, and low bone mineral density.</p>
        
        <h3>The Three Components</h3>
        <ul>
          <li><strong>Low Energy Availability:</strong> Insufficient caloric intake relative to exercise expenditure</li>
          <li><strong>Menstrual Dysfunction:</strong> Irregular or absent periods (amenorrhea)</li>
          <li><strong>Low Bone Mineral Density:</strong> Weak bones increasing fracture risk</li>
        </ul>

        <h3>How They're Connected</h3>
        <p>When energy intake is insufficient for training demands, the body reduces non-essential functions including reproductive hormones. This leads to menstrual irregularities and reduced estrogen, which impairs bone formation. The result is weak bones despite high training volume.</p>

        <h3>Risk Factors</h3>
        <ul>
          <li>Sports emphasizing leanness (distance running, gymnastics, figure skating)</li>
          <li>Restrictive eating patterns or disordered eating</li>
          <li>Excessive training volume</li>
          <li>Perfectionism and high achievement drive</li>
          <li>Pressure from coaches or peers regarding weight</li>
        </ul>

        <h3>Warning Signs</h3>
        <ul>
          <li>Irregular or absent menstrual periods</li>
          <li>Frequent stress fractures or injuries</li>
          <li>Excessive fatigue despite adequate sleep</li>
          <li>Preoccupation with food and weight</li>
          <li>Declining athletic performance</li>
          <li>Mood changes or depression</li>
        </ul>

        <h3>Prevention & Treatment</h3>
        <ul>
          <li><strong>Adequate Nutrition:</strong> Eat enough to support training and health</li>
          <li><strong>Balanced Training:</strong> Avoid excessive volume; include recovery</li>
          <li><strong>Medical Monitoring:</strong> Regular check-ups including bone density screening</li>
          <li><strong>Professional Support:</strong> Work with sports medicine doctors, nutritionists, and mental health professionals</li>
          <li><strong>Education:</strong> Coaches and athletes should understand the risks</li>
        </ul>

        <h3>Long-Term Consequences</h3>
        <p>Untreated Female Athlete Triad can result in permanent bone damage, increased fracture risk throughout life, and other health complications. Early intervention is crucial.</p>
      `
    },
    32: {
      title: 'Nutrition for Women',
      category: 'Women\'s Health',
      type: 'Guide',
      description: 'Gender-specific nutritional needs and considerations for optimal health',
      content: `
        <h2>Nutrition for Women</h2>
        <p>Women have unique nutritional needs that differ from men due to hormonal differences, reproductive health, and physiological factors.</p>
        
        <h3>Key Nutritional Differences</h3>
        <ul>
          <li><strong>Iron:</strong> Women need 18 mg daily (vs 8 mg for men) due to menstrual losses</li>
          <li><strong>Calcium:</strong> 1000-1200 mg daily for bone health</li>
          <li><strong>Folate:</strong> 400 mcg daily (higher if planning pregnancy)</li>
          <li><strong>Vitamin B12:</strong> 2.4 mcg daily for energy and neurological health</li>
          <li><strong>Vitamin D:</strong> 600-800 IU daily (more if deficient)</li>
        </ul>

        <h3>Iron Needs & Sources</h3>
        <ul>
          <li><strong>Why Important:</strong> Carries oxygen in blood; supports energy and immune function</li>
          <li><strong>Heme Iron (better absorbed):</strong> Red meat, poultry, fish</li>
          <li><strong>Non-Heme Iron:</strong> Beans, lentils, fortified cereals, leafy greens</li>
          <li><strong>Absorption Tip:</strong> Pair with vitamin C for better absorption</li>
          <li><strong>Signs of Deficiency:</strong> Fatigue, weakness, shortness of breath</li>
        </ul>

        <h3>Protein Needs</h3>
        <ul>
          <li><strong>General:</strong> 0.8 g per kg body weight</li>
          <li><strong>Active Women:</strong> 1.2-2.0 g per kg depending on training</li>
          <li><strong>Distribution:</strong> Spread throughout day for optimal muscle protein synthesis</li>
          <li><strong>Sources:</strong> Meat, fish, eggs, dairy, legumes, nuts, seeds</li>
        </ul>

        <h3>Hydration</h3>
        <ul>
          <li>Women may have different sweat rates than men</li>
          <li>Menstrual cycle affects fluid retention and needs</li>
          <li>General guideline: Half body weight in ounces daily</li>
          <li>Increase during exercise and in hot weather</li>
        </ul>

        <h3>Cycle-Based Nutrition</h3>
        <ul>
          <li><strong>Follicular Phase:</strong> Standard caloric intake</li>
          <li><strong>Luteal Phase:</strong> Increase calories by 100-300, increase protein and fat</li>
          <li><strong>Throughout:</strong> Consistent micronutrient intake</li>
        </ul>

        <h3>Special Considerations</h3>
        <ul>
          <li><strong>Pregnancy:</strong> Additional 300 calories daily, increased folate and iron</li>
          <li><strong>Breastfeeding:</strong> Additional 500 calories daily, maintain hydration</li>
          <li><strong>Menopause:</strong> Maintain calcium and vitamin D, adjust calories for metabolic changes</li>
        </ul>
      `
    },
    34: {
      title: 'Women\'s Mental Health & Exercise',
      category: 'Women\'s Health',
      type: 'Education',
      description: 'How exercise supports mental health, mood, and emotional wellbeing in women',
      content: `
        <h2>Women's Mental Health & Exercise</h2>
        <p>Exercise is a powerful tool for supporting mental health in women. Understanding the connection between physical activity and emotional wellbeing can help optimize both.</p>
        
        <h3>Mental Health Challenges Affecting Women</h3>
        <ul>
          <li><strong>Depression:</strong> Women experience depression at twice the rate of men</li>
          <li><strong>Anxiety:</strong> More common in women; often related to hormonal fluctuations</li>
          <li><strong>PMDD:</strong> Premenstrual Dysphoric Disorder affects mood significantly</li>
          <li><strong>Postpartum Depression:</strong> Affects 1 in 7 new mothers</li>
          <li><strong>Stress:</strong> Women often juggle multiple roles increasing stress</li>
        </ul>

        <h3>How Exercise Helps Mental Health</h3>
        <ul>
          <li><strong>Neurotransmitters:</strong> Exercise increases serotonin, dopamine, and endorphins</li>
          <li><strong>Stress Reduction:</strong> Lowers cortisol levels</li>
          <li><strong>Sleep Quality:</strong> Improves sleep which supports mental health</li>
          <li><strong>Self-Efficacy:</strong> Achieving fitness goals builds confidence</li>
          <li><strong>Social Connection:</strong> Group exercise provides community support</li>
          <li><strong>Mindfulness:</strong> Exercise can be meditative and grounding</li>
        </ul>

        <h3>Exercise Recommendations for Mental Health</h3>
        <ul>
          <li><strong>Frequency:</strong> 3-5 times per week for mental health benefits</li>
          <li><strong>Duration:</strong> 30-60 minutes per session</li>
          <li><strong>Intensity:</strong> Moderate intensity (can talk but not sing)</li>
          <li><strong>Type:</strong> Any activity you enjoy; consistency matters more than type</li>
          <li><strong>Variety:</strong> Mix cardio, strength, and flexibility work</li>
        </ul>

        <h3>Cycle-Based Mental Health</h3>
        <ul>
          <li><strong>Follicular Phase:</strong> Mood typically better; good time for challenging workouts</li>
          <li><strong>Luteal Phase:</strong> May experience mood dips; prioritize enjoyable activities</li>
          <li><strong>Menstruation:</strong> May feel more emotional; gentle movement can help</li>
          <li><strong>Consistency:</strong> Regular exercise helps stabilize mood throughout cycle</li>
        </ul>

        <h3>When to Seek Professional Help</h3>
        <ul>
          <li>Persistent sadness or hopelessness lasting more than 2 weeks</li>
          <li>Loss of interest in activities you normally enjoy</li>
          <li>Significant anxiety affecting daily life</li>
          <li>Thoughts of self-harm</li>
          <li>Postpartum depression symptoms</li>
        </ul>

        <h3>Combining Exercise with Professional Support</h3>
        <p>Exercise is a valuable complement to therapy and medication, not a replacement. If experiencing mental health challenges, work with a healthcare provider to develop a comprehensive treatment plan.</p>
      `
    },
    19: {
      title: 'How to Read Research',
      category: 'Research',
      type: 'Education',
      description: 'Learn to evaluate fitness studies and understand evidence-based claims',
      content: `
        <h2>How to Read Research</h2>
        <p>Understanding how to evaluate fitness research helps you distinguish between evidence-based recommendations and marketing hype.</p>
        
        <h3>Key Research Terms</h3>
        <ul>
          <li><strong>Peer Review:</strong> Study evaluated by experts before publication</li>
          <li><strong>Sample Size:</strong> Number of participants (larger is generally better)</li>
          <li><strong>Control Group:</strong> Comparison group receiving no intervention</li>
          <li><strong>Randomized:</strong> Participants randomly assigned to groups</li>
          <li><strong>Placebo:</strong> Inactive treatment used for comparison</li>
        </ul>

        <h3>Study Design Quality (Best to Worst)</h3>
        <ul>
          <li>Randomized Controlled Trials (RCTs)</li>
          <li>Cohort Studies</li>
          <li>Case-Control Studies</li>
          <li>Cross-Sectional Studies</li>
          <li>Case Reports</li>
          <li>Expert Opinion</li>
        </ul>

        <h3>Red Flags in Research</h3>
        <ul>
          <li>Small sample size (n &lt; 20)</li>
          <li>No control group</li>
          <li>Funded by supplement company selling the product</li>
          <li>Extraordinary claims without strong evidence</li>
          <li>Single study making definitive claims</li>
        </ul>

        <h3>How to Find Quality Research</h3>
        <ul>
          <li>PubMed.gov - Free access to abstracts</li>
          <li>Google Scholar - Academic search engine</li>
          <li>ResearchGate - Researchers share their work</li>
          <li>Look for systematic reviews and meta-analyses</li>
        </ul>

        <h3>Critical Questions to Ask</h3>
        <ul>
          <li>Who funded this research?</li>
          <li>How large was the sample?</li>
          <li>Was there a control group?</li>
          <li>Are results clinically significant or just statistically significant?</li>
          <li>Do other studies support these findings?</li>
        </ul>
      `
    }
  };

  const resource = resourceContent[id];

  if (!resource) {
    return (
      <>
        <TopNav />
        <div className="resource-detail-page">
          <div className="resource-detail-container">
            <div className="not-found">
              <h2>Resource Not Found</h2>
              <p>Sorry, we couldn't find the resource you're looking for.</p>
              <button onClick={() => navigate('/resources')} className="back-button">
                Back to Resources
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <TopNav />
      <div className="resource-detail-page">
        <div className="resource-detail-container">
          <button onClick={() => navigate('/resources')} className="back-button">
            ← Back to Resources
          </button>

          <article className="resource-detail">
            <div className="detail-header">
              <div className="detail-meta">
                <span className="detail-category">{resource.category}</span>
                <span className="detail-type">{resource.type}</span>
              </div>
            </div>

            <h1>{resource.title}</h1>
            <p className="detail-description">{resource.description}</p>

            <div className="detail-content" dangerouslySetInnerHTML={{ __html: resource.content }} />

            <div className="detail-footer">
              <button onClick={() => navigate('/resources')} className="back-button">
                ← Back to Resources
              </button>
            </div>
          </article>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ResourceDetail;
