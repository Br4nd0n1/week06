import Layout from '../../components/layout';
import { getIdList, getPerson } from '../../lib/read_firebase_data';
const JSON_FILE = "lieutenant";

export async function getStaticProps( { params } )
{
  const personData = await getPerson(params.id, JSON_FILE);
  return {
    props: {
      personData
    }
  };
}

export async function getStaticPaths() 
{
  const paths = await getIdList(JSON_FILE);
  return {
    paths,
    fallback: false
  };
}

export default function displayLieutenants( { personData } ) 
{
  return (
    <Layout>
      <article className="card col-6">
        <div className="card-body">
          <h5 className="mb-3">{personData.name}</h5>
          <p className="form-control">Unit: {personData.unit}</p>
          <p className="form-control">Home: {personData.home}</p>
          <p className="form-control">Rank: {personData.rank}</p>
          <p className="form-control">Commanding Officer: {personData.commander}</p>
          <ol className="list-group list-group-horizontal ms-2">
            {personData.tours && personData.tours.map(
                ({id, tour}) => (
                  <li key={id} className={`list-group-item ${id % 2 ? "list-group-item-info": "list-group-item-secondary" }`}>
                    {tour}
                  </li>
                )
              )
            }
          </ol>
        </div>
      </article>
    </Layout>
  );
}