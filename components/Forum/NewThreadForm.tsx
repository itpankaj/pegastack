import { useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface NewThreadFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (threadData: {
    title: string;
    content: string;
    category: string;
    tags: string[];
  }) => void;
}

const NewThreadForm = ({ isOpen, onClose, onSubmit }: NewThreadFormProps) => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: 'General Discussion',
    tags: ''
  });

  const categories = [
    'General Discussion',
    'Beginner Questions',
    'Advanced Topics',
    'Case Management',
    'Rules & Flows',
    'Integration',
    'Performance',
    'Certification Help',
    'Career Advice',
    'Project Showcase'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const tagsArray = formData.tags
      .split(',')
      .map(tag => tag.trim())
      .filter(tag => tag.length > 0);

    onSubmit({
      title: formData.title,
      content: formData.content,
      category: formData.category,
      tags: tagsArray
    });

    // Reset form
    setFormData({
      title: '',
      content: '',
      category: 'General Discussion',
      tags: ''
    });
    
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Start New Discussion</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
              Title *
            </label>
            <input
              type="text"
              id="title"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pega-blue focus:border-transparent"
              placeholder="What's your question or topic?"
            />
          </div>
          
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
              Category *
            </label>
            <select
              id="category"
              required
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pega-blue focus:border-transparent"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
              Description *
            </label>
            <textarea
              id="content"
              required
              rows={8}
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pega-blue focus:border-transparent"
              placeholder="Provide details about your question or topic. Include any relevant code, error messages, or context that might help others understand and respond to your post."
            />
          </div>
          
          <div>
            <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-2">
              Tags
            </label>
            <input
              type="text"
              id="tags"
              value={formData.tags}
              onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pega-blue focus:border-transparent"
              placeholder="Enter tags separated by commas (e.g., case-management, rules, beginner)"
            />
            <p className="text-sm text-gray-500 mt-1">
              Tags help others find your post. Use relevant keywords separated by commas.
            </p>
          </div>
          
          <div className="flex items-center justify-end space-x-4 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pega-blue"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary"
            >
              Post Discussion
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewThreadForm;
