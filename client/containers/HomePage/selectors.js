import { createSelector } from 'reselect'

  /**
   * Direct selector to the homepage state domain (specified in ~/routes.js)
   */
const selectHomePageDomain = () => state => state.get('homePage')

  /**
   * Other specific selectors
   */


  /**
   * Default selector used by HomePage
   */

const selectHomePage = () => createSelector(
  selectHomePageDomain(),
  (substate) => substate.toJS()
)

export default selectHomePage
export {
  selectHomePageDomain
}
