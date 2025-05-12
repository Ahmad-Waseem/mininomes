// components/Layout.jsx
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';

const sidebarLinks = [
  { path: '/', label: 'Compress', icon: '🧬' },
  { path: '/decompress', label: 'Decompress', icon: '🔍' },
  { path: '/about', label: 'About', icon: 'ℹ️' },
];

export default function Layout({ children }) {
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();
  
  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className="bg-black text-white min-h-screen flex relative overflow-hidden">
      {/* Background animated gradient */}
      <div className="absolute inset-0 z-0">
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-[#845ec2]/20 via-[#000000] to-[#ff6f91]/10"
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
        />
        
        {/* Animated particles/stars */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-[#ffc75f] rounded-full"
              initial={{ 
                x: Math.random() * 100 + '%', 
                y: Math.random() * 100 + '%',
                opacity: Math.random() * 0.5 + 0.3,
              }}
              animate={{ 
                y: [null, Math.random() * 100 + '%'],
                opacity: [null, Math.random() * 0.5 + 0.3],
              }}
              transition={{ 
                duration: Math.random() * 10 + 20,
                repeat: Infinity,
                repeatType: 'reverse',
              }}
            />
          ))}
        </div>
      </div>

      {/* Floating sidebar */}
      <motion.div
        className="fixed left-6 top-1/2 -translate-y-1/2 z-20"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, type: 'spring' }}
      >
        <div className="bg-[#101010]/80 backdrop-blur-lg p-4 rounded-2xl shadow-[0_0_25px_rgba(132,94,194,0.3)] border border-[#845ec2]/30">
          <div className="flex flex-col items-center mb-6">
            <motion.div 
              className="w-14 h-14 rounded-full bg-gradient-to-br from-[#845ec2] to-[#ff6f91] flex items-center justify-center mb-2"
              whileHover={{ scale: 1.1 }}
            >
              <span className="text-2xl">🧪</span>
            </motion.div>
            <h3 className="font-heading text-sm tracking-wider text-center">GENOME<br/>TOOLS</h3>
          </div>
          
          <div className="space-y-6">
            {sidebarLinks.map((link) => (
              <Link href={link.path} key={link.path}>
                <motion.div
                  className={`flex flex-col items-center cursor-pointer transition-colors group ${
                    router.pathname === link.path ? "text-[#ffc75f]" : "text-gray-300"
                  }`}
                  whileHover={{ scale: 1.1 }}
                >
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-xl
                    ${router.pathname === link.path 
                      ? "bg-gradient-to-br from-[#845ec2] to-[#ff6f91]" 
                      : "bg-[#202020] group-hover:bg-[#303030]"}`}
                  >
                    {link.icon}
                  </div>
                  <span className="text-xs mt-1 font-heading tracking-wider">{link.label}</span>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Content area */}
      <div className="flex-1 ml-28">
        <AnimatePresence mode="wait">
          {isMounted && (
            <motion.main
              key={router.pathname}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="py-10 px-10 max-w-6xl mx-auto"
            >
              {children}
            </motion.main>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}