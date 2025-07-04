const cart = {
  state: {
    items: []
  },

  // Initialize the cart
  init() {
    this.loadFromLocalStorage();
    return this;
  },

  // Get all cart items
  getItems() {
    return [...this.state.items]; // Return a copy to prevent direct state mutation
  },

  // Add item to cart or increase quantity if already exists
  addItem(product) {
    if (!product || !product.id) {
      console.error('Invalid product:', product);
      return;
    }

    const existingItem = this.state.items.find(item => item.id === product.id);
    
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      this.state.items.push({
        ...product,
        quantity: 1,
        addedAt: new Date().toISOString() // Track when item was added
      });
    }
    this.saveToLocalStorage();
    return this.getItems();
  },

  // Decrease item quantity or remove if quantity becomes 0
  decreaseQuantity(productId) {
    const itemIndex = this.state.items.findIndex(item => item.id === productId);
    
    if (itemIndex !== -1) {
      if (this.state.items[itemIndex].quantity > 1) {
        this.state.items[itemIndex].quantity -= 1;
      } else {
        this.state.items.splice(itemIndex, 1);
      }
      this.saveToLocalStorage();
    }
    return this.getItems();
  },

  // Remove item completely from cart
  removeItem(productId) {
    this.state.items = this.state.items.filter(item => item.id !== productId);
    this.saveToLocalStorage();
    return this.getItems();
  },

  // Get total number of items in cart (sum of quantities)
  getCount() {
    return this.state.items.reduce((total, item) => total + item.quantity, 0);
  },

  // Get total price of all items in cart
  getTotalPrice() {
    return this.state.items.reduce(
      (total, item) => total + (item.price * item.quantity),
      0
    ).toFixed(2);
  },

  // Clear the entire cart
  clearCart() {
    this.state.items = [];
    this.saveToLocalStorage();
    return this.getItems();
  },

  // Save cart to localStorage
  saveToLocalStorage() {
    try {
      localStorage.setItem('cart', JSON.stringify(this.state.items));
    } catch (error) {
      console.error('Failed to save cart to localStorage:', error);
    }
  },

  // Load cart from localStorage
  loadFromLocalStorage() {
    try {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        this.state.items = JSON.parse(savedCart);
        
        // Migration for older cart items that might not have quantity
        this.state.items = this.state.items.map(item => ({
          ...item,
          quantity: item.quantity || 1
        }));
      }
    } catch (error) {
      console.error('Failed to load cart from localStorage:', error);
      this.state.items = [];
    }
  },

  // Get a specific item from cart
  getItem(productId) {
    return this.state.items.find(item => item.id === productId);
  },

  // Check if an item exists in cart
  hasItem(productId) {
    return this.state.items.some(item => item.id === productId);
  }
};

// Initialize and export the cart instance
export default cart.init();