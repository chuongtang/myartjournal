export default {
  name: 'postedBy',
  title: 'PostedBy',
  //  ⇩ A reference is a way to point to another document which is 'user' schema
  type: 'reference',
  to: [{ type: 'user' }],
};