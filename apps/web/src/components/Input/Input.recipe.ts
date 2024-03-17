import { defineRecipe } from '@pandacss/dev';

export const inputRecipe = defineRecipe({
  className: 'input',
  description: 'Styles for the Input component',
  base: {
    display: 'flex',
    h: '10',
    w: 'full',
    rounded: 'lg',
    border: '1px solid',
    borderColor: 'keyplate.6',
    px: '3',
    py: '2',
    focusRingOffsetColor: 'background',

    _file: {
      border: 'none',
      bg: 'transparent',
      textStyle: 'sm',
      fontWeight: 'medium',
    },

    _placeholder: {
      color: 'keyplate.11',
    },

    _focusVisible: {
      outline: '2px solid transparent',
      outlineOffset: '2px',
      focusRingWidth: '2',
      focusRingColor: 'ring',
      focusRingOffsetWidth: '2',
    },

    _disabled: {
      cursor: 'not-allowed',
      opacity: '0.5',
    },
  },
});
