export interface ContactFormValues {
  name: string;
  email: string;
  message: string;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const validateContactForm = ({ name, email, message }: ContactFormValues): string | null => {
  if (!name.trim()) return 'Please enter your name.';
  if (!EMAIL_PATTERN.test(email.trim())) return 'Please enter a valid email address.';
  if (!message.trim()) return 'Please enter a message.';
  return null;
};

// Resolves once the message has been accepted and rejects with a user-facing
// message otherwise, so callers can surface the failure instead of pretending
// the submission succeeded.
export const submitContactForm = async (values: ContactFormValues): Promise<void> => {
  const validationError = validateContactForm(values);
  if (validationError) {
    throw new Error(validationError);
  }

  const endpoint = import.meta.env['VITE_CONTACT_ENDPOINT'];

  if (!endpoint) {
    // No backend configured yet: keep the simulated delay but make the missing
    // configuration visible to the developer instead of hiding it.
    console.warn('VITE_CONTACT_ENDPOINT is not configured; simulating the contact form submission.');
    await new Promise((resolve) => setTimeout(resolve, 1500));
    return;
  }

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: values.name.trim(),
      email: values.email.trim(),
      message: values.message.trim(),
    }),
  });

  if (!response.ok) {
    throw new Error(`The message could not be sent (server responded with ${response.status}).`);
  }
};
