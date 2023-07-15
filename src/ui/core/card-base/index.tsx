import { styled } from 'nativewind';
import type { CardProps } from 'react-native-ui-lib';
import { Card } from 'react-native-ui-lib';

export const SCard = styled(Card);
interface Props extends CardProps {
  className?: string;
  children: any;
}
export const CardBase = ({ className = '', children, ...props }: Props) => {
  return (
    <SCard
      className={`${className}
    `}
      {...props}
    >
      {children}
    </SCard>
  );
};
