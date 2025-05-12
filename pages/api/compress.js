import connectDB from '../../utils/mongodb';
import Genome from '../../models/Genome';
import { compressGenome } from '../../utils/genomeUtils';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ message: 'Text is required' });
    }

    await connectDB();

    const { compressedData, originalLength } = compressGenome(text);

    const genome = await Genome.create({
      compressedData,
      originalLength,
    });

    res.status(200).json({ id: genome._id });
  } catch (error) {
    console.error('Compression error:', error);
    res.status(500).json({ message: 'Error compressing genome sequence' });
  }
} 