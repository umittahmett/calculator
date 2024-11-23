export interface ButtonProps {
  icon?: any;
  label?: string;
  kind?: 'operator' | 'character';
  action?: () => void;
  operation?: 'addition' | 'subtraction' | 'multiplication' | 'division' | 'percentage' | 'equals' | 'decimal-point' | 'clear' | 'plus-minus' | 'delete';
}