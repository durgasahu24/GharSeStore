export const navigationData = {
  categories: [

    {
      id: 'men',
      name: 'Men',
      featured: [
        {
          name: 'New Arrivals',
          id: '#',
          imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-04-detail-product-shot-01.jpg',
          imageAlt: 'Drawstring top with elastic loop closure and textured interior padding.',
        },
        {
          name: 'Artwork Tees',
          id: '#',
          imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-02-image-card-06.jpg',
          imageAlt:
            'Three shirts in gray, white, and blue arranged on table with same line drawing of hands and shapes overlapping on front of shirt.',
        },
      ],
      sections: [
        {
          id: 'clothing',
          name: 'Clothing',
          items: [
            { name: 'Shirt', id: 'shirt' },
            { name: 'Men Jeans', id: 'men_jeans' },
            { name: 'Mens Kurtas', id: 'mens_kurta' },
            { name: 'Sweaters', id: 'Sweaters' },
            { name: 'T-Shirts', id: 't-shirt' },
            { name: 'Jackets', id: 'Jackets' },
            { name: 'Activewear', id: 'Activewear' },

          ],
        },
        {
          id: 'accessories',
          name: 'Accessories',
          items: [
            { name: 'Watches', id: 'Watches' },
            { name: 'Wallets', id: 'Wallets' },
            { name: 'Bags', id: 'Bags' },
            { name: 'Sunglasses', id: 'Sunglasses' },
            { name: 'Hats', id: 'Hats' },
            { name: 'Belts', id: 'Belts' },
          ],
        },
        {
          id: 'brands',
          name: 'Brands',
          items: [
            { name: 'Re-Arranged', id: 'Re-Arranged' },
            { name: 'Counterfeit', id: 'Counterfeit' },
            { name: 'Full Nelson', id: 'Full Nelson' },
            { name: 'My Way', id: 'My Way' },
          ],
        },
      ],
    },
    {
      id: 'women',
      name: 'Women',
      featured: [
        {
          name: 'New Arrivals',
          href: '/',
          imageSrc: 'https://tailwindui.com/img/ecommerce-images/mega-menu-category-01.jpg',
          imageAlt: 'Models sitting back to back, wearing Basic Tee in black and bone.',
        },
        {
          name: 'Basic Tees',
          href: '/',
          imageSrc: 'https://tailwindui.com/img/ecommerce-images/mega-menu-category-02.jpg',
          imageAlt: 'Close up of Basic Tee fall bundle with off-white, ochre, olive, and black tees.',
        },
      ],
      sections: [
        {
          id: 'clothing',
          name: 'Clothing',
          items: [
            { name: 'Tops', id: "top", href: `{women/clothing/tops}` },
            { name: 'Dresses', id: "dresses", href: `{women/clothing/dresses}` },
            { name: 'Women Jeans', id: 'women_jeans' },
            { name: 'Lengha Choli', id: 'lengha_choli' },
            { name: 'Sweaters', id: 'sweater' },
            { name: 'T-Shirts', id: 't-shirt' },
            { name: 'Jackets', id: 'jacket' },
            { name: 'Gouns', id: 'gouns' },
            { name: 'Sarees', id: 'saree' },
            { name: 'Kurtas', id: 'kurtas' },
          ],
        },
        {
          id: 'accessories',
          name: 'Accessories',
          items: [
            { name: 'Watches', id: 'watch' },
            { name: 'Wallets', id: 'wallet' },
            { name: 'Bags', id: 'bag' },
            { name: 'Sunglasses', id: 'sunglasse' },
            { name: 'Hats', id: 'hat' },
            { name: 'Belts', id: 'belt' },
          ],
        },
        {
          id: 'brands',
          name: 'Brands',
          items: [
            { name: 'Full Nelson', id: 'Full Nelson' },
            { name: 'My Way', id: 'My Way' },
            { name: 'Re-Arranged', id: 'Re-Arranged' },
            { name: 'Counterfeit', id: 'Counterfeit' },
            { name: 'Significant Other', id: 'Significant Other' },
          ],
        },
      ],
    },
  ],
  pages: [
    { name: 'Company', id: '/' },
    { name: 'Stores', id: '/' },
  ],
}




