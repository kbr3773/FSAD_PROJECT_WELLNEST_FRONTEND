import { motion } from 'framer-motion';
import { Calendar, Clock, User, ArrowRight, Search, Bookmark, CheckCircle, X } from 'lucide-react';
import { blogPosts } from '../data/dummyData';
import { useMemo, useState } from 'react';

const BlogPage = () => {
  const categories = ['All', 'Mental Health', 'Fitness', 'Nutrition', 'Wellness'];
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [query, setQuery] = useState('');
  const [selectedPost, setSelectedPost] = useState(null);
  const [savedPosts, setSavedPosts] = useState([]);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [status, setStatus] = useState('');

  const filteredPosts = useMemo(() => {
    return blogPosts.filter((post) => {
      const categoryMatches = selectedCategory === 'All' || post.category === selectedCategory;
      const queryMatches = [post.title, post.excerpt, post.author, post.category]
        .join(' ')
        .toLowerCase()
        .includes(query.toLowerCase());
      return categoryMatches && queryMatches;
    });
  }, [query, selectedCategory]);

  const articleBody = (post) => [
    `${post.excerpt} Student wellness improves when small habits are repeated consistently, especially during exam pressure, project deadlines, and busy campus routines.`,
    `Start by choosing one realistic action from this topic today. Keep it simple enough that you can complete it even on a difficult academic day.`,
    `For best results, connect this article with your WellNest dashboard: track mood, movement, meals, rest, and support needs across the week.`,
  ];

  const toggleSave = (postId) => {
    setSavedPosts((current) => (
      current.includes(postId)
        ? current.filter((id) => id !== postId)
        : [...current, postId]
    ));
  };

  const subscribe = () => {
    if (!newsletterEmail) {
      setStatus('Enter your email to subscribe.');
      return;
    }
    setStatus(`Subscribed ${newsletterEmail} to wellness updates.`);
    setNewsletterEmail('');
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold mb-4">
            Wellness <span className="gradient-text">Blog</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8">
            Expert insights, tips, and stories to support your wellness journey
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search articles..."
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              className="input-field pl-12 w-full"
            />
          </div>
        </motion.div>

        {/* Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category, index) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full font-semibold transition-all ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                  : 'bg-white/10 backdrop-blur-lg border border-white/20 hover:bg-white/20'
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Featured Post */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="card mb-12 overflow-hidden cursor-pointer group"
          onClick={() => setSelectedPost(blogPosts[0])}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="relative h-64 lg:h-auto overflow-hidden rounded-lg">
              <img
                src={blogPosts[0].image}
                alt={blogPosts[0].title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute top-4 left-4 px-3 py-1 bg-blue-500 text-white rounded-full text-sm font-semibold">
                Featured
              </div>
            </div>
            <div className="flex flex-col justify-center">
              <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-full text-sm font-semibold w-fit mb-4">
                {blogPosts[0].category}
              </span>
              <h2 className="text-3xl font-bold mb-4">{blogPosts[0].title}</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">{blogPosts[0].excerpt}</p>
              <div className="flex items-center text-sm text-gray-500 mb-6">
                <User className="w-4 h-4 mr-1" />
                <span className="mr-4">{blogPosts[0].author}</span>
                <Calendar className="w-4 h-4 mr-1" />
                <span className="mr-4">{blogPosts[0].date}</span>
                <Clock className="w-4 h-4 mr-1" />
                <span>{blogPosts[0].readTime} read</span>
              </div>
              <button
                onClick={(event) => {
                  event.stopPropagation();
                  setSelectedPost(blogPosts[0]);
                }}
                className="btn-primary w-fit"
              >
                Read More <ArrowRight className="inline ml-2 w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              whileHover={{ y: -10 }}
              className="card group cursor-pointer overflow-hidden"
              onClick={() => setSelectedPost(post)}
            >
              <div className="relative h-48 mb-4 rounded-lg overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
              <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-xs font-semibold">
                {post.category}
              </span>
              <h3 className="text-xl font-bold mt-3 mb-2">{post.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">{post.excerpt}</p>
              <div className="flex items-center text-xs text-gray-500 mb-4">
                <User className="w-3 h-3 mr-1" />
                <span className="mr-3">{post.author}</span>
                <Clock className="w-3 h-3 mr-1" />
                <span>{post.readTime}</span>
              </div>
              <button
                onClick={(event) => {
                  event.stopPropagation();
                  setSelectedPost(post);
                }}
                className="text-blue-500 hover:text-blue-600 font-semibold text-sm flex items-center"
              >
                Read Article <ArrowRight className="ml-2 w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </div>

        {/* Newsletter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-16 glass rounded-2xl p-12 text-center"
        >
          <h2 className="text-3xl font-bold mb-4">Subscribe to Our Newsletter</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
            Get the latest wellness tips, program updates, and exclusive content delivered to your inbox
          </p>
          <div className="max-w-md mx-auto flex gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              value={newsletterEmail}
              onChange={(event) => setNewsletterEmail(event.target.value)}
              className="input-field flex-1"
            />
            <button onClick={subscribe} className="btn-primary">Subscribe</button>
          </div>
          {status && (
            <p className="mt-4 rounded-lg bg-blue-500/10 px-4 py-3 text-sm text-blue-700 dark:text-blue-200">
              {status}
            </p>
          )}
        </motion.div>

        {selectedPost && (
          <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/60 px-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl dark:bg-gray-900"
            >
              <div className="mb-5 flex items-start justify-between gap-4">
                <div>
                  <span className="rounded-full bg-blue-500/10 px-3 py-1 text-sm font-semibold text-blue-500">
                    {selectedPost.category}
                  </span>
                  <h2 className="mt-3 text-3xl font-bold">{selectedPost.title}</h2>
                  <div className="mt-3 flex flex-wrap gap-4 text-sm text-gray-500">
                    <span className="flex items-center"><User className="mr-1 h-4 w-4" />{selectedPost.author}</span>
                    <span className="flex items-center"><Calendar className="mr-1 h-4 w-4" />{selectedPost.date}</span>
                    <span className="flex items-center"><Clock className="mr-1 h-4 w-4" />{selectedPost.readTime}</span>
                  </div>
                </div>
                <button onClick={() => setSelectedPost(null)} className="rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-800">
                  <X className="h-5 w-5" />
                </button>
              </div>

              <img
                src={selectedPost.image}
                alt={selectedPost.title}
                className="mb-6 h-64 w-full rounded-xl object-cover"
              />

              <div className="space-y-4 text-gray-700 dark:text-gray-300">
                {articleBody(selectedPost).map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>

              <div className="mt-6 rounded-xl bg-blue-500/10 p-5">
                <h3 className="mb-3 font-bold">Action Steps</h3>
                <div className="space-y-3">
                  {['Choose one habit from this article.', 'Practice it today for 10 minutes.', 'Track how you feel afterward in your dashboard.'].map((item) => (
                    <div key={item} className="flex gap-3 text-sm">
                      <CheckCircle className="mt-0.5 h-5 w-5 flex-none text-green-500" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <button onClick={() => toggleSave(selectedPost.id)} className="btn-primary flex-1">
                  <Bookmark className="mr-2 h-5 w-5" />
                  {savedPosts.includes(selectedPost.id) ? 'Saved' : 'Save Article'}
                </button>
                <button onClick={() => setSelectedPost(null)} className="btn-secondary flex-1">
                  Mark As Read
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogPage;
