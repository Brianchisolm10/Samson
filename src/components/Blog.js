import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Blog.css';
import TopNav from './TopNav';
import Footer from './Footer';

function Blog() {
  const navigate = useNavigate();
  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Load articles from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('blogArticles');
    if (saved) {
      const parsedArticles = JSON.parse(saved);
      setArticles(parsedArticles);
      setFilteredArticles(parsedArticles);
    } else {
      setArticles([]);
      setFilteredArticles([]);
    }
  }, []);

  // Filter articles based on category and search
  useEffect(() => {
    let filtered = articles;

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(article => article.category === selectedCategory);
    }

    if (searchQuery) {
      filtered = filtered.filter(article =>
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredArticles(filtered);
  }, [selectedCategory, searchQuery, articles]);

  const featuredArticle = articles.length > 0 ? articles[0] : null;

  const categories = [
    { value: 'all', label: 'All Articles' },
    { value: 'fitness', label: 'Fitness' },
    { value: 'nutrition', label: 'Nutrition' },
    { value: 'wellness', label: 'Wellness' },
    { value: 'community', label: 'Community' },
    { value: 'research', label: 'Research' }
  ];

  return (
    <>
      <TopNav />
      <div className="blog-page">
        {/* Hero Section */}
        <section className="blog-hero">
          <div className="blog-hero-content">
            <h1>AFYA Blog</h1>
            <p>Insights, stories, and expert advice on fitness, nutrition, and wellness</p>
          </div>
        </section>

        {/* Coming Soon Section */}
        {articles.length === 0 ? (
          <section className="blog-coming-soon">
            <div className="coming-soon-wrapper">
              <h2 className="coming-soon-title">Coming Soon</h2>
              
              <div className="contribution-intro">
                <h3>Interested in Contributing?</h3>
                <p>We're actively looking for passionate authors and editors to contribute their expertise and insights. Whether you're a fitness professional, nutritionist, wellness expert, or community member with valuable knowledge to share, we'd love to feature your work.</p>
                
                <p className="contribution-description">By joining our editorial community, you'll gain visibility among thousands of fitness enthusiasts, build your professional reputation, and make a real impact on people's health and wellness goals. We provide editorial support, promotion across our platform, and the opportunity to connect with like-minded professionals.</p>
              </div>

              <div className="contribution-types">
                <div className="contribution-card">
                  <h4>For Authors</h4>
                  <ul>
                    <li>Share your expertise and knowledge</li>
                    <li>Reach our growing fitness community</li>
                    <li>Build your professional profile</li>
                    <li>Contribute original research and insights</li>
                  </ul>
                </div>
                
                <div className="contribution-card">
                  <h4>For Editors</h4>
                  <ul>
                    <li>Help shape quality content</li>
                    <li>Review and refine articles</li>
                    <li>Ensure accuracy and clarity</li>
                    <li>Guide our editorial direction</li>
                  </ul>
                </div>
              </div>

              <div className="contribution-cta">
                <p>If you're interested in joining our editorial team, please reach out:</p>
                <a href="mailto:afya@theafya.org" className="btn-contribute">Get in Touch</a>
              </div>
            </div>
          </section>
        ) : (
          <>
            {/* Featured Article */}
            {featuredArticle && (
              <section className="blog-featured">
                <div className="blog-container">
                  <div className="featured-article">
                    <div className="featured-image">
                      <img src={featuredArticle.image} alt={featuredArticle.title} />
                      <span className="featured-badge">Featured</span>
                    </div>
                    <div className="featured-content">
                      <div className="article-meta">
                        <span className="category-tag">{featuredArticle.category}</span>
                        <span className="read-time">{featuredArticle.readTime} min read</span>
                      </div>
                      <h2>{featuredArticle.title}</h2>
                      <p className="featured-excerpt">{featuredArticle.excerpt}</p>
                      <div className="article-footer">
                        <div className="author-info">
                          <img src={featuredArticle.authorImage} alt={featuredArticle.author} className="author-avatar" />
                          <div>
                            <p className="author-name">{featuredArticle.author}</p>
                            <p className="publish-date">{new Date(featuredArticle.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                          </div>
                        </div>
                        <button className="btn-read-more" onClick={() => navigate(`/blog/${featuredArticle.id}`)}>
                          Read Article
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* Search & Filter */}
            <section className="blog-controls">
              <div className="blog-container">
                <div className="search-bar">
                  <input
                    type="text"
                    placeholder="Search articles..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="search-input"
                  />
                </div>

                <div className="category-filter">
                  {categories.map(cat => (
                    <button
                      key={cat.value}
                      className={`filter-btn ${selectedCategory === cat.value ? 'active' : ''}`}
                      onClick={() => setSelectedCategory(cat.value)}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>
            </section>

            {/* Articles Grid */}
            <section className="blog-articles">
              <div className="blog-container">
                {filteredArticles.length > 0 ? (
                  <div className="articles-grid">
                    {filteredArticles.map(article => (
                      <article key={article.id} className="article-card">
                        <div className="article-image">
                          <img src={article.image} alt={article.title} />
                          <span className={`category-badge category-${article.category}`}>
                            {article.category}
                          </span>
                        </div>
                        <div className="article-content">
                          <div className="article-meta-small">
                            <span className="read-time">{article.readTime} min</span>
                          </div>
                          <h3>{article.title}</h3>
                          <p className="article-excerpt">{article.excerpt}</p>
                          <div className="article-footer-small">
                            <div className="author-info-small">
                              <img src={article.authorImage} alt={article.author} className="author-avatar-small" />
                              <div>
                                <p className="author-name-small">{article.author}</p>
                                <p className="publish-date-small">
                                  {new Date(article.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                ) : (
                  <div className="no-articles">
                    <p>No articles found. Check back soon for exciting content!</p>
                  </div>
                )}
              </div>
            </section>
          </>
        )}

        {/* Newsletter CTA */}
        <section className="blog-newsletter">
          <div className="blog-container">
            <div className="newsletter-content">
              <h2>Stay Updated</h2>
              <p>Get the latest fitness tips, nutrition advice, and community stories delivered to your inbox</p>
              <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
                <input type="email" placeholder="Enter your email" required />
                <button type="submit">Subscribe</button>
              </form>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}

export default Blog;
