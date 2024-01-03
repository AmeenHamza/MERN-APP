import { useCart } from '../context/Context';
import './css/Products.css';
import { Card, Filter } from '../components';
import { FidgetSpinner } from 'react-loader-spinner'

const Products = () => {

    const { userState,state: { products }, productState: {
        byStock,
        sort,
        byFastDelivery,
        byRating,
        searchQuery
    }, productDispatch } = useCart();

    const filterProducts = () => {
        let sortedProducts = products;

        if (sort) {
            sortedProducts = sortedProducts.sort((a, b) => (
                sort === 'lowToHigh' ? a.price - b.price : b.price - a.price
            ))
        }

        if (!byStock) {
            sortedProducts = sortedProducts.filter((prod) => prod.rating.count > 150)
        }

        if (byFastDelivery) {
            sortedProducts = sortedProducts.filter((prod) => prod.rating.count > 250)
        }

        if (byRating) {
            sortedProducts = sortedProducts.filter((prod) => prod.rating.rate >= byRating)
        }

        if (searchQuery) {
            sortedProducts = sortedProducts.filter((prod) => prod.title.toLowerCase().includes(searchQuery))
        }

        return sortedProducts;
    }

    return (
        <>
            <div className="container-fluid">
                <div className="row gap-xl-5 gap-lg-5 gap-md-5">
                    <div className="col-lg-3 col-xl-3 col-md-12 col-sm-12 col-12">
                        {/* Filter Component */}
                        <Filter />
                    </div>
                    <div className="col-lg-8 col-xl-8 col-md-12 col-sm-12 col-12 mt-5 mt-xl-0 mt-lg-0">
                        <div className="products-container row justify-content-evenly">
                            {
                                products.length > 0 ? (
                                    filterProducts().map((prod) => (
                                        <div key={prod.id} className="col-lg-4 col-md-4 col-sm-5 col-5 my-xl-5 my-lg-5 my-0">
                                            <Card details={prod} />
                                        </div>
                                    ))
                                ) : (
                                    <div className='custom-loader'>
                                        <FidgetSpinner
                                            visible={true}
                                            height="100"
                                            width="100"
                                            ariaLabel="dna-loading"
                                            wrapperStyle={{}}
                                            wrapperClass="dna-wrapper"
                                            ballColors={['#ff0000', '#00ff00', '#0000ff']}
                                            backgroundColor="#F4442E"
                                        />
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Products