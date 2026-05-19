type CartSelection = {
  id: string;
  selectedColour?: {
    id: string;
  };
};

export const getCartSelectionKey = (productId: string, selectedColourId?: string) => {
  return selectedColourId ? `${productId}::${selectedColourId}` : productId;
};

export const isSameCartSelection = (
  item: CartSelection,
  productId: string,
  selectedColourId?: string
) => {
  return getCartSelectionKey(item.id, item.selectedColour?.id) === getCartSelectionKey(productId, selectedColourId);
};
