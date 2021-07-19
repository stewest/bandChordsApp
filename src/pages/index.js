import * as React from 'react';
import { graphql } from 'gatsby';
import SongList from '../components/SongsList';
import SetList from '../components/SetList';
import Layout from '../layout/Layout';

const IndexPage = ({ data }) => {
  const songs = data.songs.nodes;
  const sets = data.sets.nodes;

  return (
    <Layout>
      <main>
        <title>Home Page</title>
        <h1 className="text-6xl">BandChords</h1>

        <div className="wrapper w-full grid grid-cols-2 gap-12">
          <SongList songs={songs} />

          <SetList sets={sets} />
        </div>
      </main>
    </Layout>
  );
};

export default IndexPage;

export const query = graphql`
  query SongQuery {
    songs: allSanitySong {
      nodes {
        name
        value: name
        label: name
        id
        slug {
          current
        }
      }
    }
    sets: allSanitySetlistdoc {
      nodes {
        setListName
        name: setListName
        value: setListName
        label: setListName
        id
        slug {
          current
        }
      }
    }
  }
`;
