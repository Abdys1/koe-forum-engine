import { style } from '@vanilla-extract/css';
import { HEADER_TOTAL_HEIGHT } from '@/components/Navigation/Header.css';
import { mainBg } from '@/styles/shared.css';

export const page = style([mainBg, {
  position: 'relative',
  width: '100%',
  height: `calc(100vh - ${HEADER_TOTAL_HEIGHT})`,
  display: 'flex',
}]);
