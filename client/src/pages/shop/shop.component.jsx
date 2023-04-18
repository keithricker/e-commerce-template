import React, { useEffect } from 'react';
import { Route } from 'react-router-dom';
import CollectionPage from '../collection/collection.component';
import CollectionsOverview from '../../components/collections-overview/collections-overview.component';
import { useSelector, useDispatch } from 'react-redux';
import { shopThunks } from '../../store/redux/shop/shop-slice'
import { Spinner } from '../../components/ui/loading/loading.component'

const ShopPage = ({ match }) => {
  const dispatch = useDispatch()
  const fetchCollections = shopThunks.fetchCollections
  const shop = useSelector(state => state.shop)
  const isFetching = shop.isPending
  const error = shop.error
  const collections = useSelector(state => state.shop.collections)

  useEffect(() => {
    (!collections || collections.constructor.name !== 'Object') && dispatch(fetchCollections())
  },[])

  if (isFetching || !collections) {
    return <Spinner />
  }

  if (error) {
    console.error(error)
    return <h1>Error!</h1>
  }
    return (
        <div className="shop-page">
            <Route exact path={`${match.path}`} render={(props) => <CollectionsOverview {...props} /> } />
            <Route path={`${match.path}/:collectionId`} render={(props) => <CollectionPage {...props} />} />
        </div>
    )
}

export default ShopPage