import { CreditCard, Sparkles, Lock, Zap } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-6xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center space-y-8 py-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 rounded-full text-blue-600 dark:text-blue-400 text-sm font-medium">
            <Sparkles className="w-4 h-4" />
            Virtual Business Cards Platform
          </div>

          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white">
            Share Your Digital
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Business Card</span>
          </h1>

          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Modern, beautiful, and instant. Create your professional digital business card and share it with anyone, anywhere.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mt-16">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mb-4">
              <CreditCard className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Multiple Templates
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Choose from Modern, Minimal, or Classic designs. Each card is fully customizable with your brand colors.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center mb-4">
              <Lock className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Secure & Private
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Your cards are accessible via encrypted URLs. Only published cards are visible to the public.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center mb-4">
              <Zap className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Real-time Updates
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Update your card anytime from the admin panel. Changes reflect instantly on your public card.
            </p>
          </div>
        </div>

        {/* How It Works */}
        <div className="mt-20 text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12">
            How It Works
          </h2>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: '1', title: 'Create Account', desc: 'Sign up and access your admin panel' },
              { step: '2', title: 'Design Card', desc: 'Choose template and add your details' },
              { step: '3', title: 'Publish', desc: 'Make your card live with one click' },
              { step: '4', title: 'Share', desc: 'Share your unique URL everywhere' },
            ].map((item) => (
              <div key={item.step} className="space-y-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto">
                  {item.step}
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white">{item.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Example Format */}
        <div className="mt-20 text-center space-y-6">
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Your Card URL Format
          </h3>
          <div className="inline-block bg-gray-100 dark:bg-gray-800 px-6 py-4 rounded-lg">
            <code className="text-blue-600 dark:text-blue-400 font-mono text-lg">
              yoursite.com/<span className="text-purple-600 dark:text-purple-400">your-unique-id</span>
            </code>
          </div>
          <p className="text-gray-600 dark:text-gray-300 max-w-xl mx-auto">
            Each card gets a unique, encrypted URL that you can share via email, social media, or QR code.
          </p>
        </div>

        {/* Footer */}
        <div className="mt-20 pt-8 border-t border-gray-200 dark:border-gray-800 text-center text-gray-600 dark:text-gray-400">
          <p>Powered by Next.js & Supabase</p>
        </div>
      </div>
    </div>
  );
}
