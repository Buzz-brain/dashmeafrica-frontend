import { Card } from 'react-bootstrap';

const Product = ({ product }) => {
  // Assuming your backend serves images from 'http://localhost:5000/uploads/'
  const imageUrl = `https://dashmeafrica.onrender.com/${product.image}`;

  return (
    <Card className="my-3 p-3 rounded">
      <a href={`/product/${product._id}`}>
        <Card.Img src={imageUrl} variant="top" />
      </a>

      <Card.Body>
        <div href={`/product/${product._id}`}>
          <Card.Title as="div" className="product-title">
            <strong>{product.name}</strong>
          </Card.Title>
          <Card.Text as="div" className="product-price">
          <strong>{"N"+product.price}</strong>
          </Card.Text>
        </div>
      </Card.Body>
    </Card>
  );
};

export default Product;
