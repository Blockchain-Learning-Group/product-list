class Product extends React.Component {
  constructor(props) {
    super(props);
    // this.handleProductUpVote = this.handleProductUpVote.bind(this);
  }

  handleProductVote() {}

  render() {
    return (
      <div className='item'>
        <div className='image'>
          <img src={this.props.productImageUrl} />
        </div>
        <div className='middle aligned content'>
          <div className='header'>
            <a>
              <i className='large caret up icon' />Your first React Web Application
                31
            </a>
              {this.props.votes}
          </div>
          <div className='description'>
            <a href={this.props.url}>
              {this.props.title}
            </a>
            <p>{this.props.description}</p>
          </div>
          <div className='extra'>
            <span>Submitted by:</span>
            <img
              className='ui avatar image'
              src={this.props.submitterAvatarUrl}
            />
          </div>
        </div>
      </div>
    );
  }
}


class ProductList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
    };
  
    // this.handleProductUpVote = this.handleProductUpVote.bind(this);
  }

  componentDidMount() {
    this.setState({ products: ['Seed.products'] });
  }

  handleProductUpVote() {}

  render() {
    // const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
    const productComponents = SeedData.map((product) => (
      <Product
        key={'product-' + product.id}
        id={product.id}
        title={product.title}
        description={product.description}
        url={product.url}
        votes={product.votes}
        submitterAvatarUrl={product.submitterAvatarUrl}
        productImageUrl={product.productImageUrl}
      />
    ))

    return (
      <div className='ui unstackable items'>
        {productComponents}
      </div>
      );
  }
}


ReactDOM.render(
  <ProductList />,
  document.getElementById('content')
);