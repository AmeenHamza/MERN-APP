const ProductReducer = (state, action) => {
    switch (action.type) {

        case 'SORT_BY_PRICE':
            return { ...state, sort: action.payload }

        case 'FILTER_BY_DELIVERY':
            return { ...state, byFastDelivery: !state.byFastDelivery }

        case 'FILTER_BY_STOCK':
            return { ...state, byStock: !state.byStock }

        case 'FILTER_BY_RATING':
            return { ...state, byRating: action.payload }

        case 'FILTER_BY_SEARCH':
            return { ...state, searchQuery: action.payload }

        case 'CLEAR_FILTERS':
            return {
                sort : "",
                byStock: false,
                byFastDelivery: false,
                byRating: 0,
                searchQuery: ""
            }

        default:
            return state;
    }
}

export default ProductReducer