import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';
import SectionHeader from '../SectionHeader';
import { Card } from '../Card';
import Button from '../Button';
import { Mail, Phone, MapPin, Linkedin, Github } from 'lucide-react';
import { PORTFOLIO_DATA } from '@/utils/data';

const NAME_MAX = 100;
const EMAIL_MAX = 254;
const MESSAGE_MAX = 2000;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const FIELD_LIMITS = { name: NAME_MAX, email: EMAIL_MAX, message: MESSAGE_MAX };

const Contact: React.FC = () => {
  const { isDark } = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const limit = FIELD_LIMITS[name as keyof typeof FIELD_LIMITS] ?? MESSAGE_MAX;
    setFormData(prev => ({ ...prev, [name]: value.slice(0, limit) }));
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const name = formData.name.trim();
    const email = formData.email.trim();
    const message = formData.message.trim();

    if (name.length < 2 || name.length > NAME_MAX) {
      setError(`Please enter a name between 2 and ${NAME_MAX} characters.`);
      return;
    }
    if (!EMAIL_PATTERN.test(email) || email.length > EMAIL_MAX) {
      setError('Please enter a valid email address.');
      return;
    }
    if (message.length < 10 || message.length > MESSAGE_MAX) {
      setError(`Please enter a message between 10 and ${MESSAGE_MAX} characters.`);
      return;
    }

    setError(null);
    setIsLoading(true);

    // Simulate form submission
    setTimeout(() => {
      setIsLoading(false);
      setSubmitted(true);
      setFormData({ name: '', email: '', message: '' });

      // Reset submitted state after 3 seconds
      setTimeout(() => setSubmitted(false), 3000);
    }, 1500);
  };

  const contactInfo = [
    { icon: Mail, label: 'Email', value: PORTFOLIO_DATA.email, href: `mailto:${PORTFOLIO_DATA.email}` },
    { icon: Phone, label: 'Phone', value: PORTFOLIO_DATA.phone, href: `tel:${PORTFOLIO_DATA.phone}` },
    { icon: MapPin, label: 'Location', value: PORTFOLIO_DATA.location },
  ];

  const socialLinks = [
    { icon: Linkedin, label: 'LinkedIn', href: PORTFOLIO_DATA.linkedin },
    { icon: Github, label: 'GitHub', href: PORTFOLIO_DATA.github },
  ];

  return (
    <section
      id="contact"
      className={`py-20 ${isDark ? 'bg-slate-900' : 'bg-white'}`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          subtitle="Let's Connect"
          title="Get In Touch"
          description="Have a project in mind? Let's collaborate and create something amazing together"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left side - Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold mb-4">Contact Information</h3>
              <p className={`mb-8 text-lg ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                Feel free to reach out to me through any of these channels. I'm always happy to discuss new opportunities!
              </p>
            </div>

            {/* Contact items */}
            <div className="space-y-4">
              {contactInfo.map((item, index) => (
                <motion.a
                  key={item.label}
                  href={item.href || '#'}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
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
              <div className="flex gap-4">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    className={`p-3 rounded-lg transition-all ${
                      isDark
                        ? 'bg-slate-800 hover:bg-slate-700 hover:shadow-neon'
                        : 'bg-slate-200 hover:bg-slate-300'
                    }`}
                    title={social.label}
                  >
                    <social.icon size={24} />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right side - Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card>
              <div className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name Input */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      minLength={2}
                      maxLength={NAME_MAX}
                      autoComplete="name"
                      className={`w-full px-4 py-3 rounded-lg border transition-all focus:outline-none focus:scale-105 ${
                        isDark
                          ? 'bg-slate-700/50 border-slate-600 focus:border-cyan-400'
                          : 'bg-slate-100 border-slate-300 focus:border-cyan-400'
                      }`}
                      placeholder="John Doe"
                    />
                  </div>

                  {/* Email Input */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      Your Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      maxLength={EMAIL_MAX}
                      autoComplete="email"
                      className={`w-full px-4 py-3 rounded-lg border transition-all focus:outline-none focus:scale-105 ${
                        isDark
                          ? 'bg-slate-700/50 border-slate-600 focus:border-cyan-400'
                          : 'bg-slate-100 border-slate-300 focus:border-cyan-400'
                      }`}
                      placeholder="john@example.com"
                    />
                  </div>

                  {/* Message Textarea */}
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      minLength={10}
                      maxLength={MESSAGE_MAX}
                      rows={5}
                      className={`w-full px-4 py-3 rounded-lg border transition-all focus:outline-none focus:scale-105 resize-none ${
                        isDark
                          ? 'bg-slate-700/50 border-slate-600 focus:border-cyan-400'
                          : 'bg-slate-100 border-slate-300 focus:border-cyan-400'
                      }`}
                      placeholder="Tell me about your project..."
                    />
                  </div>

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

                  {/* Validation Error */}
                  {error && (
                    <p role="alert" className="text-center text-red-400 font-medium">
                      {error}
                    </p>
                  )}

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
      </div>
    </section>
  );
};

export default Contact;
