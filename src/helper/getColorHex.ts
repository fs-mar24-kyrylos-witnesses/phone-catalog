import { Color } from '../types/Color';

export function getColorHex(color: Color) {
  switch (color) {
    case 'black':
      return '#000000';
    case 'gold':
      return '#FFD700';
    case 'yellow':
      return '#FFFF00';
    case 'green':
      return '#008000';
    case 'midnightgreen':
      return '#004953';
    case 'silver':
      return '#C0C0C0';
    case 'spacegray':
      return '#4B4B4B';
    case 'red':
      return '#FF0000';
    case 'white':
      return '#FFFFFF';
    case 'purple':
      return '#800080';
    case 'coral':
      return '#FF7F50';
    case 'rosegold':
      return '#B76E79';
    case 'midnight':
      return '#191970';
    case 'spaceblack':
      return '#1C1C1C';
    case 'blue':
      return '#0000FF';
    case 'pink':
      return '#FFC0CB';
    case 'sierrablue':
      return '#4285F4';
    case 'graphite':
      return '#565656';
    case 'space gray':
      return '#4B4B4B'; // Same as 'spacegray'
    case 'space-gray':
      return '#4B4B4B'; // Same as 'spacegray'
    case 'rose gold':
      return '#B76E79'; // Same as 'rosegold'
    case 'sky-blue':
      return '#87CEEB';
    case 'starlight':
      return '#F5F5DC';
    default:
      return '#ffffff'; // default to white if color is not recognized
  }
}
