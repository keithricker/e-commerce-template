import React from 'react';
import { useSelector } from 'react-redux';
import CollectionsOverview from '../../components/collections-overview/collections-overview.component';

const CollectionPage = ({ match }) => {
    const collectionId = match.params.collectionId
    const collections = useSelector(state => state.shop.collections)
    const collection = collections[collectionId]
    return <CollectionsOverview collection={collection}></CollectionsOverview>
};

export default CollectionPage