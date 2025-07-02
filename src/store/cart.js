const cart = {
  items: [],
  addItem(product) {
    const existing = this.items.find(item => item.id === product.id)
    if (existing) {
      existing.quantity += 1
    } else {
      this.items.push({ ...product, quantity: 1 })
    }
  },
  getItems() {
    return this.items
  },
  getCount() {
    return this.items.reduce((acc, item) => acc + item.quantity, 0)
  }
}

export default cart
