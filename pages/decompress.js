// pages/decompress.js
import { useState } from 'react';
import { motion } from 'framer-motion';
import Layout from '@/components/layout';

export default function Decompress() {
  const [id, setId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const response = await fetch(`/api/decompress/${id}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Decompression failed');
      }

      // Create a blob and download the file
      const blob = new Blob([data.text], { type: 'text/plain' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `decompressed_${id}.txt`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      
      setSuccess(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  return (
    <Layout>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-4xl mx-auto"
      >
        <motion.div variants={itemVariants} className="text-center mb-12">
          <h1 className="font-heading text-5xl mb-4 bg-gradient-to-r from-[#ffc75f] via-[#ff6f91] to-[#845ec2] text-transparent bg-clip-text">
            Genome Decompression
          </h1>
          <p className="font-text text-xl text-gray-300">
            Retrieve your original sequence with perfect fidelity
          </p>
        </motion.div>

        <motion.div 
          variants={itemVariants}
          className="bg-[#101010]/80 backdrop-blur-md rounded-2xl p-8 shadow-[0_0_30px_rgba(255,111,145,0.2)] border border-[#ff6f91]/20"
        >
          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <label className="block font-heading text-[#ffc75f] mb-3 text-lg">
                Compression ID
              </label>
              <motion.div 
                whileTap={{ scale: 0.995 }}
                className="relative"
              >
                <div className="flex">
                  <div className="bg-[#181818] border border-r-0 border-[#ff6f91]/30 rounded-l-xl px-4 flex items-center">
                    <span className="text-[#ff6f91]">#</span>
                  </div>
                  <input
                    type="text"
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                    className="flex-1 px-5 py-4 bg-[#151515] border border-[#ff6f91]/30 rounded-r-xl text-[#e0e0e0] focus:outline-none focus:ring-2 focus:ring-[#ff6f91]/50 transition-all duration-300 font-mono"
                    placeholder="Enter your unique compression identifier"
                    required
                  />
                </div>
              </motion.div>
              <p className="mt-2 text-[#e0e0e0]/60 text-sm font-text">
                This is the unique ID you received after compressing your sequence
              </p>
            </div>

            <div className="flex flex-col space-y-6">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ 
                  opacity: success ? 1 : 0, 
                  scale: success ? 1 : 0.9,
                  height: success ? 'auto' : 0 
                }}
                className="px-4 py-3 bg-[#ffc75f]/10 border border-[#ffc75f]/30 rounded-lg text-[#ffc75f] text-sm overflow-hidden"
              >
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Decompression successful! Your file has started downloading.
                </div>
              </motion.div>

              {error && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="px-4 py-3 bg-[#ff6f91]/10 border border-[#ff6f91]/30 rounded-lg text-[#ff6f91] text-sm"
                >
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {error}
                  </div>
                </motion.div>
              )}
            </div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-[#ffc75f] to-[#ff6f91] text-white py-4 rounded-xl font-heading text-lg tracking-wider shadow-lg shadow-[#ff6f91]/20 hover:shadow-xl hover:shadow-[#ff6f91]/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Retrieving Sequence
                  </div>
                ) : (
                  'Decompress Genome'
                )}
              </button>
            </motion.div>
          </form>
        </motion.div>

        <motion.div 
          variants={itemVariants}
          className="mt-16 flex justify-center"
        >
          <div className="bg-[#101010]/40 backdrop-blur-sm rounded-xl p-6 max-w-2xl">
            <h3 className="font-heading text-center text-xl text-[#ffc75f] mb-4">How It Works</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-[#845ec2]/20 rounded-full flex items-center justify-center mb-3">
                  <span className="text-xl">1</span>
                </div>
                <p className="text-sm text-[#e0e0e0]/80">Enter your compression ID</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-[#ff6f91]/20 rounded-full flex items-center justify-center mb-3">
                  <span className="text-xl">2</span>
                </div>
                <p className="text-sm text-[#e0e0e0]/80">Our system retrieves your data</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-[#ffc75f]/20 rounded-full flex items-center justify-center mb-3">
                  <span className="text-xl">3</span>
                </div>
                <p className="text-sm text-[#e0e0e0]/80">Original sequence downloads automatically</p>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </Layout>
  );
}