import user1 from '../../assets/images/users/1.jpg';

const messages = [
  {
    image: user1,
    status: 'online',
    title: 'Jack Famous',
    desc: 'Im the best',
    time: '15:34 PM',
    id: '1'
  }
];

const chatlisting = [
  {
    username: 'Kevin Hsu',
    content: 'Hello World!'
  },
  {
    username: 'Alice Chen',
    content:
      'Lorem ipsum dolor sit amet, nibh ipsum. Cum class sem inceptos incidunt sed sed. Tempus wisi enim id, arcu sed lectus aliquam, nulla vitae est bibendum molestie elit risus.',
    img: user1
  },
  {
    username: 'Alice Chen',
    content: 'Great Idea!',
    img: user1
  },

  {
    username: 'Kevin Hsu',
    content: 'Hello World Again'
  }
];

export { messages, chatlisting };
