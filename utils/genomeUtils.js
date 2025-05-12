// Compression mapping
const compressionMap = {
  'A': '00',
  'C': '01',
  'G': '10',
  'T': '11'
};

// Decompression mapping
const decompressionMap = {
  '00': 'A',
  '01': 'C',
  '10': 'G',
  '11': 'T'
};

export const compressGenome = (text) => {
  // Remove any whitespace and convert to uppercase
  const cleanText = text.replace(/\s/g, '').toUpperCase();
  
  // Convert each character to its 2-bit representation
  let binaryString = '';
  for (let char of cleanText) {
    if (compressionMap[char]) {
      binaryString += compressionMap[char];
    }
  }

  // Convert binary string to ASCII characters
  let compressedData = '';
  for (let i = 0; i < binaryString.length; i += 8) {
    const byte = binaryString.slice(i, i + 8).padEnd(8, '0');
    compressedData += String.fromCharCode(parseInt(byte, 2));
  }

  return {
    compressedData,
    originalLength: cleanText.length
  };
};

export const decompressGenome = (compressedData, originalLength) => {
  // Convert ASCII characters back to binary string
  let binaryString = '';
  for (let char of compressedData) {
    const byte = char.charCodeAt(0).toString(2).padStart(8, '0');
    binaryString += byte;
  }

  // Convert binary string back to genome sequence
  let decompressedText = '';
  for (let i = 0; i < originalLength * 2; i += 2) {
    const bits = binaryString.slice(i, i + 2);
    if (decompressionMap[bits]) {
      decompressedText += decompressionMap[bits];
    }
  }

  return decompressedText;
}; 