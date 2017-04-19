import App from '../app/components';

// import Header from '../components/Header'
// import Submit from '../components/Submit'
// import PostList from '../components/PostList'
import withData from '../app/utils/apollo/withData';

export default withData((props) => {
  console.log('props', props);
  return (<App />);
});
