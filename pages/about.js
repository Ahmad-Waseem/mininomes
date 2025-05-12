// pages/about.js
import { motion } from 'framer-motion';
import Layout from '@/components/layout';

export default function About() {
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

  const features = [
    {
      title: "2-Bit Encoding",
      description: "Our compression algorithm uses 2-bit encoding to efficiently store A, C, G, T bases, reducing file size by up to 75%.",
      icon: "🧬"
    },
    {
      title: "Zero Data Loss",
      description: "Unlike other compression methods, our technology guarantees 100% fidelity with no information loss during compression.",
      icon: "✓"
    },
    {
      title: "Secure Storage",
      description: "All sequences are stored with industry-standard encryption and are accessible only with your unique ID.",
      icon: "🔒"
    },
    {
      title: "Fast Processing",
      description: "Our optimized algorithms handle even large genome sequences with exceptional speed and efficiency.",
      icon: "⚡"
    },
    {
      title: "Research Ready",
      description: "Designed specifically for genomics research, supporting standard file formats used in bioinformatics.",
      icon: "🔬"
    },
    {
      title: "Cloud Integration",
      description: "Easy integration with cloud storage solutions and bioinformatics pipelines.",
      icon: "☁️"
    }
  ];

  return (
    <Layout>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-5xl mx-auto"
      >
        <motion.div variants={itemVariants} className="text-center mb-12">
          <h1 className="font-heading text-5xl mb-4 bg-gradient-to-r from-[#845ec2] via-[#ff6f91] to-[#ffc75f] text-transparent bg-clip-text">
            About Our Technology
          </h1>
          <p className="font-text text-xl text-gray-300 max-w-3xl mx-auto">
            Advanced genome compression solution designed for researchers and bioinformaticians
          </p>
        </motion.div>

        <motion.div variants={itemVariants} className="mb-16">
          <div className="bg-[#101010]/80 backdrop-blur-md rounded-2xl p-8 shadow-[0_0_30px_rgba(132,94,194,0.2)] border border-[#845ec2]/20">
            <h2 className="font-heading text-2xl text-[#ffc75f] mb-6">Our Mission</h2>
            <p className="text-[#e0e0e0] mb-4 leading-relaxed">
              We developed this genome compression tool to address the growing storage challenges in genomics research. 
              With the exponential growth of genomic data, efficient compression has become essential for laboratories 
              and research institutions worldwide.
            </p>
            <p className="text-[#e0e0e0] leading-relaxed">
              Our platform utilizes cutting-edge 2-bit encoding specifically optimized for genomic sequences, allowing
              researchers to store and transmit large datasets with minimal storage requirements while maintaining
              perfect sequence fidelity.
            </p>
          </div>
        </motion.div>

        <motion.div variants={itemVariants}>
          <h2 className="font-heading text-2xl text-center text-[#ffc75f] mb-10">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(255, 199, 95, 0.4)" }}
                className="bg-[#1a1a1a]/90 backdrop-blur-md rounded-xl p-6 border border-[#845ec2]/20 text-white"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="font-heading text-xl text-[#ff6f91] mb-2">{feature.title}</h3>
                <p className="text-gray-300 text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </Layout>
  );
}
