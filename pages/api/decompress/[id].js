import connectDB from '../../../utils/mongodb';
import Genome from '../../../models/Genome';
import { decompressGenome } from '../../../utils/genomeUtils';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { id } = req.query;

    if (!id) {
      return res.status(400).json({ message: 'ID is required' });
    }

    await connectDB();

    const genome = await Genome.findById(id);

    if (!genome) {
      return res.status(404).json({ message: 'Compressed genome not found' });
    }

    const decompressedText = decompressGenome(genome.compressedData, genome.originalLength);

    res.status(200).json({ text: decompressedText });
  } catch (error) {
    console.error('Decompression error:', error);
    res.status(500).json({ message: 'Error decompressing genome sequence' });
  }
} 