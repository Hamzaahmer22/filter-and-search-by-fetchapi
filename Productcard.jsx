import React,{useEffect,useState} from "react";
const Productcard = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [category, setCategory] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
  
    useEffect(() => {
      const fetchProducts = async () => {
        try {
          const response = await fetch('https://fakestoreapi.com/products');
          const data = await response.json();
          setProducts(data);
          setFilteredProducts(data);
        } catch (error) {
          console.error('Error fetching the products:', error);
        }
      };
  
      fetchProducts();
    }, []);
  
    useEffect(() => {
      let filtered = products;
  
      if (category) {
        filtered = filtered.filter(product => product.category === category);
      }
  
      if (maxPrice) {
        filtered = filtered.filter(product => product.price <= maxPrice);
      }
  
      if (searchTerm) {
        filtered = filtered.filter(product =>
          product.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
  
      setFilteredProducts(filtered);
    }, [category, maxPrice, searchTerm, products]);
  
    return (
      <div>
        <h1>Products Render</h1>
  
        <div>
          <input
            type="text"
            placeholder="Search by title"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ margin: '15px', padding: '5px', borderRadius: '5px', border: '1px solid #ccc' }}
          />
  <br></br>
          <label>
          Sort By Category
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              style={{ margin: '15px', padding: '5px', borderRadius: '5px', border: '1px solid #ccc' }}
            >
      <br></br>          
              <option value="">Sort by category</option>
              <option value="electronics">Electricss</option>
              <option value="jewelery">ladies accessories</option>
              <option value="men's clothing">boy's Clothing</option>
              <option value="women's clothing">Women's Clothing</option>
            </select>
          </label>
  <br></br>
          <label>
            Filter by max price:
            <input
              type="number"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              placeholder="Enter max price"
              style={{ margin: '15px', padding: '5px', borderRadius: '5px', border: '1px solid #ccc' }}
            />
          </label>
        </div>
  
        <ul>
          {filteredProducts.map((product, index) => (
            <li key={index}>
              <h2>{product.title}</h2>
              <p>{product.category}</p>
              <p>${product.price}</p>
              {product.image && <img src={product.image} alt={product.title} style={{ width: '100px' }} />}
            </li>
          ))}
        </ul>
      </div>
    );
  };




export default Productcard;