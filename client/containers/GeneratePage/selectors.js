import { fromJS } from 'immutable'
import { createSelector } from 'reselect'

  /**
   * Direct selector to the homepage state domain (specified in ~/routes.js)
   */
const selectGeneratePageDomain = () => (state, ownProps) =>
{
  const generateState = state.get('generatePage')
  const query = ownProps.location.query

  return fromJS({
    ...generateState,
    width: query.width,
    height: query.height
  })
}

  /**
   * Other specific selectors
   */


  /**
   * Default selector used by HomePage
   */

const selectGeneratePage = () => createSelector(
  selectGeneratePageDomain(),
  (substate) => substate.toJS()
)

export default selectGeneratePage
export {
  selectGeneratePageDomain
}
