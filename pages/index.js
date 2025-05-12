// pages/index.js
import { useState } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import Layout from '../components/Layout';

export default function Home() {
  const [text, setText] = useState('');
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [compressionId, setCompressionId] = useState('');
  const [copied, setCopied] = useState(false);
  const router = useRouter();

  const fadeVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.6 } },
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && (selectedFile.name.endsWith('.txt') || selectedFile.name.endsWith('.fasta'))) {
      setFile(selectedFile);
      setError('');
    } else {
      setError('Please select a valid .txt or .fasta file');
      setFile(null);
    }
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(compressionId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setCompressionId('');

    try {
      let content = text;
      if (file) content = await file.text();
      if (!content.trim()) throw new Error('Please enter text or upload a file');

      const response = await fetch('/api/compress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: content }),
      });

      const data = await response.json();
      console.log('API Response Data:', data); // Added for debugging

      if (!response.ok) {
        throw new Error(data?.message || 'Compression failed');
      }

      // Assuming your API returns the compression ID in a field named '_id'
      if (data?.id) {
        setCompressionId(data.id);
      } else {
        throw new Error('Compression successful, but ID not received.');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <motion.div
        className="max-w-4xl mx-auto"
        initial="hidden"
        animate="visible"
        variants={fadeVariants}
      >

        <motion.div className="text-center mb-12">
          <h1 className="font-heading text-5xl mb-4 bg-gradient-to-r from-[#ffc75f] via-[#ff6f91] to-[#845ec2] text-transparent bg-clip-text">
            MININOMES
          </h1>
          <p className="font-text text-xl text-white opacity-80">Compress Genome Sequence to its 4th!</p>
        </motion.div>


        <motion.div className="bg-[#101010]/80 backdrop-blur-md rounded-2xl p-8 shadow-[0_0_30px_rgba(132,94,194,0.2)] border border-[#845ec2]/20">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <label className="block font-heading text-[#ffc75f] mb-3 text-lg">Genomic Sequence</label>
              <div className="relative">
                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  className="w-full px-5 py-4 bg-[#151515] border border-[#845ec2]/30 rounded-xl text-[#e0e0e0] font-mono focus:ring-2 focus:ring-[#ff6f91]/50"
                  rows="8"
                  placeholder="Enter A, C, G, T sequence..."
                  style={{ resize: 'none' }}
                />
                <div className="absolute bottom-4 right-4 text-xs text-[#ff6f91]/70">
                  {text.length > 0 && `${text.length} characters`}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center">
              <div className="h-px bg-gradient-to-r from-transparent via-[#845ec2]/30 to-transparent flex-grow"></div>
              <span className="px-4 text-[#ffc75f] font-heading">OR</span>
              <div className="h-px bg-gradient-to-r from-transparent via-[#845ec2]/30 to-transparent flex-grow"></div>
            </div>

            <div>
              <label className="block font-heading text-[#ffc75f] mb-3 text-lg">Upload File</label>
              <div
                onClick={() => document.getElementById('file-upload').click()}
                className="cursor-pointer px-5 py-12 bg-[#151515]/80 border-2 border-dashed border-[#845ec2]/40 rounded-xl text-center hover:border-[#ff6f91]/50"
              >
                <svg className="h-12 w-12 mx-auto text-[#845ec2]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                <p className="mt-4 font-heading text-[#e0e0e0]">{file ? file.name : 'Drop .txt file here'}</p>
                <p className="mt-2 text-xs text-[#e0e0e0]/60 font-text">Supported formats: .txt</p>
                <input id="file-upload" type="file" accept=".txt,.fasta" onChange={handleFileChange} className="hidden" />
              </div>
            </div>

            {error && (
              <div className="px-4 py-3 bg-[#ff6f91]/10 border border-[#ff6f91]/30 rounded-lg text-[#ff6f91] text-sm">
                {error}
              </div>
            )}

            {compressionId && (
              <div className="p-5 border border-[#ffc75f]/40 rounded-xl bg-[#202020]/80 text-[#ffc75f] space-y-3 text-center">
                <p className="font-heading">Compression Successful!</p>
                <p className="text-sm font-mono text-[#e0e0e0] break-all">{compressionId}</p>
                <button
                  onClick={handleCopy}
                  type="button"
                  className="mt-2 px-4 py-2 bg-[#845ec2] hover:bg-[#6c4db0] text-white rounded-lg text-sm transition"
                >
                  {copied ? 'Copied!' : 'Copy Key'}
                </button>
                <p className="text-xs text-[#aaa] mt-1">Save this key and paste it in the <strong>Decompress</strong> page to retrieve your data.</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-[#845ec2] to-[#ff6f91] text-white py-4 rounded-xl font-heading text-lg tracking-wider shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <svg className="animate-spin h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Compressing...
                </div>
              ) : (
                'Compress'
              )}
            </button>
          </form>
        </motion.div>
      </motion.div>
    </Layout>
  );
}