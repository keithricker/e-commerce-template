import React, { useState } from 'react';
import { connect } from 'react-redux';
import { selectCollection } from '../../redux/shop/shop.selectors'
import CollectionsOverview from '../../components/collections-overview/collections-overview.component';

const CollectionPage = ({ collection, match }) => {
    console.log('collection',collection);
    console.log('match',match)
    return <CollectionsOverview collection={collection}></CollectionsOverview>
};
const mapStateToProps = (state, ownProps) => ({
    collection: selectCollection(ownProps.match.params.collectionId)(state)
})
export default connect(mapStateToProps)(CollectionPage);