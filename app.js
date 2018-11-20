class ProductList extends React.Component {
  state = {
    products: [],
    productRegistry: null,
    web3: null
  };

  async componentDidMount() {
    const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:9545"));
    await window.loadBuildArtifacts();

    const networkId = await window.getNetwork(web3);
    const ProductRegistryArtifacts = window.buildArtifacts['ProductRegistry1'];
    const abi = ProductRegistryArtifacts.abi;
    const address = ProductRegistryArtifacts.networks[networkId].address;
    const contract = web3.eth.contract(abi).at(address);

    // Log the contract object to the browser's developer console
    console.log(contract)

    this.setState({ web3: web3 });
    this.setState({ products: Seed.products });
    this.setState({ productRegistry: contract });
  }

  handleProductUpVote = async (productId) => {
    // Onchain interaction
    // const { productRegistry, web3 } = this.state;
    
    // // Default to the 0th account
    // const sender = web3.eth.accounts[0];
    // const gas = 1e6
    // console.log(
    //   await productRegistry.addProduct('testtest', 'ipfsURL', { from: sender, gas: gas })
    // );

    // Client side interaction
    const nextProducts = this.state.products.map((product) => {
      if (product.id === productId) {
        return Object.assign({}, product, {
          votes: product.votes + 1,
        });
      } else {
        return product;
      }
    });
    this.setState({
      products: nextProducts,
    });
  }

  render() {
    const products = this.state.products.sort((a, b) => (
      b.votes - a.votes
    ));
    const productComponents = products.map((product) => (
      <Product
        key={'product-' + product.id}
        id={product.id}
        title={product.title}
        description={product.description}
        url={product.url}
        votes={product.votes}
        submitterAvatarUrl={product.submitterAvatarUrl}
        productImageUrl={product.productImageUrl}
        onVote={this.handleProductUpVote}
      />
    ));
    return (
      <div className='ui unstackable items'>
        {productComponents}
      </div>
    );
  }
}

class Product extends React.Component {
  handleUpVote = () => (
    this.props.onVote(this.props.id)
  );

  render() {
    return (
      <div className='item'>
        <div className='image'>
          <img src={this.props.productImageUrl} />
        </div>
        <div className='middle aligned content'>
          <div className='header'>
            <a onClick={this.handleUpVote}>
              <i className='large caret up icon' />
            </a>
            {this.props.votes}
          </div>
          <div className='description'>
            <a href={this.props.url}>
              {this.props.title}
            </a>
            <p>
              {this.props.description}
            </p>
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

ReactDOM.render(
  <ProductList />,
  document.getElementById('content')
);