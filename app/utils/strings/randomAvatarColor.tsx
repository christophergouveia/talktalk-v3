import { colors } from '@/app/components/functionals/ColorsSelector';

export class RandomAvatarColor {
  static get() {
    const randomColor = Object.keys(colors);
    const randomIndex = Math.floor(Math.random() * randomColor.length);
    return colors[randomIndex];
  }
}
