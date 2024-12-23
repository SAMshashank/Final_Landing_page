import { Mail } from 'lucide-react'
import { FormEvent, useState } from 'react'
import { toast } from "react-toastify";

export default function MarketingContact() {

  const [email, setEmail] = useState('');

  // Handle input change and update state
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);

   
      toast.success("Thankyou", {
        position: toast.POSITION.TOP_CENTER,
        className: "text-blue-600 font-semibold",
      });
    
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/subscription/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Subscribed successfully!');
        setEmail(''); // Clear the input field after successful submission
      } else {
        alert('Subscription failed: ' + data.message);
      }
    } catch (error) {
      console.error('Error during subscription:', error);
      alert('Internal Server Error');
    }


  }
  return (
    <section className="py-16 bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold mb-6 text-yellow-400">Marketing Proposals</h2>
            <p className="text-gray-300 mb-4">
              Interested in partnering with us? We're always looking for exciting marketing opportunities. Get in touch with our team to discuss your proposal.
            </p>
            <div className="flex items-center mb-4">
              <Mail className="w-6 h-6 text-yellow-400 mr-2" />
              <span className="text-gray-300">marketing@web3socialapp.com</span>
            </div>
            <a
              href="mailto:marketing@web3socialapp.com"
              className="inline-block bg-yellow-400 hover:bg-yellow-500 text-black px-6 py-2 rounded-full font-semibold shadow-md transition-all duration-300"
            >
              Contact for Marketing Proposals
            </a>
          </div>
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold mb-6 text-yellow-400">Subscribe to Our Newsletter</h2>
            <p className="text-gray-300 mb-4">
              Stay up-to-date with the latest news, features, and updates from our Web3 Social App. Subscribe to our newsletter and never miss an important announcement.
            </p>
            <form className="space-y-4" onSubmit={(e) => { handleSubmit(e) }}>
              <div>
                <label htmlFor="subscribe-email" className="block text-sm font-medium text-gray-300">Email</label>
                <input type="email" id="subscribe-email" name="subscribe-email" value={email}
                  onChange={handleInputChange} className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white focus:border-yellow-400 focus:ring-yellow-400" />
              </div>
              <button type="submit" className="bg-yellow-400 hover:bg-yellow-500 text-black px-6 py-2 rounded-full font-semibold shadow-md transition-all duration-300">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

