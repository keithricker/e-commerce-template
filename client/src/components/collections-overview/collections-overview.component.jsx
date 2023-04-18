import React from 'react';
import { useSelector } from 'react-redux';
import CollectionPreview from '../collection-preview/collection-preview.component';

const CollectionsOverview = ({collection}) => { 
    const previews = (collections) => collections ? Object.keys(collections).map(key => collections[key]) : []
    const collectionsFromState = useSelector(state => state.shop.collections) || []
    const collections = collection ? [collection] : previews(collectionsFromState)
    let count = collections.count
    return (
    <div className='collections-overview'>
        {
            collections.map(({ id,...other }) => {
              other.items = other.items.slice(0,4)
              other.count = count
              return <CollectionPreview key={id} {...other} />
            })
        }
    </div> 
    )
};

export default CollectionsOverview