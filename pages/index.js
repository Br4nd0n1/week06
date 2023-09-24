import Link from 'next/link';
import Layout from '../components/layout';
import { getGeneralsList } from '../lib/read_data';

export async function getStaticProps() 
{
  let generalsJsonFile = "british_generals.json"
  const britishGenerals = getGeneralsList(generalsJsonFile);
  generalsJsonFile = "american_generals.json"
  const americanGenerals = getGeneralsList(generalsJsonFile);
  return {
    props: { britishGenerals, americanGenerals }
  };
}

export default function Home( { britishGenerals, americanGenerals } ) {
  return (
    <Layout home>
      <h1>List of Generals And Lieutenants</h1>
      <h2>American Generals</h2>
      <div className="list-group">
        {americanGenerals && americanGenerals.map(
            ({id, name}) => (
              <Link key={id} href={`/${id}`} className="list-group-item list-group-item-action list-group-item-primary">
                {name}
              </Link>
            )
          )
        }
      </div>
      <h2>British Generals</h2>
      <div className="list-group">
        {britishGenerals && britishGenerals.map(
            ({id, name}) => (
              <Link key={id} href={`/${id}`} className="list-group-item list-group-item-action list-group-item-info">
                {name}
              </Link>
            )
          )
        }
      </div>
    </Layout>
  );
}