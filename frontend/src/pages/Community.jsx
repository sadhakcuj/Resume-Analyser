import React, { useState, useEffect } from 'react';
import { MessageCircle, ThumbsUp, Share2, Plus, X } from 'lucide-react';

function Community() {
  const [discussions, setDiscussions] = useState([]);
  const [username, setUsername] = useState('');
  const [userRole, setUserRole] = useState('');
  const [newPost, setNewPost] = useState({
    title: '',
    content: '',
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);

 
  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    const storedUserRole = localStorage.getItem('userRole');
    const storedDiscussions = JSON.parse(localStorage.getItem('discussions') || '[]');

    if (storedUsername && storedUserRole) {
      setUsername(storedUsername);
      setUserRole(storedUserRole);
    }

    
    if (storedDiscussions.length === 0) {
      const defaultDiscussions = [
        {
          id: 1,
          author: 'Sarah Johnson',
          role: 'Software Engineer',
          title: 'My Experience with System Design Interviews at FAANG',
          content: 'I recently went through several system design interviews and wanted to share my experience and tips...',
          likes: 234,
          comments: 45,
          time: '2 hours ago',
        },
        {
          id: 2,
          author: 'Michael Chen',
          role: 'Product Manager',
          title: 'How to Answer "Tell Me About Yourself" Like a Pro',
          content: "After conducting numerous mock interviews, I have developed a framework for answering this common question...",
          likes: 189,
          comments: 32,
          time: '5 hours ago',
        }
      ];
      
      localStorage.setItem('discussions', JSON.stringify(defaultDiscussions));
      setDiscussions(defaultDiscussions);
    } else {
      setDiscussions(storedDiscussions);
    }
  }, []);


  const handleAddPost = () => {
    if (!newPost.title || !newPost.content) {
      alert('Please fill in both title and content');
      return;
    }

    const newDiscussion = {
      id: Date.now(),
      author: username,
      role: userRole,
      title: newPost.title,
      content: newPost.content,
      likes: 0,
      comments: 0,
      time: 'Just now',
    };

    
    const updatedDiscussions = [newDiscussion, ...discussions];
    localStorage.setItem('discussions', JSON.stringify(updatedDiscussions));
    
    setDiscussions(updatedDiscussions);

   
    setNewPost({ title: '', content: '' });
    setIsDialogOpen(false);
  };

 
  const handleLikePost = (postId) => {
    const updatedDiscussions = discussions.map(discussion => 
      discussion.id === postId 
        ? { ...discussion, likes: discussion.likes + 1 }
        : discussion
    );

    localStorage.setItem('discussions', JSON.stringify(updatedDiscussions));
    setDiscussions(updatedDiscussions);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-900 via-purple-800 to-indigo-900 text-white">
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-indigo-950 opacity-50"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Community Discussions</h1>
          </div>

          
          <div className="flex space-x-2 mb-4">
            <button className="bg-indigo-900 border border-purple-500 text-purple-200 px-4 py-2 rounded-full hover:bg-indigo-700 transition duration-300">
              All Topics
            </button>
            <button className="bg-indigo-900 border border-purple-500 text-purple-200 px-4 py-2 rounded-full hover:bg-indigo-700 transition duration-300">
              Technical
            </button>
            <button className="bg-indigo-900 border border-purple-500 text-purple-200 px-4 py-2 rounded-full hover:bg-indigo-700 transition duration-300">
              Behavioral
            </button>
            <button className="bg-indigo-900 border border-purple-500 text-purple-200 px-4 py-2 rounded-full hover:bg-indigo-700 transition duration-300">
              Interview Tips
            </button>
          </div>

          
          <button 
            onClick={() => setIsDialogOpen(true)}
            className="mb-4 bg-gradient-to-r from-blue-400 to-purple-500 text-white px-4 py-2 rounded-full hover:from-blue-500 hover:to-purple-600 transition duration-300 flex items-center"
          >
            <Plus className="mr-2 h-4 w-4" /> New Post
          </button>

         
          {isDialogOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center">
              <div className="bg-indigo-900 p-6 rounded-xl w-full max-w-md">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold">Create New Discussion Post</h2>
                  <button 
                    onClick={() => setIsDialogOpen(false)}
                    className="text-purple-300 hover:text-purple-200 transition duration-300"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>
                <div className="space-y-4">
                  <input 
                    type="text"
                    placeholder="Post Title"
                    value={newPost.title}
                    onChange={(e) => setNewPost(prev => ({...prev, title: e.target.value}))}
                    className="w-full px-4 py-3 rounded-full bg-indigo-800 text-white border border-purple-500 focus:outline-none focus:border-blue-400 transition duration-300"
                  />
                  <textarea 
                    placeholder="Your post content..."
                    value={newPost.content}
                    onChange={(e) => setNewPost(prev => ({...prev, content: e.target.value}))}
                    className="w-full px-4 py-3 rounded-xl bg-indigo-800 text-white border border-purple-500 focus:outline-none focus:border-blue-400 transition duration-300"
                    rows="4"
                  />
                  <button 
                    onClick={handleAddPost}
                    className="w-full bg-gradient-to-r from-blue-400 to-purple-500 text-white px-4 py-3 rounded-full hover:from-blue-500 hover:to-purple-600 transition duration-300"
                  >
                    Post Discussion
                  </button>
                </div>
              </div>
            </div>
          )}

          
          <div className="space-y-6">
            {discussions.map((discussion) => (
              <div 
                key={discussion.id} 
                className="bg-indigo-900 bg-opacity-75 rounded-xl p-6 hover:bg-indigo-800 transition duration-300 border border-purple-700"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-semibold text-xl">{discussion.title}</h3>
                    <div className="text-sm text-purple-300">
                      {discussion.author} • {discussion.role} • {discussion.time}
                    </div>
                  </div>
                </div>
                
                <p className="text-purple-100 mb-4">
                  {discussion.content}
                </p>
                
                <div className="flex items-center space-x-6">
                  <button 
                    onClick={() => handleLikePost(discussion.id)}
                    className="flex items-center space-x-2 text-purple-300 hover:text-blue-300 transition duration-300"
                  >
                    <ThumbsUp className="h-5 w-5" />
                    <span>{discussion.likes}</span>
                  </button>
                  
                  <button className="flex items-center space-x-2 text-purple-300 hover:text-blue-300 transition duration-300">
                    <MessageCircle className="h-5 w-5" />
                    <span>{discussion.comments}</span>
                  </button>
                  
                  <button className="flex items-center space-x-2 text-purple-300 hover:text-blue-300 transition duration-300">
                    <Share2 className="h-5 w-5" />
                    <span>Share</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Community;
