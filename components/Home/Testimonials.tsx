import { StarIcon } from '@heroicons/react/24/solid';
import Card from '../UI/Card';

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: 'Sarah Chen',
      role: 'Senior System Architect',
      company: 'Tech Solutions Inc.',
      image: '/images/testimonials/sarah.jpg',
      content: 'PegaStack helped me transition from Java development to PEGA. The structured approach and hands-on projects made all the difference. I passed my CSA exam on the first attempt!',
      rating: 5
    },
    {
      id: 2,
      name: 'Michael Rodriguez',
      role: 'Lead Developer',
      company: 'Financial Services Corp',
      image: '/images/testimonials/michael.jpg',
      content: 'The advanced tutorials on performance tuning and DevOps were exactly what I needed for my CSSA preparation. The real-world examples are invaluable.',
      rating: 5
    },
    {
      id: 3,
      name: 'Priya Patel',
      role: 'Business Analyst',
      company: 'Healthcare Systems',
      image: '/images/testimonials/priya.jpg',
      content: 'As a business analyst transitioning to technical roles, PegaStack\'s beginner track was perfect. The explanations are clear and the progression is logical.',
      rating: 5
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Success Stories
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join thousands of professionals who advanced their careers with PegaStack
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="text-center">
              <div className="flex justify-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <StarIcon key={i} className="h-5 w-5 text-yellow-400" />
                ))}
              </div>
              
              <p className="text-gray-600 mb-6 italic">
                "{testimonial.content}"
              </p>
              
              <div className="flex items-center justify-center">
                <div className="w-12 h-12 bg-pega-blue rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                  {testimonial.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="text-left">
                  <div className="font-semibold text-gray-900">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-gray-600">
                    {testimonial.role}
                  </div>
                  <div className="text-sm text-gray-500">
                    {testimonial.company}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="bg-pega-blue text-white px-8 py-4 rounded-lg inline-block">
            <div className="text-2xl font-bold mb-2">98% Pass Rate</div>
            <div className="text-blue-100">For certification exams</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
