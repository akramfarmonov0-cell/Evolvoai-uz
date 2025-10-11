const { createCanvas } = require('canvas');
const fs = require('fs');
const path = require('path');

const sizes = [72, 96, 128, 144, 152, 192, 384, 512];

function drawLogo(canvas, size) {
  const ctx = canvas.getContext('2d');
  
  // Clear canvas
  ctx.clearRect(0, 0, size, size);
  
  // Gradient background
  const gradient = ctx.createLinearGradient(0, 0, size, size);
  gradient.addColorStop(0, '#3B82F6');
  gradient.addColorStop(1, '#1D4ED8');
  
  // Rounded rectangle background
  const radius = size * 0.2;
  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.moveTo(radius, 0);
  ctx.lineTo(size - radius, 0);
  ctx.quadraticCurveTo(size, 0, size, radius);
  ctx.lineTo(size, size - radius);
  ctx.quadraticCurveTo(size, size, size - radius, size);
  ctx.lineTo(radius, size);
  ctx.quadraticCurveTo(0, size, 0, size - radius);
  ctx.lineTo(0, radius);
  ctx.quadraticCurveTo(0, 0, radius, 0);
  ctx.closePath();
  ctx.fill();
  
  // Letter "E"
  ctx.fillStyle = '#FFFFFF';
  ctx.font = `bold ${size * 0.6}px Arial`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('E', size / 2, size / 2);
  
  // Sparkle
  ctx.fillStyle = '#FCD34D';
  const sparkleSize = size * 0.08;
  const sparkleX = size * 0.72;
  const sparkleY = size * 0.28;
  
  // Star shape
  ctx.beginPath();
  for (let i = 0; i < 4; i++) {
    const angle = (Math.PI / 2) * i;
    const x = sparkleX + Math.cos(angle) * sparkleSize;
    const y = sparkleY + Math.sin(angle) * sparkleSize;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.closePath();
  ctx.fill();
  
  // Smaller rotated star
  ctx.save();
  ctx.translate(sparkleX, sparkleY);
  ctx.rotate(Math.PI / 4);
  ctx.beginPath();
  for (let i = 0; i < 4; i++) {
    const angle = (Math.PI / 2) * i;
    const x = Math.cos(angle) * (sparkleSize * 0.7);
    const y = Math.sin(angle) * (sparkleSize * 0.7);
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

async function generateIcons() {
  const publicDir = path.join(__dirname, 'public');
  
  console.log('🎨 EvolvoAI PWA Icons yaratilmoqda...\n');
  
  for (const size of sizes) {
    const canvas = createCanvas(size, size);
    drawLogo(canvas, size);
    
    const buffer = canvas.toBuffer('image/png');
    const filename = `icon-${size}x${size}.png`;
    const filepath = path.join(publicDir, filename);
    
    fs.writeFileSync(filepath, buffer);
    console.log(`✅ ${filename} yaratildi`);
  }
  
  // Create favicon.ico (using 32x32 from 72x72)
  const faviconCanvas = createCanvas(32, 32);
  drawLogo(faviconCanvas, 32);
  const faviconBuffer = faviconCanvas.toBuffer('image/png');
  fs.writeFileSync(path.join(publicDir, 'favicon.ico'), faviconBuffer);
  console.log('✅ favicon.ico yaratildi');
  
  console.log('\n🎉 Barcha iconlar muvaffaqiyatli yaratildi!');
  console.log(`📁 Joylanish: ${publicDir}`);
}

generateIcons().catch(console.error);
