import React from 'react';
import { useSelector } from 'react-redux';
// import { selectCollection } from '../../redux/shop/shop.selectors'
import CollectionsOverview from '../../components/collections-overview/collections-overview.component';

const CollectionPage = ({ match }) => {
    console.log('match from collection component!',match)
    const collectionId = match.params.collectionId
    const collections = useSelector(state => state.shop.collections)
    console.log('thaaa collections',collections)
    const collection = collections[collectionId]
    return <CollectionsOverview collection={collection}></CollectionsOverview>
};

export default CollectionPage

/*
const mapStateToProps = (state, ownProps) => ({
    collection: selectCollection(ownProps.match.params.collectionId)(state)
})
export default connect(mapStateToProps)(CollectionPage);
*/