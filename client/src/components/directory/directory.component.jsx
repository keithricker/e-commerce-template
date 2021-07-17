import React from 'react';
import { connect } from 'react-redux';
import MenuItem from '../menu-item/menu-item.component';
import { selectDirectorySections } from '../../redux/directory/directory.selectors';
import './directory.styles.scss';

const Directory = ({directorySections}) => {
    return (
        <div className="directory-menu">
            {
              directorySections.map(({id, ...otherSectionProps}) => {
                console.log(otherSectionProps)
                return (
                  <MenuItem key={id} {...otherSectionProps} />
                )
              })
            }
        </div>
    )
}

const mapStateToProps = state => ({
  directorySections: selectDirectorySections(state)
})
export default connect(mapStateToProps)(Directory);