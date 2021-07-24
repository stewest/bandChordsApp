import * as React from 'react';
import { graphql } from 'gatsby';
import SongList from '../components/SongsList';
import SetList from '../components/SetList';
import Layout from '../layout/Layout';
import Footer from '../components/Footer';
import icon from '../images/icon.png';

const IndexPage = ({ data }) => {
  const songs = data.songs.nodes;
  const sets = data.sets.nodes;

  return (
    <Layout>
      <main>
        <title>Band Chords | Home</title>
        <h1 className="text-3xl text-center md:text-left md:text-6xl mb-8 font-bold">
          <img
            className="logo--band w-8 md:w-16 mr-4 inline"
            src={icon}
            alt="Band Chords logo"
          />
          BandChords
        </h1>

        <div className="wrapper w-full grid sm:grid-cols-1 lg:grid-cols-2 gap-12">
          <SongList songs={songs} />

          <SetList sets={sets} />
        </div>
      </main>
      <Footer />
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
