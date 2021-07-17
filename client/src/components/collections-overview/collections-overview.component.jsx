import React from 'react';
import { connect } from 'react-redux';
import CollectionPreview from '../collection-preview/collection-preview.component';
import { selectCollection } from '../../redux/shop/shop.selectors'
import { selectCollectionsForPreview } from '../../redux/shop/shop.selectors';

const CollectionsOverview = ({ collections }) => { 
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
const mapStateToProps = (state,ownProps) => {
    return {
      collections: !ownProps.collection ? selectCollectionsForPreview(state) : [selectCollection(ownProps.collection.routeName)(state)]
    }
};
export default connect(mapStateToProps)(CollectionsOverview);