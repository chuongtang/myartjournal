export const categories = [
  {
    name: 'doodle ',
    image: 'https://chuongtang.github.io/sourceStore/GenSources/Doodle.gif',
  },
  {
    name: 'feeling',
    image: 'https://chuongtang.github.io/sourceStore/GenSources/Feeling.gif',
  },
  {
    name: 'music',
    image: 'https://chuongtang.github.io/sourceStore/GenSources/Music.gif',
  },
  {
    name: 'imagination',
    image: 'https://chuongtang.github.io/sourceStore/GenSources/Imagination.gif',
  },
  {
    name: 'photo',
    image: 'https://chuongtang.github.io/sourceStore/GenSources/Photo.gif',
  },
  {
    name: 'food',
    image: 'https://chuongtang.github.io/sourceStore/GenSources/Food.gif',
  },
  {
    name: 'nature',
    image: 'https://chuongtang.github.io/sourceStore/GenSources/Nature.gif',
  },
  {
    name: 'art',
    image: 'https://chuongtang.github.io/sourceStore/GenSources/Art.gif',
  }, 
  {
    name: 'travel',
    image: 'https://chuongtang.github.io/sourceStore/GenSources/Travel.gif',
  },
  {
    name: 'color',
    image: 'https://chuongtang.github.io/sourceStore/GenSources/Color.gif',
  }, {
    name: 'animal',
    image: 'https://chuongtang.github.io/sourceStore/GenSources/Animal.gif',
  }, {
    name: 'book',
    image: 'https://chuongtang.github.io/sourceStore/GenSources/Book.gif',
  },
  {
    name: 'others',
    image: 'https://chuongtang.github.io/sourceStore/GenSources/Color.gif',
  },
];

export const feedQuery = `*[_type == "art"] | order(_createdAt desc) {
  image{
    asset->{
      url
    }
  },
      _id,
      postedBy->{
        _id,
        userName,
        image
      },
      save[]{
        _key,
        postedBy->{
          _id,
          userName,
          image
        },
      },
    } `;

export const artDetailQuery = (artId) => {
  const query = `*[_type == "art" && _id == '${artId}']{
    image{
      asset->{
        url
      }
    },
    _id,
    title, 
    about,
    category,
    postedBy->{
      _id,
      userName,
      image
    },
   save[]{
      postedBy->{
        _id,
        userName,
        image
      },
    },
    comments[]{
      comment,
      _key,
      postedBy->{
        _id,
        userName,
        image
      },
    }
  }`;
  return query;
};

export const artDetailMoreArtQuery = (art) => {
  const query = `*[_type == "art" && category == '${art.category}' && _id != '${art._id}' ]{
    image{
      asset->{
        url
      }
    },
    _id,
    postedBy->{
      _id,
      userName,
      image
    },
    save[]{
      _key,
      postedBy->{
        _id,
        userName,
        image
      },
    },
  }`;
  return query;
};


// ⇩ Sanity query-language from : https://www.sanity.io/docs/how-queries-work
export const searchQuery = (searchTerm) => {
  const query = `*[_type == "art" && title match '${searchTerm}*' || category match '${searchTerm}*' || about match '${searchTerm}*']{
        image{
          asset->{
            url
          }
        },
            _id,
            postedBy->{
              _id,
              userName,
              image
            },
            save[]{
              _key,
              postedBy->{
                _id,
                userName,
                image
              },
            },
          }`;
  return query;
};

export const userQuery = (userId) => {
  const query = `*[_type == "user" && _id == '${userId}']`;
  return query;
};

export const userCreatedArtsQuery = (userId) => {
  const query = `*[ _type == 'art' && userId == '${userId}'] | order(_createdAt desc){
    image{
      asset->{
        url
      }
    },
    _id,
    postedBy->{
      _id,
      userName,
      image
    },
    save[]{
      postedBy->{
        _id,
        userName,
        image
      },
    },
  }`;
  return query;
};

export const userSavedArtsQuery = (userId) => {
  const query = `*[_type == 'art' && '${userId}' in save[].userId ] | order(_createdAt desc) {
    image{
      asset->{
        url
      }
    },
    _id,
    postedBy->{
      _id,
      userName,
      image
    },
    save[]{
      postedBy->{
        _id,
        userName,
        image
      },
    },
  }`;
  return query;
};