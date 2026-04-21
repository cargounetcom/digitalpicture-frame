// Example to fetch products from your WP site
async function getProducts() {
  const response = await fetch('https://wp.digitalpictureframe.shop/wp-json/wc/v3/products', {
    headers: {
      // You need a WooCommerce Consumer Key & Secret from WP Admin
      'Authorization': 'Basic ' + Buffer.from('YOUR_KEY:YOUR_SECRET').toString('base64')
    }
  });
  return response.json();
}
