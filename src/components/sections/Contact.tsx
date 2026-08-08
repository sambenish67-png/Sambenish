import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';
import Section from '../Section';
import SectionHeader from '../SectionHeader';
import { Card } from '../Card';
import Button from '../Button';
import SocialLinks from '../SocialLinks';
import { Mail, Phone, MapPin } from 'lucide-react';
import { PORTFOLIO_DATA } from '@/utils/data';
import { revealFromLeft, revealFromRight } from '@/utils/motion';
import { inputField, mutedText } from '@/utils/styles';

const CONTACT_CHANNELS = [
  { icon: Mail, label: 'Email', value: PORTFOLIO_DATA.email, href: `mailto:${PORTFOLIO_DATA.email}` },
  { icon: Phone, label: 'Phone', value: PORTFOLIO_DATA.phone, href: `tel:${PORTFOLIO_DATA.phone}` },
  { icon: MapPin, label: 'Location', value: PORTFOLIO_DATA.location },
];

const FIELDS = [
  { name: 'name', label: 'Your Name', type: 'text', placeholder: 'John Doe' },
  { name: 'email', label: 'Your Email', type: 'email', placeholder: 'john@example.com' },
  { name: 'message', label: 'Message', type: 'textarea', placeholder: 'Tell me about your project...' },
] as const;

const EMPTY_FORM = { name: '', email: '', message: '' };

const Contact: React.FC = () => {
  const { isDark } = useTheme();
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate form submission
    setTimeout(() => {
      setIsLoading(false);
      setSubmitted(true);
      setFormData(EMPTY_FORM);

      // Reset submitted state after 3 seconds
      setTimeout(() => setSubmitted(false), 3000);
    }, 1500);
  };

  return (
    <Section id="contact">
      <SectionHeader
        subtitle="Let's Connect"
        title="Get In Touch"
        description="Have a project in mind? Let's collaborate and create something amazing together"
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left side - Contact Info */}
        <motion.div {...revealFromLeft()} className="space-y-8">
          <div>
            <h3 className="text-2xl font-bold mb-4">Contact Information</h3>
            <p className={`mb-8 text-lg ${mutedText(isDark)}`}>
              Feel free to reach out to me through any of these channels. I'm always happy to discuss new opportunities!
            </p>
          </div>

          {/* Contact items */}
          <div className="space-y-4">
            {CONTACT_CHANNELS.map((item, index) => (
              <motion.a
                key={item.label}
                href={item.href || '#'}
                {...revealFromLeft({ delay: index * 0.1, distance: 20, duration: 0.3 })}
                className={`flex items-center gap-4 p-4 rounded-lg transition-all hover:scale-105 ${
                  isDark
                    ? 'bg-slate-800/50 hover:bg-slate-700/50'
                    : 'bg-slate-100 hover:bg-slate-200'
                }`}
              >
                <div className="text-cyan-400 bg-cyan-400/10 p-3 rounded-lg">
                  <item.icon size={24} />
                </div>
                <div>
                  <p className="text-sm text-slate-500">{item.label}</p>
                  <p className="font-semibold">{item.value}</p>
                </div>
              </motion.a>
            ))}
          </div>

          {/* Social Links */}
          <div>
            <h4 className="font-bold mb-4">Follow Me</h4>
            <SocialLinks platforms={['linkedin', 'github']} />
          </div>
        </motion.div>

        {/* Right side - Contact Form */}
        <motion.div {...revealFromRight()}>
          <Card>
            <div className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {FIELDS.map((field) => (
                  <div key={field.name}>
                    <label htmlFor={field.name} className="block text-sm font-medium mb-2">
                      {field.label}
                    </label>
                    {field.type === 'textarea' ? (
                      <textarea
                        id={field.name}
                        name={field.name}
                        value={formData[field.name]}
                        onChange={handleChange}
                        required
                        rows={5}
                        placeholder={field.placeholder}
                        className={`${inputField(isDark)} resize-none`}
                      />
                    ) : (
                      <input
                        type={field.type}
                        id={field.name}
                        name={field.name}
                        value={formData[field.name]}
                        onChange={handleChange}
                        required
                        placeholder={field.placeholder}
                        className={inputField(isDark)}
                      />
                    )}
                  </div>
                ))}

                {/* Submit Button */}
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  isLoading={isLoading}
                  disabled={isLoading || submitted}
                  className="w-full"
                >
                  {submitted ? 'Message Sent! ✓' : 'Send Message'}
                </Button>

                {/* Success Message */}
                {submitted && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center text-green-400 font-medium"
                  >
                    Thanks for reaching out! I'll get back to you soon.
                  </motion.p>
                )}
              </form>
            </div>
          </Card>
        </motion.div>
      </div>
    </Section>
  );
};

export default Contact;
