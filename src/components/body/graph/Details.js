import ChangesDropdown from './ChangesDropdown'
import ContributorChangesGraph from './ContributorChangesGraph'
import TotalChangesGraph from './TotalChangesGraph'
import { useParams } from 'react-router-dom'
function Details() {
 const {user,repo} = useParams();
 
  return (
    <>
    <ChangesDropdown/>
    <TotalChangesGraph user={user} repo={repo}/>
    <ContributorChangesGraph user={user} repo={repo}/>
    
    </>
  )
}

export default Details;
