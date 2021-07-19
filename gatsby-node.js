const turnSongsIntoPages = async function ({ graphql, actions }) {
  // 1. Get a template for this page
  const SongTemplate = require.resolve('./src/templates/Song.js');
  // 2. Query all Songs
  const { data } = await graphql(`
    query {
      Songs: allSanitySong {
        nodes {
          name
          slug {
            current
          }
        }
      }
    }
  `);
  // 3. Loop over each Song and create a page for that Song
  data.Songs.nodes.forEach((Song) => {
    actions.createPage({
      // What is the URL for this new page??
      path: `song/${Song.slug.current}`,
      component: SongTemplate,
      context: {
        slug: Song.slug.current,
      },
    });
  });
};

const turnSetsIntoPages = async function ({ graphql, actions }) {
  const SetTemplate = require.resolve('./src/templates/Set.js');
  const { data } = await graphql(`
    query {
      Sets: allSanitySetlistdoc {
        nodes {
          setListName
          id
          slug {
            current
          }
        }
      }
    }
  `);
  // 3. Loop over each Song and create a page for that Song
  data.Sets.nodes.forEach((Sets) => {
    actions.createPage({
      // What is the URL for this new page??
      path: `setlist/${Sets.slug.current}`,
      component: SetTemplate,
      context: {
        slug: Sets.slug.current,
      },
    });
  });
};

exports.createPages = async function (params) {
  // Create pages dynamically
  // Wait for all promises to be resolved before finishing this function
  await Promise.all([turnSongsIntoPages(params), turnSetsIntoPages(params)]);
  // 1. Songs
};
